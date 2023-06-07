# QForms

A fullstack framework/platform based on Express and React for building Web UI for databases.

Supports MySql, Postgres, MongoDB.

## CLI Options

```bash
appsDirPath=../name/apps
```

## Make npm module ready for linking

```bash
$ npm link
```

## Build

```bash
$ npx gulp build-dev
```

## Release

```bash
$ npx gulp release
```

## Publish

```bash
$ git checkout release
$ npx gulp build-prod
$ npm publish
$ git add .
$ git reset --hard
$ git checkout master
```

## Docker

```
$ npx gulp docker-build
$ npx gulp docker-run
```
