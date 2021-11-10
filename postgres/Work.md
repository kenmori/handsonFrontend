
docker 


yarn add express

node server.js

curl localhost:5000

create Dockerfile

docker build . --tag node-server


docker run --name node-server-app -p 5000:5000 -d node-server


docker exec -it node-server-app bash


## https://www.youtube.com/watch?v=Dm0CmZz-QyI