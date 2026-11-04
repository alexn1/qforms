# План: автозагрузка серверного кода приложения из apps/<app>/

## Context
Сейчас для приложения с кастомным серверным кодом (`modelClass`, кастомные роуты) нужен свой `start.ts` и подкласс `BackHostApp` (см. `apps/sample/start.ts`, `SampleBackHostApp.ts` (удалены, см. статус)). Цель: положить рядом с `apps/<app>/<appFileName>.json` файл `<appFileName>.ts` (или `.js`), и стандартный `dist/start.js` сам его подгрузит, без кастомного `start.ts`.

Решения пользователя: без транспиляции (без esbuild/ts-node), `.ts` грузится как есть (bun или Node с type-stripping; требуем Node 24), файл ищем как `<appDir>/<appFileName>.ts`, кроме классов нужен хук для кастомных роутов.

## Конвенция серверного модуля
`apps/<dir>/<appFileName>.{ts,js}`, порядок поиска: `.js`, затем `.ts`. Модуль:
- сам вызывает `BkHelper.registerGlobalClass(MyBkApplication)` (как сейчас в `SampleBkApplication.ts`), и `modelClass` в JSON резолвится через `global` (`BackHostApp.getApplicationClass`, `BkModel.ts:88`) без изменений;
- может экспортировать `initCustomRoutes(hostApp: BackHostApp): void`. Он заменяет `SampleBackHostApp.initCustomRoutes`.

## Изменения

1. **`src/backend/BackHostApp.ts`**
   - Новые поля: `appModules: Record<string, unknown>` (ключ — `appDirName/appFileName`) и метод `loadAppModules(): Promise<void>`.
   - `loadAppModules` вызывается из `init()` после `initDirPaths`/`checkApplicationFolder`, до `createExpressServer()`. Ищет `<distDirPath>/*/*.json` через `_glob` (JSON не парсится, чтобы битый JSON не ронял старт), рядом с каждым ищет `.js`/`.ts` и грузит.
   - Загрузка идёт через `__non_webpack_require__(absPath)` (бандл `dist/index.js` собран webpack'ом, обычный `require(variable)` даст «critical dependency»). Объявить `declare const __non_webpack_require__: NodeRequire`.
   - Ошибка загрузки одного модуля логируется через `pConsole.error` и не валит остальные приложения. Отдельной подсказки про `.js` нет: при `MIN_NODE_VERSION = 24` type-stripping всегда доступен.
   - `initCustomRoutes()` (сейчас пустой, `BackHostApp.ts:~255`) по умолчанию обходит `appModules` и вызывает `mod.initCustomRoutes?.(this)`. Подклассы, которые переопределяют метод и зовут `super`, продолжают работать.

2. **Почему загрузка при `init()`, а не лениво.** Вы выбрали ленивую загрузку, но хук роутов требует регистрации в Express до `useErrors()` (404-обработчик). Поэтому модули приложений загружаются при старте, а экземпляры `BkApplication` по-прежнему создаются лениво (`createApplicationIfNotExists`). Если нужна именно ленивая загрузка, роуты придётся делать через один middleware-диспетчер, и они будут отдавать 404 до первого обращения к приложению. Подтвердите вариант при утверждении плана.

3. **Sample (`apps/sample`)**
   - Перенести `index.ts`/`SampleBkApplication.ts` в `sample.ts` (класс + `initCustomRoutes(hostApp)` с `createCustomRoute(...)` из `SampleBackHostApp`).
   - Удалить `start.ts` и `SampleBackHostApp.ts`.
   - `package.json`: `start:sample` → `NODE_ENV=dev LISTEN_PORT=7001 node dist/start.js`.
   - Сохранить `require('./public/js/...')` для фронтовых файлов, если они нужны (проверить при переносе).

4. **`AGENTS.md`**: коротко описать конвенцию в разделе «Server and routing» (файл `<appFileName>.ts|js`, `initCustomRoutes`, требование к рантайму для `.ts`).

## Ограничения
- Без транспиляции `.ts` исполним только на bun / Node с type-stripping: нет `enum`, parameter properties, нужны явные расширения в относительных импортах, файлы внутри `node_modules` не обрабатываются. Требуется Node 24 (`MIN_NODE_VERSION`, `.nvmrc`, `Dockerfile`) или bun.
- Модульный кэш `require`: код грузится один раз, горячей перезагрузки нет (как и сейчас).
- `registerGlobalClass` бросает при повторной регистрации имени, поэтому имена классов разных приложений должны быть уникальны.
- Node: именованные ESM-импорты из `dist` (CJS-бандл) не работают, поэтому в `sample.ts` `import type` + `require('../../dist')`. На bun обычные `import { ... } from '../../dist'` работают (проверено на копии sample).

## Verification
1. `npm run build`, `npx tsc --noEmit` (фильтровать по изменённым файлам).
2. E2E: `test/e2e/Sample.test.ts` проверяет, что модуль `sample/sample` загружен и кастомный роут отвечает 200. Отдельного теста на битый модуль нет (проверено вручную).
3. `npx jest test/unit` и e2e по `dist/`.
4. Вручную: `npm run start:sample` (bun), открыть sample (`/viewer/sample/sample/local/domain/`) и кастомный `/page/Page1/1-abc`. Если открывать в Playwright, сначала `browser_close`, потом остановить сервер.

## Решение по загрузке и роутам (уточнено)
- Модули приложений грузятся **на старте** (`BackHostApp.init()` → `loadAppModules()`), а не лениво. Причина: кастомные URL (например `/page/Page1/1-abc`) должны работать сразу после рестарта сервера, в том числе при заходе по закладке, когда приложение ещё не открывали.
- Роуты регистрируются из экспорта модуля `initCustomRoutes(hostApp)`, который вызывается из `BackHostApp.initCustomRoutes()` до `useErrors()`. Диспетчер роутов и роуты на уровне класса `BkApplication` не нужны.
- Экземпляры `BkApplication` по-прежнему создаются лениво (`createApplicationIfNotExists`).
- Рассматривали и отвергли ленивую загрузку: Express не обрабатывает роуты, добавленные после 404-обработчика (нужен middleware-диспетчер), а кастомный URL давал бы 404 до первого захода на стандартный URL приложения.

## Статус
Всё из плана сделано и проверено.
- [x] `BackHostApp.loadAppModules()` на старте (`appModules`), JSON не парсится.
- [x] `BackHostApp.initCustomRoutes()` по умолчанию вызывает `initCustomRoutes` модулей приложений.
- [x] `apps-ts/sample` перенесён в `apps/sample`; `sample.ts` (класс + роуты), `start.ts`, `SampleBackHostApp.ts`, `index.ts` удалены; `start:sample` = `node dist/start.js` на порту 7001.
- [x] `MIN_NODE_VERSION = 24` (технический минимум для `.ts` без компиляции — 22.18: 22.17.1 не грузит, 22.18.0 грузит).
- [x] `AGENTS.md` обновлён (конвенция, ограничения, уникальность имён классов).
- [x] Тесты: `Sample.test.ts`, `BackHostApp.test.ts` берут `BackHostApp` из `dist`; сборка и `npm test` проходят.
- [x] Вручную: node 24, bun 1.4.4 (стандартный и кастомный URL), битый JSON не роняет сервер.
