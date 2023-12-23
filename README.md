# QForms

A fullstack framework/platform based on Express and React for building Web UI for databases.

Supports MySql, Postgres, MongoDB.

## Containers

```
name                      image                 port    user:password
------------------------------------------------------------------------
qforms-postgres-test      postgres:12-alpine    5433    postgres:example
qforms-postgres-sample    postgres:12-alpine    5434    postgres:example
```

## sample database

```bash
cd db/postgres
./docker.run.sh         # run docker container
./docker.create.sh      # create sample database
./docker.restore.sh     # restore db from sample.sql
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
