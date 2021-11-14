
docker 


yarn add express

node server.js

curl localhost:5000

create Dockerfile

docker build . --tag node-server


docker run --name node-server-app -p 5000:5000 -d node-server


docker exec -it node-server-app bash


## https://www.youtube.com/watch?v=Dm0CmZz-QyI



docker run --name postgres-1 -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:alpine

docker exec -it postgres-1 bash


bash-5.1# psql  --help

bash-5.1# psql -U postgres

postgres=# \du

postgres=# create database test;


ユーザー一覧
postgres=# \l


postgres=# \c test
You are now connected to database "test" as user "postgres".


DBクリエイト権限付与
`ALTER ROLE postgres CREATEDB`


postgresの切断
`\q`




----


## install

`psql --version`

postgres -D /usr/local/var/postgres




