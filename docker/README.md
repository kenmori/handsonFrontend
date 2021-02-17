


環境変数
・OSの上で動くプロセス(ターミナルやらブラウザ)が情報を共有するために使う変数

ターミナル
・shellを扱う為のアプリケーション
shellはkanelに対して命令を出すツール

print working directory



Docker
開発環境をチームで同じものを使う為のアプリ
ドッカーを立ち上げてコンテナの中に環境を作る


- DockerHubの登録
Dockerimageを管理するDoker レジストリ


DockerId
- githubのリポジトリにあたるものになる。慎重に

自分のパソコン
Host(DockerがHostに入っている)
- Hostの中にDokerimage置き、コンテナーを作る
- コンテナーに入って作業する -> コンテナーからimageを作る
- DockerImageをDockerHubにpushする

doker loginで DokerHubにログインする
docker pull でHubからimageをHostにpullしてくる
docker images でHostにあるimagesをみる


docker pull hello-world
/library/hello-world

https://hub.docker.com/u/library
ここから取ってきたことになる

Rpository(イメージがあるリポジトリ)
hello-world
Tag(バージョン)
latest

hello-worldというimageからコンテナを作る

docker run <img> コンテナを作る
docker ps コンテナ一覧の表示(アクティブなコンテナのみ表示)
doker ps -a (すべてのコンテナ。StatusがExitになっているのはrunして出てきた(inActiveになった)、から)


docker run -it ubuntu bash (ubuntuイメージからコンテナを作るときにbashを実行。-itはbashを実行するときのおまじない)

docker runはimageになかったらpullしてくる

root@cfd8f96adfbf:/#
今上のプロンプトのところがbashを使われている。cfはコンテナのid
コンテナに対して命令ができる状態になっている
pwd
で確認できる
Hostにいるわけではなくコンテナにいる
pullしたときにいくつもダウンロードしているのはubuntuが複数のimageレイアで構成されているから
 
新しいレイヤが追加されたdocker imageが保存される

なんでimageレイア構成になっているか
docker imageはいろいろなコンテナを作れる
コンテナAとコンテナBを作ったとき、一番上のだけ違うレイアにすればよくなる
2つのコンテナで共通のimageをシェアする(ubuntuのところなど)
- 共通のレイアーを作らなくてよく、image(書き込み可能)を積むことでスペースを確保できる。(コミットみたいなイメージ)


新しいレイアを作るということは
コンテナの中に入ってsaveするということ


コンテナを更新をする

docker imageを更新する方法は2つ
- コンテナからimageレイアを加えて、save、imageを作る
- docker fileからimageを更新する


コンテナに入った状態で
exit
docker ps -a でExitになっていることがわかる

docker restart <id or name>
コンテナを再起動
で
Upになる

docker exec -it <containerId> <command(bash)>
コンテナに入る、コンテナに入って何かめいれいできるじょうたいにする　
docker run -it <image name> bash との違いは
コンテナはすでにあるので実行するidはコンテナid

testがある

exitでコンテナからでるのではなく
detachで出る。ctr + p + q

exitとdetachの違い
Host側のプロセスを切ってcontainnerを抜けるのがexit。なのでホスト側docker ps -aでExitになっていた
再度使うときはrestartでプロセスをつくり(StatusをUPにして)はexecで入る必要がある

detachはプロセスはきらないでHost側に戻る。(StatusはUPのまま)

元のプロセスにはattachで入る
docker attach <containerId>

大体exitが使われている


containerを更新したらiamgeを配る。(他の開発者と共有する必要があるから)

docker ps -aでupかExitか確認
Exitならrestartでupにする。しないとis not runningとでる)

docker restart でup状態になってexecで入ったらまた別プロセスを立ち上げて入ることになる

Dockder imageの更新。Docker conntainerからimageに戻す (いろいろな人に使ってもらう為)

Host側で
docker commit  <id> <name:tag>
docker imagesで確認するとtagのやつがある

docker commit <container> <image> コンテナにたいして新しいimage名を作る。

docker Hubで自分のrepositoryをつくる

imageの名前とrepositioryの名前は一致していないといけない
dockerは一つのリポジトリに対して一つのイメージに対応しているから
push先がDockerHubではなく会社のDockerHubの場合

<hostname>:<port>/<username>/<repository>:<tag>

ここが変わる

DockerHubの場合registiry-1.docker.io/libray/<repository>:latestがデフォルト

docker imagesでREPOSITORY  とTAGをみて
REPOSITORY TAG
ubuntu update

を
repositioryにpushする

Repositoryにpushする

まずtagづけをしてimageに新しい名前をつける -> なぜ？ -> dockerリポジトリの名前と同じにしないといけないから

