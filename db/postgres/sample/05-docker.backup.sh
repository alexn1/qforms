PGPASSWORD=example docker exec -i qforms-postgres-sample pg_dump -U postgres -h localhost -c sample > sample.sql
