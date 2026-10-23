# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

QForms is a fullstack platform (Express backend + React 17 frontend, TypeScript) for building web UIs over databases (PostgreSQL, MySQL, MongoDB). It is published as an npm package (`main: dist/index.js`); host projects consume it and supply their own application definitions. Uses Node 16 (`.nvmrc`); the server requires at least Node 14 at runtime.

## Commands

```bash
npm run build                 # dev build: clean, then webpack backend (index, start) + frontend (editor, index, monitor, viewer) bundles into dist/
npm run webpack:front:viewer  # rebuild a single bundle (also :editor, :index, :monitor, webpack:back:index, webpack:back:start)
npm run build:prod            # production build
npm start                     # run dist/start.js, serves ./apps on http://localhost:7000 (dev index at /index2, monitor at /monitor)
npm run start:sample          # run the apps-ts/sample host app with bun

npm test                                   # all jest tests (runInBand, QFORMS_LOG_LEVEL=error)
npx jest test/unit/Helper.test.ts          # single test file
npx jest -t 'test name'                    # single test by name
npm run test:debug                         # tests with debug logging

npx tsc --noEmit              # type-check (tsconfig.json is for tsc/IDE only; webpack builds use esbuild/ts-loader)
npx eslint src                # lint (no npm script)
npm run prettier:write        # format src (4 spaces, single quotes, printWidth 100)
```

Testing caveats:
- e2e tests (`test/e2e/`) run against the **built** `dist/` (`codeRootDirPath: './dist'`, or `import ... from '../../dist'`), so run `npm run build` after changing `src/` before running them.
- `SampleBackHostApp.test.ts` recreates a Docker Postgres container `qforms-postgres-test` on port 5433 (`test/core/helper.ts`); Docker must be running.

Release flow: `npm run release` (tags release, then version bumps to `x.y.z-dev`). Commit messages use short prefixes like `fix:`, `refactor:`.

## Architecture

### Application definitions are JSON model trees
A QForms "application" is a directory of JSON files (see `apps/test`, `apps/mongo`, `apps-ts/sample`). Each node has `@class`, `@attributes`, and child collections. The root `<name>.json` is an `Application` containing `databases` (→ tables → columns), `dataSources`, `actions`, and `pageLinks`; each page link points to a separate page JSON (`pages/<Page>/<Page>.json`) containing forms → fields/dataSources. The same model hierarchy is mirrored in three places:

- **Backend runtime** `src/backend/viewer/BkModel/` — `BkApplication`, `BkPage`, `BkForm` (`BkRowForm`/`BkTableForm`), `BkField` subtypes, `BkDataSource`/`BkPersistentDataSource`, `BkDatabase` (`BkSqlDatabase` → Postgres/MySQL, `BkNoSqlDatabase` → MongoDB). These load the JSON, execute queries, and serialize model data for the client.
- **Frontend runtime** `src/frontend/viewer/` — `Model/` (client-side data models) and `Controller/` (MVC: each `XxxController.ts` paired with a React `XxxView.tsx`, e.g. `ModelController/FormController/`).
- **Editor** `src/backend/editor/Editor/` (`ApplicationEditor`, `PageEditor`, `FormEditor`, …) mutates the JSON files; `src/frontend/editor/` is the editor UI (tree, property grid, wizards).

Shared DTO/types between front and back live in `src/common` and `src/types.ts`. `src/index.ts` re-exports backend, common, and frontend, so host apps and tests import everything from one package entry.

### Server and routing
`src/backend/BackHostApp.ts` is the server entry: resolves dir paths (`APPS_DIR_PATH` default `./apps`, `runtime/` for sessions), creates the Express + HTTP + WebSocket servers, and initializes four modules: `IndexModule`, `MonitorModule`, `ViewerModule`, `EditorModule`. Host projects extend it (e.g. `apps-ts/sample/SampleBackHostApp.ts`) and can subclass `BkApplication` for custom backend logic.