docker tag <sorce> <target> targetは新しいimage名。 -> 今のリポジトリ名がついた新しいimage名のimageができる
docker tag ubuntu:updated kenjimorita2/my-first-repo
docker imagesをすると同じimageIdがつけられている。
同じimageファイルにtagが付いた状態


docker images 
docker push kenjimorita2/my-first-repo

38bc00ec5c01: Pushed
8891751e0a17: Mounted from library/ubuntu
2a19bd70fcd4: Mounted from library/ubuntu
9e53fd489559: Mounted from library/ubuntu
7789f1a3d4e9: Mounted from library/ubuntu

一つのimageレイアのみがpushされたことを確認

Repositoryからpullする

同じimageがある場合削除する
docker rmi kenjimorita2/my-first-repo
docker images
(先程のimgeと同じimage IDはある。名前自体を削除した)


docker containerをより詳しく
docker run = create + start
create でstatusがcreateになる
startでコンテナを起動して(入って)デフォルトコマンド(テキストを実行するだけ。bashではない)を実行。exitする。(bashコマンドは実行しない -it <id> bash でそのコンテナの中に入れる女状態)
startで表示されてないのは -aがないから

containerで実行されるデフォルトCOMMANDはimageに指定されているコマンド
runしたとき何が実行されたかはdocker ps -aで見れる

docker run -it ubuntu bash 
は
デフォルトコマンドを上書きしている
ただhello-world imageはubuntsuが入っていないのでないよと言われる

ubuntuに入っているデフォルトコマンドが何かはわからないけどbashを実行するように上書きしている。
-itはbashを使って状態を保持して留まる為のオプション

docker run ubuntu ls
コマンドを上書きして実行(ubuntuはbin/bashがdefaultコマンド)


-it コンテナに対してインタラクティブな操作をしたい場合つける 
-i: インプット可能。ホストからコンテナへのチャネル。これがないとコンテナの中入ってもinputできない。ホストからコンテナへのチャネルを開く
-t: 出力結果をきれいにする。tがないと補完機能も効かない


コンテナを削除
docker rm <containerId> 空白をつけてidで複数いける
docker stop <containerId> rmするためには止める
docker system prune すべてのコンテナを削除

docker system pruneでてくる
dangling imageとは
docker fileから作られたばかりのimageでタグづけされていないimage <none>となる


コンテナに名前をつける
docker run --name <name> <image>

起動させ続けるコンテナを立ち上げるとき
共有サーバをつかうとき
他プログラムで使用するとき


detached mode
docker run -d <imag>

コンテナ起動後にdetachする(バックグラウンド実行)

foreground mode (-dを付けない場合)
docker run --rm <image>  (容量を食わない)
コンテナをExit後に削除する(一回きりコンテナ)


# DockerFile
Docker imageをどういう風に作っているかの設計書

Dockerインストラクション
FROM or ADD など

arguments
でつくる

naming convention: 命名規則

#### FROM

元となるベースのimage
-> このimageの上にレイアが積み重なる

#### RUN
Linuxコマンドを実行
RUNを使うことで好きなようにカスタマイズ
RUNごとにLayerが作られる
ほかにも
COPY, ADD
の3つがLayerを作る
Layerが多いと重くなるのでLayer数は最小限にする
- コマンド&&でつなげる
- バックスラッシュで改行する





RUN
linuxのコマンド


CMD




docker build .
カレントにあるDockerfileをみる

docker system pruneで
`<none>` になっているもの

`dangling image`

dangling imageをフィルター
`docker images -f dangling=true`

docker imageに名前をつける `-t`
docker build -t <name> <directory>
`docker build -t new-ubuntu:latest .`

Ubuntuではapt-get(or apt)というコマンドでパッケージを管理する

apt-get update
- 新しいパッケージリストの取得
apt-get install
- apt-get install <package>をインストール

RUN apt-get update && apt-get install \
xxx\
yyy\
zzz

として&&でつなげる
改行する

docker fileを更新したらimageを作り直す必要がある
-> dockerfileを変数ばかりしていると
長い処理の時にbuildし直す為大変


キャッシュはレイヤーごとに作られていくので
RUNを分けると編集した際には良い
最後に加えたRUNのコマンドのみを実行してくれる

RUN apt-get update && apt-get install -y
-yはyes

Dockerfileをメンテナンスしている間はRUNを多用してキャッシュをしながら
確認する
okになったら&&してRUNを減らす

 ### CMD
 docker run <img>時に実行されるdefault comandはDockerfileのCMDで定義されている

 CMD ["ececutable", "param1", "param2"]
 原則 Dockerfileの最後に記載で一つのDockerfileに一つだけ


 RUN vs CMD
 - RUNはLayerを作るCMDはLayerを作らない。(保存したいのかrunした時に実行して欲しいのか)
 - docker runした時にCMDは走るが、たとえばCMDにpackge installなどimageを構成するものを書いてしまうと
 都度実行される。のでそういうのはRUNに書く

 ## cocker damon

 docker build .
 時にそのカレントディレクトリ自体をビルドコンテキストとしてdocker damonに渡す
 docker damonがそれをもとにimageを作る

 send to docker damon

