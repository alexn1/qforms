PGPASSWORD=example docker exec -i postgres pg_dump -U postgres -h localhost -c sample > sample.sql