`src/backend/Router.ts` routes everything under `/:module/:appDirName/:appFileName/:env/:domain/` (GET/POST/PATCH/DELETE, plus `/*` for static files) to the viewer or editor module. `BkApplication` instances are created lazily per route and cached in `BackHostApp.applications`.

### Build outputs
Each webpack config produces one bundle into `dist/` (`webpack.helper.js` holds shared front/back base config). The viewer frontend is exposed as the `window.qforms` library; server-side `.tsx` files (`Links.tsx`, `Scripts.tsx`, `*Module.tsx`, `home.tsx`) render the HTML shell. Gulp tasks in `gulp/` copy EJS templates, static libs, and images.

### Logging
Use `pConsole` / `debug` from `src/pConsole.ts` / `src/console.ts` rather than `console`; verbosity is controlled by `QFORMS_LOG_LEVEL`. `@log` and `@time` decorators (`src/decorators.ts`) are used on lifecycle methods.

## Language

Communicate with the user in Russian: write all replies and explanations in Russian (code, identifiers and commit messages follow the project conventions and stay in English).

## Migrating old apps (pnd-admin → pnd-admin-2)

Sibling repos `../pnd-admin` (old format) and `../pnd-admin-2` (current format, `npm link qforms` → uses local `dist/`, so run `npm run build` here first). Pages are migrated one by one; done: `Users`, `User`. Server: `cd ../pnd-admin-2 && node apps/pnd/start.js` (port 3010, user usually already runs it; it re-reads page JSON per request, no restart needed for page edits).

Format differences (old → new), best reference is `apps-ts/sample/pages/Persons/Persons.json`:
- Collections `forms`/`fields`/`dataSources`/`keyColumns` are arrays (old: name→object maps); add `actions: []`, page/form attrs `formatVersion`, `cssBlock`, `viewClass`, `ctrlClass`, `modelClass`, `visible` (old `isVisible`).
- Data source `query` → `multipleQuery` (table) / `singleQuery` (row, `where id = {key}`; composite key → `{key1}`, `{key2}`...), plus `countQuery`, `limit`. `keyColumns` stay empty: keys come from the table in `App.json` (`key="true"`).
- Field attrs need the full set (`type` is required even if empty, else `no attribute 'type'`); copy from the sample. `width: "0"` → `""`. Date columns → `DateTimeField` (`timezone: "false"` for MySQL wall-clock values).
- Query params: `{this.Filter.x}` → `{Page.Filter.x}`; `{this.Form.id}` needs the field to be `param="true"`. Page key is `{key}`.
- DB names: old `default` (MySQL) → `pnd` in pnd-admin-2 (`default` is MongoDB there). Table `acc` was renamed `balance`. Tables must exist in `App.json` (add them before migrating a page; check all columns used by the page exist and have non-empty `type`).
- Old custom JS in `pages/*/forms/*/fields/*.js` is not migrated; `LinkField` with `page="X"` replaces the click handlers that opened a page.
- Add a `PageLink` to `App.json`; `menu: ""` for pages opened only from other pages.

Testing without a browser: `curl -H "Accept: application/json" "http://127.0.0.1:3010/viewer/pnd/App/dev/local/?action=page&page=User&params%5Bkey%5D=1"` returns page data (rows/count per form); `?page=Users` returns the HTML shell (500 shows the error in `<title>`).

Known quirks:
- A `RowForm` without data sources gets a surrogate row with `id = '[1]'` (`BkForm._getSurrogateDataSourceResponse`), which shows up as `[    1]` in a filter field whose column is `id`. Avoid a filter column named `id` (rename) or fix in qforms.
- MySQL: driver returns dates as strings (`BkMySqlDatabase.typeCast`) and `tinyint(1)` as boolean; `getColumnTypeByDataType` maps by base type; identifiers are backtick-quoted in generated insert/update/delete.
- `npx tsc --noEmit` prints many pre-existing implicit-any errors; compare only the files you touched.