## Docker architecture (client-server architecture)


## docker damon
- docker cliを使って(clientからコマンドを打って). cliがDokerHost上のdocker damonと呼ばれるdocker object
を操作するものに命令をしていた

## build context
- build を叩いたときの環境。demonに渡すもの

`du -sh something_file` ファイルサイズを表示する

build contextの中にあるファイルをimageに組み込みcontainer時に使うインストラクションがADDとCOPY


## COPY vs ADD

COPY 単純にファイルをコピーするとき
ADD 大きなフォルダをtarにして圧縮してコピーして、demonに渡したいとき。解凍もしてくれる COPYだと実行時重くなるから

- tarをADDで渡す
`tar -cvf compressed.tar sample_folder`


```
http://hydrocul.github.io/wiki/commands/tar.html
## アーカイブ
$ tar cvf tarファイル名 アーカイブ対象ディレクトリ

## 圧縮してアーカイブ
$ tar cvzf tgzファイル名 圧縮対象ディレクトリ

## 展開
$ tar xvf tarファイル名

## 解凍して展開
$ tar xvzf tgzファイル名

## 特定のファイルのみ解凍して展開
$ tar xvzf tgzファイル名 ファイルパス

## アーカイブされているファイルの一覧
$ tar tf tarファイル名

## 圧縮してアーカイブされているファイルの一覧
$ tar tzf tgzファイル名
-c
新しくアーカイブファイルを作成する。たぶんcreateの意味
-f
アーカイブファイル名をパラメータで指定する。これを指定しないと標準入力 または標準出力が使われる
-t
アーカイブファイルに含まれるファイルの一覧を表示する。たぶんlistの意味
-v
処理の進行しているファイル名を表示する。 -t と併用の場合はタイムスタンプやファイルサイズなども表示する。
-x
アーカイブファイルを展開する。たぶんextractの意味
-z
gzipで圧縮または展開を同時に行う
-z を使う場合は、アーカイブファイルの拡張子として .tar.gz または .tgz がよく使われる。

オプションは先頭のハイフンをとって全部スペースなしでつなげてしまうことができるようで、そのほうがタイプ数が少なくて済むので、普通はそうする。ただし f はアーカイブファイル名の直前である必要があるので、結果的にオプション群の最後に書くことになる。
```

### Dockerfileがビルドコンテキストに入っていないケース

ビルドコンテキスト。docker build .するところ

- 環境によって分けてpackageをinstallしなくてはならないケースがある
その際複数Dockerfileを作って
- 別の実行コンテキストからbuildする(Dockerfileがない)

docker build -f <dockerfilepath> .(ビルドコンテキスト。ここにはない)

 `docker build -f ../Dockerfile.dev .`

Dockerfile.devをつくる
`mv hogehoge hogehoge2`

## CMD と ENTRYPOINT

おさらい
docker run <imagefile> <override CMD in Dockerfile>

上記はDockerfileの[CMD]を上書きして実行している

CMDは上書きできるが、

ENTRYPOINT
docker runの時に上書きして欲しくない時に使う
DockerfileにENTRYPOINTがある場合はCMDはENTRYPOINTの引数を取る

例)

```
FROM ubuntu:latest
RUN touch test
ENTRYPOINT ["ls"]
CMD ["--help"]
docker run <image> -la(ここはCMDのargumentsを上書きしている)
```

- チームで使う分にはCMDで足りる
- 開発で外にopenにする場合はCMDを上書きされないようにENTRYPOINTを使うケースがある
- ENTRYPOINT を上書き方法もある

ENV

書き方二つ

- ENV key value
- ENV key=fafa (複数の時)

`env` 環境変数一覧を表示

dockr run -it --rm <imagename> bash (消す)

# WORKDIR (ワークディル)

Dockerインストラクションを実行ディレクトリを変更してくれる

- RUN で実行されたのものは基本root直下で実行される

```
RUN mkdir sample
RUN cd sample
RUN touch text.txt (これはsample内で作られない)
```


&&で繋ぐとちゃんとcdの中に作ってくれる

```
RUN mkdir sample && \
    cd sample && \
    touch text.txt
```

これでもいいが、cdを使うなら

WORKDIR <絶対path>

```
RUN mkdir sample
WORKDIR /sample
```

もしなければ作ってくれるので
下記でよい

