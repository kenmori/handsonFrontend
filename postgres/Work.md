 docker pull postgres


 docker run --name postgres-0 -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:latest

  docker ps

docker exec -it postgres-0 bash

pwd



 psql -U postgres

 - `\du`

`create database test;`
