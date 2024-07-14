# docker rm qforms-postgres-sample
docker run --name qforms-postgres-sample \
--restart unless-stopped \
-p 5434:5432 \
-e POSTGRES_PASSWORD=example \
-v ~/data/qforms/postgres-sample:/var/lib/postgresql/data \
-d postgres:12-alpine