```
~RUN mkdir sample~ 不要
WORKDIR  /sample
```

`未使用一括削除`
`docker image prune`

## Host と Containerの関係

- ファイルシステムの共有
- ファイルへのアクセス権限
- ポートをつなげる
- コンピューターリソースの上限

`docker run` コマンドのオプションで設定

### ファイルシステムの共有

`docker run -v <host>:<container>` 絶対パス


-vオプションでホストのファイルシステムをマウントする時
マウント・・・コンテナーにあたかもファイルがあるように見える。実際にはない。Hostのファイルをみている
コードをコンテナにおくと重くなりimage配布のとき大変なので、Host側にもっておいて実行するタイミングでマウントする
実行環境として使う


RUN mkdir newfolder
この状態で -it -vで<hostのマウント元のパス>:<container>を渡した場合、 host側のファイルをnewfolderの中にマウントする

あくまでもコンテナにマウントされたファイルシステムは見えているだけ。実際にはない
リアルタイムで編集したものもコンテナ側から確認できる

もし
-it -vで<hostのマウント元のパス>:<container>でcontainerにないフォルダを指定していた場合自動で作ってくれる

いちばんん重要なオプション

### ファイルへのアクセス権限

コンテナからホストへのファイルシステムにアクセスできたがセキュリティ的によくない
コンテナ側では何も指定しなければroot権限をもってホストのファイルシステムにアクセスできる


ユーザーidとグループidを指定してコンテナをrunする

-u <user_id>:<group_id>

Linux:
`id -u` 自分のMacのユーザーidを確認することができる
`id -g` グループid

command

`docker run -it -u $(id-u):$(id-g) -v ~/Desktop/mounted_folder:/created_in_run 784d564a56fd bash`

`created_in_run` はなければ勝手につくってくれる


ls -laで所有権を確認
rootになっていたらおかしい

### ポートをつなげる

プロセスがデータ通信をするためにつかう

ホストのポートをコンテナのポートにつなげる
-p <host_port>:<container_port>

IPアドレスは住所、Portは部屋番号

-p はpublishのpだった

`https://jupyter.org/`のimageをrunする

docker run -it -p 8888:8888 --rm jupyter/datascience-notebook bash

コンテナーの8888がpublishしているので8888で表示される

コンテナに入る

juptyer notebook
で立ち上げる

自分のcPCに対してアクセスする
localhost:8888でコンテナーの8888にアクセスできる




### コンピューターリソースの上限

ホストにコンテナをたくさん立ててそのままデータを取得するようなタスクを実行すると
上限がない場合、メモリを全て食べて枯渇する
そうならないように一つ一つに制限を加える必要がある

--cpus <# of CPUs> コンテナがアクセスできる上限のCPUを設定
--memory <byte> コンテナがアクセスできる上限のメモリを設定


sysctl -n hw.physicalcpu_max : 物理コア数
6
sysctl -n hw.logicalcpu_max : 論理コア数
12
sysctl hw.memsize : メモリ(byte)
17179869184

1 Kbyte = 1024byte
1 Mbyte = 1024 * 1024 byte
1 Gbyte = 1024 * 1024 * 1024 byte

17179869184 / 1024 / 1024 / 1024  =16GB

docker run -it --rm --cpus 4 --memory 2g ubuntu bash
立ち上げた状態で

docker inspect 1ab8cad17797


## docker-compose

使う時
- docker runコマンドが長くなる時
- 複数のコンテナをまとめて動かす時

動かしたいコンテナ service
オプションの数だけ書く

Dockerfile - containerをどのように動かすか
Docker-compose containerを

docker-compose
```
version: '3'

services: // container
  web: // 名前はなんでもいい
    build: . // Dockerfileのbuild context(そのままdemonに渡すフォルダ内)
    ports:
      - '3000:3000' //railsのデフォルト -は複数指定できるpropertyの際、(配列の時)
    volumes: // mount
      - '.:/product-register' //　相対パスを指定。どこでもユーザーが置けるように。
    tty: true // -itのt 綺麗にするやつ
    stbin_open: true // hostとcontainerのチャネルを開く
```

docker と docker-composeコマンド

docker build <build contexts> -> docker-compose build
docker run <imageId> -> docker-compose up
docker ps -> docker-compose ps
docker exec <containerId>　<command> -> docker-compose exec <servece> <command>

docker-compose up --build :build してrun
docker-compose down : stopしてrm


# docker-compose

containerをどういうふうに起動していくか、run時のoptionを記述する

docker run -v ~/Desktop/product-register:/product-register -p 3000:3000 -it c766bd7b9c43 bash

docker-compose up imageが作られていなければbuildもする

もしdocker-compose.ymlを更新して
docker-compose upしても
古いimageが使われるので

docker-compose up --build
する


