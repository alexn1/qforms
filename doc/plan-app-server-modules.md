# План: автозагрузка серверного кода приложения из apps/<app>/

## Context
Сейчас для приложения с кастомным серверным кодом (`modelClass`, кастомные роуты) нужен свой `start.ts` и подкласс `BackHostApp` (см. `apps/sample/start.ts`, `SampleBackHostApp.ts` (удалены, см. статус)). Цель: положить рядом с `apps/<app>/<appFileName>.json` файл `<appFileName>.ts` (или `.js`), и стандартный `dist/start.js` сам его подгрузит, без кастомного `start.ts`.

Решения пользователя: исполняем «только готовый JS» (без esbuild/ts-node, `.ts` грузится как есть, значит на bun или Node ≥22.6 с type-stripping), файл ищем как `<appDir>/<appFileName>.ts`, кроме классов нужен хук для кастомных роутов.

## Конвенция серверного модуля
`apps/<dir>/<appFileName>.{ts,js}`, порядок поиска: `.js`, затем `.ts`. Модуль:
- сам вызывает `BkHelper.registerGlobalClass(MyBkApplication)` (как сейчас в `SampleBkApplication.ts`), и `modelClass` в JSON резолвится через `global` (`BackHostApp.getApplicationClass`, `BkModel.ts:88`) без изменений;
- может экспортировать `initCustomRoutes(hostApp: BackHostApp): void`. Он заменяет `SampleBackHostApp.initCustomRoutes`.

## Изменения

1. **`src/backend/BackHostApp.ts`**
   - Новые поля: `appModules: Record<string, unknown>` (ключ — `appDirName/appFileName`) и метод `loadAppModules(): Promise<void>`.
   - `loadAppModules` вызывается из `init()` после `initDirPaths`/`checkApplicationFolder`, до `createExpressServer()`. Переиспользует `BkApplication.getAppInfos(this.srcDirPath)` и `getDistAppFilePath`-логику (`distDirPath`) для получения `dir` и `fileName` каждого приложения, ищет рядом `.js`/`.ts` и грузит.
   - Загрузка идёт через `__non_webpack_require__(absPath)` (бандл `dist/index.js` собран webpack'ом, обычный `require(variable)` даст «critical dependency»). Объявить `declare const __non_webpack_require__: NodeRequire`.
   - Ошибка загрузки одного модуля логируется через `pConsole.error` и не валит остальные приложения. В сообщении про `.ts` на Node без type-stripping указать «нужен bun или Node ≥22.6 / предварительно скомпилируйте в .js».
   - `initCustomRoutes()` (сейчас пустой, `BackHostApp.ts:~255`) по умолчанию обходит `appModules` и вызывает `mod.initCustomRoutes?.(this)`. Подклассы, которые переопределяют метод и зовут `super`, продолжают работать.

2. **Почему загрузка при `init()`, а не лениво.** Вы выбрали ленивую загрузку, но хук роутов требует регистрации в Express до `useErrors()` (404-обработчик). Поэтому модули приложений загружаются при старте, а экземпляры `BkApplication` по-прежнему создаются лениво (`createApplicationIfNotExists`). Если нужна именно ленивая загрузка, роуты придётся делать через один middleware-диспетчер, и они будут отдавать 404 до первого обращения к приложению. Подтвердите вариант при утверждении плана.

3. **Sample (`apps/sample`)**
   - Перенести `index.ts`/`SampleBkApplication.ts` в `sample.ts` (реэкспорт + `export function initCustomRoutes(app) { app.createCustomRoute(...) }` из `SampleBackHostApp`).
   - Удалить `start.ts` и `SampleBackHostApp.ts`.
   - `package.json`: `start:sample` → `NODE_ENV=dev LISTEN_PORT=7001 node dist/start.js`.
   - Сохранить `require('./public/js/...')` для фронтовых файлов, если они нужны (проверить при переносе).

4. **`AGENTS.md`**: коротко описать конвенцию в разделе «Server and routing» (файл `<appFileName>.ts|js`, `initCustomRoutes`, требование к рантайму для `.ts`).

## Ограничения (оговорить в документации)
- Без транспиляции `.ts` исполним только на bun / Node с type-stripping: нет `enum`, parameter properties, нужны явные расширения в относительных импортах, файлы внутри `node_modules` не обрабатываются. На Node 24 (`.nvmrc`) надо отдавать `.js`.
- Модульный кэш `require`: код грузится один раз, горячей перезагрузки нет (как и сейчас).
- `registerGlobalClass` бросает при повторной регистрации имени, поэтому имена классов разных приложений должны быть уникальны.

## Verification
1. `npm run build`, `npx tsc --noEmit` (фильтровать по изменённым файлам).
2. Новый тест `test/e2e/...`: временный `APPS_DIR_PATH` с `x/x.json` (`modelClass: "XApp"`) и `x/x.js`, который регистрирует `XApp` и экспортирует `initCustomRoutes`. Проверить, что `createApplication` возвращает экземпляр `XApp` и что кастомный роут отвечает. Проверить, что битый модуль не мешает остальным приложениям.
3. `npx jest test/unit` и e2e по `dist/`.
4. Вручную: `npm run start:sample` (bun), открыть sample (`/viewer/sample/sample/local/domain/`) и кастомный `/page/Page1/1-abc`. Если открывать в Playwright, сначала `browser_close`, потом остановить сервер.

## Решение по загрузке и роутам (уточнено)
- Модули приложений грузятся **на старте** (`BackHostApp.init()` → `loadAppModules()`), а не лениво. Причина: кастомные URL (например `/page/Page1/1-abc`) должны работать сразу после рестарта сервера, в том числе при заходе по закладке, когда приложение ещё не открывали.
- Роуты регистрируются из экспорта модуля `initCustomRoutes(hostApp)`, который вызывается из `BackHostApp.initCustomRoutes()` до `useErrors()`. Диспетчер роутов и роуты на уровне класса `BkApplication` не нужны.
- Экземпляры `BkApplication` по-прежнему создаются лениво (`createApplicationIfNotExists`).
- Рассматривали и отвергли ленивую загрузку: Express не обрабатывает роуты, добавленные после 404-обработчика (нужен middleware-диспетчер), а кастомный URL давал бы 404 до первого захода на стандартный URL приложения.

## Статус
- [x] Шаг 1: `BackHostApp.loadAppModules()` на старте, `appModules`.
- [x] Шаг 2: `apps-ts/sample` перенесён в `apps/sample`, обновлены ссылки.
- [x] Шаг 3: `apps/sample/sample.ts` (класс + `initCustomRoutes`), `start.ts`/`SampleBackHostApp.ts` удалены, `BackHostApp.initCustomRoutes()` вызывает хуки модулей. Проверено: сборка, curl (стандартный и кастомный URL), `SampleBackHostApp.test.ts`.
- [x] Документация `AGENTS.md`.
- Ограничение: в `.ts` нельзя именованно импортировать из `dist` (CJS-бандл): `import type` + `require`.
- [x] `MIN_NODE_VERSION = '24'` (проверка major.minor). Технический минимум для `.ts` без компиляции — 22.18 (проверено: 22.17.1 не грузит, 22.18.0 грузит), но решено требовать 24, как в `.nvmrc` и `Dockerfile`.
