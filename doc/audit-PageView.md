# Аудит PageView

Файлы: `src/frontend/viewer/Controller/ModelController/PageController/`
(`PageView.tsx`, `PageView.less`). `PageController.ts` открывался только ради сигнатур.

Аудит выполнен чтением кода. Сборка, тесты и браузер не запускались. Изменений в код не вносилось.

## Вероятные баги

1. **Пустой `Tab2`, если все табличные формы скрыты** (`renderTableForms`).
   Ветка `else` срабатывает при любом `length !== 1`, в том числе при `0`, а `renderForms`
   вызывает метод по `model.hasTableForm()`, которое не учитывает `isVisible()`.
   Результат: пустая рамка `__table-forms` с `min-height: 300px`.
   Исправление: `if (tableForms.length === 0) return null`.
2. **Нет `key` у элементов массива из `renderForms`.** Метод возвращает `[renderRowForms(), renderTableForms()]`
   (вложенный массив плюс одиночный элемент). Для `Tab2`-ветки ключа нет, React выдаёт предупреждение.
   Проще вернуть фрагмент `<>…</>`.
3. **Пустая ветка в `componentDidMount`:** `if (isAutoFocus() && !key) { } else { this.focus(); }`.
   Работает, но выглядит как забытая заглушка. Переписать с комментарием.
4. **`catch (err)` и `err.message`** в `onActionsClick`: для не-`Error` в alert попадёт `undefined`.
   Сузить: `err instanceof Error ? err.message : String(err)`.

## Типизация

| Место | Проблема | Что сделать |
|---|---|---|
| `constructor(props: ReactComponentProps)` | у `ReactComponent` `P = any`, типы props теряются | не опираться на `this.props.*` без приведения |
| `getFormTabs` | возвращает анонимный литерал | вынести `type FormTab`, согласовать с типом `tabs` в `Tab2` |
| `renderForm(..., props: Partial<ReactComponentProps>)` | передаёт `updated`, которого нет в `ReactComponentProps` (скрыто `any`) | типизировать props у `formCtrl.getViewClass()` |
| `getStyle()` | `{ width; height } \| undefined` | `React.CSSProperties \| undefined` (или убрать, см. стили) |
| `getRowForms`, `getTableForms` | фильтр по `getClassName() === 'RowForm'` | `instanceof RowFormController` / `TableFormController` |

## Читаемость и поддержка

- `isModal()` берётся то из `ctrl`, то из `model` (`render` и `getStyle` против `renderHeader` и `renderFooter`).
  Использовать один источник.
- Строковая сборка `className` оставляет двойной пробел в модальном режиме. Использовать массив с `join(' ')`.
- Неиспользуемые переменные: `ctrl` и `model` в `renderToolbar`, `model` в `renderOpenPageHeaderButton`
  и `renderClosePageHeaderButton`.
- Закомментированный код: `isToolbar`, `renderToolbar`, `renderSelectButton`, `renderSaveAndCloseButton`,
  `shouldComponentUpdate`, `focus`.
- `console.error` в `onActionsClick` и `focus` вместо `pConsole` / `debug` (CLAUDE.md).
- В шапке `{model.isModal() && [ ...(key ? [open] : []), close ]}` с ручными `key` читается хуже,
  чем два условных элемента.
- `renderForms2` — неинформативное имя; подойдёт `renderFormsInTabs`.

## Доступность

- Кнопки «Открыть в новой странице» и «Закрыть» — `div` с `onClick`: недоступны с клавиатуры,
  нет `aria-label`. Заменить на `<button type="button" aria-label=…>`.
- Корень страницы: `tabIndex={0}` без `role` и без видимой рамки фокуса. Для модалки добавить
  `role="dialog"`, `aria-modal`, `aria-labelledby` на заголовок. Для обычной страницы
  использовать `tabIndex={-1}` и программный фокус.
- `<h1>` в модальном окне даёт второй `h1` на странице; для модалки лучше `h2`.

## Стили (`PageView.less`)

- Размер модального окна зашит в JS (`getStyle()` возвращает 1000×750). На экране меньше 1000 px окно
  выйдет за край. Заменить на CSS: `width: min(1000px, 100vw - 40px)`, `max-height`; для переопределения
  использовать CSS-переменную.
- Цвета зашиты (`#777`, `#bbb`, `white`, `red`), остальной код использует `--accent-color`. Завести переменные.
- `.Modal .PageView__header` стилизует по предку; заменить на модификатор `PageView__header--modal`,
  который ставит сам View.
- `svg { fill: white }` в `__open` и `__close` корректен только на тёмной модальной шапке; связь неявная.
- `.PageView .Tab2__page .TableFormView` тянет в страницу знание о внутренностях `Tab2` и `TableFormView`.

## Производительность

На каждый рендер заново строятся `getFormTabs` (с рендером всех форм) и фильтры по `forms`.
Если `Tab2` рендерит только активную вкладку, `content: this.renderForm(form)` всё равно создаёт
элементы для всех. Можно передавать `() => ReactNode`.

## Тесты

Тестов на `PageView` нет (отдельно не проверялось). Минимум: страница без видимых табличных форм,
одна табличная форма, несколько, формы во вкладках, модальный режим с ключом и без.

## Рекомендуемый порядок

1. Исправить пустой `Tab2` и `key` в `renderForms`.
2. Заменить `div` на `button` с `aria-label`, добавить `role="dialog"` для модалки.
3. Вынести размер модального окна в CSS, убрать `getStyle()`.
4. Сузить `err`, заменить `console.error`, убрать мёртвый код.
5. Типы: `React.CSSProperties`, `FormTab`, `instanceof` вместо сравнения имён классов.
