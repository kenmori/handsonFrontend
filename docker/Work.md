# Docker ハンズオン

[無料のDockerアカウント](https://hub.docker.com/?ref=login)

[DockerDesktop](https://docs.docker.com/docker-for-mac/install/)

[install](https://docs.docker.com/docker-for-mac/install/)
## Dockerとは


[nginx](https://hub.docker.com/_/nginx)


1.
[nginx image](https://hub.docker.com/search?q=nginx&type=image)

2.


3. 基本的なWebサーバーの実行
公式のnginxイメージを使用して基本的なWebサーバーを実行してみましょう。次のコマンドを実行して、コンテナを起動します。

```s
 docker run -it --rm -d -p 8080:80 --name web nginx
```

気にしない
```
Error response from daemon: dial unix docker.raw.sock: connect: no such file or directory
```

4. ローカルホストに訪れる

[http://localhost:8080/](http://localhost:8080/)


5. HTMLを提供する

```s
docker ps
```

```s
moritakenji@moritaknjinoMBP docker % docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                   NAMES
9fb25b1bcc28   nginx     "/docker-entrypoint.…"   3 minutes ago   Up 3 minutes   0.0.0.0:8080->80/tcp, :::8080->80/tcp   web
```

コンテナを止める

```s
docker stop web
```

名前が返ってくる

```
web
```

6. htmlをnginxのhtmlに入れる

> デフォルトでは、Nginxは/usr/share/nginx/htmlコンテナ内のディレクトリで提供するファイルを探します。htmlファイルをこのディレクトリに入れる必要があります。これを行う非常に簡単な方法は、マウントされたボリュームを使用することです。マウントされたボリュームを使用して、ローカルマシン上のディレクトリをリンクし、そのディレクトリを実行中のコンテナにマップできます。

- `cd ~/user/Desktop`

- `mkdir test`

- `cd test && touch index.html`

- `code ./index.html`


```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Docker Nginx</title>
</head>
<body>
  <h2>ドッカードッカー!!</h2>
</body>
</html>
```

`-v`は`バインドマウントボリューム`を作成するためのフラグ

バインドマウントボリュームはローカルで実行し、実行中のコンテナーでファイルを共有するためのオプション



```s
docker run -it --rm -d -p 8080:80 --name web -v ~/user/Desktop/test:/usr/share/nginx/html nginx
```


[http://localhost:8080/](http://localhost:8080/)

## カスタムイメージを作成してhtmlファイルをイメージにコピーする

```
cd ~/user/Desktop/test
moritakenji@moritaknjinoMBP test % ls
index.html
```

このようなtestの中にいる状態

`Dockerfile`を作成

```
FROM nginx:latest // base image
COPY ./index.html /usr/share/nginx/html/index.html // 現在の位置にあるindex.htmlをコンテナ内のディレクトリに配置。nginxがデフォルトで提供しているhtmlを上書き
```

## イメージをビルド

```
 docker build -t webserver .
```

```
moritakenji@moritaknjinoMBP test %  docker build -t webserver .
[+] Building 0.2s (7/7) FINISHED
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 112B                                                                           0.0s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 2B                                                                                0.0s
 => [internal] load metadata for docker.io/library/nginx:latest                                                0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 203B                                                                              0.0s
 => [1/2] FROM docker.io/library/nginx:latest                                                                  0.0s
 => [2/2] COPY ./index.html /usr/share/nginx/html/index.html                                                   0.0s
 => exporting to image                                                                                         0.0s
 => => exporting layers                                                                                        0.0s
 => => writing image sha256:15e0a5514b28150afb4c38a53cfc263b80af5e0703391932d21249ebc2ce1fd5                   0.0s
 => => naming to docker.io/library/webserver                                                                   0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

### イメージをコンテナで実行する

```
docker run -it --rm -d -p 8080:80 --name web webserver
```

```
docker: Error response from daemon: Conflict. The container name "/web" is already in use by container "56ce213ac61ef5d53c80efbb8cf622f2fd6b5621a80bc72f52e9e8e98009dea7".
```
のが出てきたら、すでにその名前のコンテナは立ち上がっているのでそのidを使ってストップします

`docker stop 56ce213ac61ef5d53c80efbb8cf622f2fd6b5621a80bc72f52e9e8e98009dea7`

[http://localhost:8080/](http://localhost:8080/)


[ref](https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/)
