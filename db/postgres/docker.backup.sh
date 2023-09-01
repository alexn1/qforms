PGPASSWORD=example docker exec -i car-postgres-1 pg_dump -U postgres -h localhost -c demo > demo.sql
