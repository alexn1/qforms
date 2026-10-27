# Аудит ApplicationView

Файлы: `src/frontend/viewer/Controller/ModelController/ApplicationController/`
(`ApplicationView.tsx`, `ApplicationView.less`, `ApplicationController.ts`).

Аудит выполнен чтением кода. Сборка, тесты и браузер не запускались.

## Статус

- [x] `key` у активной страницы в `renderActivePage`
- [x] Типы методов `ApplicationView` (`renderView`, `renderActivePage`, `render*`);
      в `Controller.getViewClass()` добавлен возвращаемый тип `React.ComponentType<any>`
- [x] `grid-template-rows: max-content minmax(0, 1fr) max-content`
- [ ] Всё остальное ниже

## Возможные баги

1. **Версионное уведомление создаётся императивно** (`ApplicationController.ts`, `createVersionNotificationIfNotExists`).
   Контроллер делает `document.querySelector('.…__body')!.append(div)`. Элемента `__body` во View нет,
   он есть только в серверной HTML-оболочке, поэтому `!` может дать `null` и исключение.
   Дубликат проверяется глобальным селектором `.version-notification`.
   Исправление: флаг в контроллере (например, `versionMismatch`) и рендер уведомления во View.
2. **Не дожидаются асинхронные вызовы.** `addPage` вызывает `this.closePage(this.activePage)` без `await`;
   ошибка в `deinit` станет unhandled rejection. Порядок хрупкий: `closePage` синхронно обнуляет
   `activePage` и ставит `document.title = ''`, затем `addPage` присваивает новый.
3. **Нет Error Boundary.** Исключение в рендере любой страницы или модалки роняет всё приложение,
   включая меню. Достаточно обернуть `renderMain()` и `renderModals()`.

## Типизация (контроллер)

| Место | Проблема | Что сделать |
|---|---|---|
| `view: any` | `any` | `ApplicationView \| null` |
| `statusbar: any`, `onStatusbarCreate = (statusbar)` | `any` и неявный `any` | тип из `Statusbar` в `common` |
| `webSocketClient: any` | `any` | `WebSocketClient \| null` |
| `onMenuItemClick = async (menu, type, name)` | параметры без типов | типизировать, вынести тип пункта меню |
| `getMenuItemsProp()` | возвращаемый тип выводится | явный тип `MenuItem[]` |
| `catch (err)` с `err.message` | `err` имеет тип `unknown` | сузить через `err instanceof Error` |
| `// @ts-ignore` у `activeElement.focus()` (дважды) | приведение скрыто | `if (activeElement instanceof HTMLElement) activeElement.focus()` |

## Архитектура и поддерживаемость

- Публичные `modals` и `activePage` мутируются напрямую: `closePage` делает `splice`,
  хотя рядом есть `removeModal`. Логика дублируется.
- `getMenuItemsProp()` на каждый рендер создаёт новые массивы. Если `Menu` — PureComponent
  или в `memo`, оптимизации это не даёт. Можно кешировать.
- Логирование: CLAUDE.md требует `pConsole` и `debug`, в контроллере везде `console.debug`.
  Во View `debug(...)` вычисляет строку на каждый рендер.
- Мёртвый код: закомментированные блоки, `getGlobalParams`, `getRootPath`, пустой `onPageSelect`,
  `getNextId` и `getNewId`, неиспользуемая `result` в `onLogout`.
- `openPage` мутирует входной `options` (дописывает `modal`, `onClose`). Лучше `{ modal: true, ...options }`.
- `findPageControllerByPageNameAndKey(name, null)` в `openPage` всегда ищет с ключом `null`,
  поэтому проверка «уже открыта» не сработает для страниц с `selectedKey`.

## Стили (`ApplicationView.less`)

- `.ApplicationView__main` — пустое правило с закомментированным кодом.
- Если страница выше окна, переполнение нужно обрабатывать на `<main>` (после правки grid
  может понадобиться `overflow: auto`).
- `font-family: sans-serif` зашит в контейнере; вынести в переменную темы.
- `.ApplicationView__body` и `.ApplicationView__root` относятся к серверной оболочке, а не к View.
- Атрибут модели `cssBlock` меняет `getCssBlockName()`, и стили `ApplicationView.less`
  перестают применяться. Документировать или добавлять оба класса.

## Доступность

- В `Menu` и `Modal` проверить `role="dialog"`, `aria-modal`, `Esc`, focus trap.
  Фокус при закрытии восстанавливается вручную, при открытии модалки не переносится.

## Тесты

Тестов на View и контроллер нет (отдельно не проверялось). Минимум: смена активной страницы,
открытие и закрытие модалки, показ версионного уведомления.

## Рекомендуемый порядок оставшегося

1. Типизировать поля контроллера, убрать `@ts-ignore`.
2. Перенести версионное уведомление в рендер View.
3. `await` в `addPage`, объединить логику `closePage` и `removeModal`.
4. Error Boundary для страниц и модалок.
5. Почистить мёртвый код и логирование.
