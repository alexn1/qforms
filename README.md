# QForms

A fullstack framework/platform based on Express and React for building Web UI for databases.

Supports MySql, Postgres, MongoDB.

## Containers

```
name                      image                 port    password
----------------------------------------------------------------
postgres-qforms-test      postgres:12-alpine    5433    example
postgres-qforms-sample    postgres:12-alpine    5434    example
```

## sample database

```bash
cd db/postgres
./docker.run.sh
./docker.create.sh
./docker.restore.sh
```

## CLI Options

```bash
srcDirPath=../name/apps
```

## Make npm module ready for linking

```bash
$ npm link
```

## Build

```bash
$ npm run build
```

## Release

```bash
$ npm run release
```

## Deploy

```bash
$ npx gulp deploy
```

## Docker

```
$ npm run docker:build
$ npm run docker:run
```
