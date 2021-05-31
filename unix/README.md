# Unix 操作に慣れるハンズオン


`/bin` ・・・/binがOSの働きの根幹に関わるような役割をもつコマンド
`/usr/bin`・・・より一般的なコマンド`git`とか`vi`とか
`~/bin`・・・ログインしているユーザに依存したコマンドを格納。他ユーザーと共有しないコマンド


1. シェル変数に代入
NEWENV="Hello"

2.環境変数にセット

export NEWENV

違いは?
環境変数はプログラムから起動されたプロセスでも有効
シェル変数は子プロセスでは無効(`exit`で抜けるような時)

プロセスとは

> メモリを使って、何かやっているプログラムひとつひとつ(実行中のプログラム)

`ps aux`で見れる

```
USER               PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND
moritakenji        982  19.2  6.2 35929644 1046512   ??  S     5:57PM   7:52.18 /Applications/Discord.app/Contents/Frameworks/Discord Helper (Renderer
moritakenji      38269  11.5  1.1 411376112 184912   ??  R    土10PM   2:07.06 /Applications/iTerm.app/Contents/MacOS/iTerm2
```

は

```
USER:実行しているユーザ名
PID:プロセスに割り振られた識別番号つまりプロセスID
%CPU:CPUの使用率
%MEM:メモリ使用率
VSZ:プロセスが確保しいる仮想メモリサイズ
RSS:実際に使用されているメモリ量
TTY:端末名
STAT:プロセスの状態を表示
START:コマンドが起動した時刻
TIME:プロセスが実行された総実行時間
COMMAND:コマンド名
```

STARTの状態は

```
S スリープやユーザからの入力待ち
D ディスクの入出力待
R 実行可能または実行中
T サスペンドシグナルを送られて実行中断
Z ゾンビ状態
< スケジュール優先度引き上げ
N スケジューリング優先度引き下げ
L メモリのページをロックして利用している
s セッションリーダである
+ フォアグラウンドプロセスグループ
```


`aux`とはオプション

```
-A(オプション -e)・・・全プロセスを表示する。
a・・・端末操作のプロセスを表示する。
x・・・端末操作以外のプロセスを表示する。
r・・・現在、実行しているプロセスを表示する。
c・・・実行しているコマンド名を表示する。
e・・・実行しているコマンド名と環境変数を表示する。
u・・・ＣＰＵやメモリの使用率なども表示する。
h・・・（オプション--no-headers）項目名を表示しない。
l・・・プロセスの状態なども表示する。
f（オプション-H, オプション--forest)・・・プロセスを階層で表示する。
o（オプション-o, オプション--format)・・・指定したリスト順の出力形式で表示する
-C・・・実行しているプロセスやプログラムのファイル名を指定する。
-u・・・プロセスを実行しているユーザーを指定する。
-g・・・プロセスを実行しているグループを指定する。
-p・・・（オプションp,オプション--pid）実行しているプロセスのプロセス番号（PID）を指定する。
--sort・・・sort
```

で、子プロセスとは
プロセスからプロセスを産んだということ
PIDが割り振られる

一つ一つのPIDが割り振られたが、その世帯ごとのIDが必要な時がある
プロセスグループID(PGID)

下のようにパイプでつないだプロセス同士は同じプロセスグループになる。
$ command1 | command2 | command3
プロセスグループにはリーダーがいて
プロセスグループIDはそのプロセスグループのリーダーのプロセスIDと同じ値を持つ。

プロセスグループは端末によるジョブ制御の基本的な単位となる。
`ジョブ=プロセスグループ`


PGIDを指定すれば親も子供も指定したことになる

PGIDを表示するコマンド

`ps -o user,group,pid,ppid,c,start_time,tty,time,comm`


バックグラウンドジョブ

winなら`ps auxf`で表示されるが
macはない
`brew install pstree`でコマンドinstall

`pstree`


```
 |-+= 38271 moritakenji /Users/moritakenji/Library/Application Support/iTerm2/iTermServer-3.4.3 /Users/moritakenji/Library/Application Support/iTerm2
 | \-+= 39134 root login -fp moritakenji
 |   \-+= 39135 moritakenji -zsh
 |     \-+= 01513 moritakenji zsh
 |       \-+= 01640 moritakenji bash
 |         \-+= 01641 moritakenji zsh
 |           \-+= 01768 moritakenji bash
 |             \-+= 01769 moritakenji zsh
 |               \-+= 01906 moritakenji bash
 |                 \-+= 01910 moritakenji zsh
 |                   \-+= 03361 moritakenji pstree
```

環境変数の確認

`printenv`

先程のexportした環境変数が入っていることを確認

`kill 39135`

するとプロセスが切れて閉じられる

立ち上げ直す

```
 \-+= 03439 root login -fp moritakenji
 |   \-+= 03440 moritakenji -zsh
 |     \-+= 03578 moritakenji pstree
 |       \--- 03579 root ps -axwwo user,pid,ppid,pgid,command
```

### 履歴を表示する

`history 10`

```
 1005  ps -aef --forest
 1006  ps -afx
 1007  history
 ```

履歴番号から実行する

`!1005`

`ctr r`でhistoryを検索して実行


- ログインシェルを使い倒そう

OS (Operating System)
とのやりとりを

GUI・・・Graphical User Interface

- グラフィカルにやること(マウス)

CUI・・・Character User Interface

- 文字でやること(ターミナル)

---

`cd hogehoge`

`touch test.sh`

`cat test.sh`

test.shに

```sh
#!/bin/sh

echo "Hello, World!"
```

と書いてみる

システムにこれからシェルスクリプトを書きますよという文字。(html宣言みたいなやつ。コピペで良い)  #(hash) + !(bang) = shebang(#!シェバング)

「畑(#)にびっくりした隣(/)の(!)貧乏(bin)が隣(/)からシー(sh)と言われている」

`sh test.sh`

or

`bash test.sh`

で実行。(権限で`chmod 755 test.sh`とするケースもある)

コメントはこう

```sh
#!/bin/sh

# コメント これ以降上は割愛
echo "Hello, World!"
```

自分のルートパスを出力

```sh
 echo "Hello, $HOME World!"
```

と書いた後
`sh test.sh`

コマンドを叩く

※変数にアクセスするとき変数の前に`$`を付けます。もしくは`${}`で囲みます
`$HOME` or `${HOME}`




### 構文

#### 変数への代入と連結

```sh
HOGE="hoge" # 変数HOGEにhogeを代入している。=の後は空白なし。くっつける
FUGA="fuga" # 変数FUGAにfugaを代入している

echo $HOGE$FUGA # 変数同士連結する場合はくっつける
```

`sh test.sh`で実行すると`hogefuga`と出力される

#### ダブルクォーテーションとシングルクォーテーションで囲むことの違い

```sh
NAME="kenji"
echo "Hello! $NAME" # ダブルクォーテーションでは式が展開されるが...
echo 'Hello! $NAME' # シングルだと展開されない
```

`sh test.sh`で実行すると

```sh
Hello! kenji
Hello! $NAME <-そのまま表示されることに注意
```

と出力される

#### 位置パラメータ

`test.sh "kenji"`
で実行した時その引数を受け取って出力してみる

```sh
# NAME="kenji" これは固定値なので受け取るようにする
echo "Hello! $1" # $1~$9を使って受け取る。10番目以降は ${10} となる
```

実行
`sh test.sh "kenji"`

試しに

```sh
echo "Hello! $3"`
```

として
`sh test.sh "kenji"`

実行しなおしてください

`Hello!  `

3つめの引数を渡してないので何も出力されません。

### その他

- readonly

```sh
readonly NAME #上書きさせない
NAME="kenji"
```

で実行すると
`test.sh: line 4: NAME: readonly variable`
エラー出る

- unset

変数を削除する時

-  特殊文字

```sh
* ? [ ' " \` \ $ ; & ( ) | ~ < > # % = スペース タブ 改行
```

シェルスクリプトでこれらの文字を文字列の中で使う時は `\`を書いた後使う


- 集合を扱う

`sh test.sh 1 2 3`
を実行した際にそれぞれシェルスクリプトが順番に`1 2 3`と出力するようにするには

```sh
for P in $*; do echo $P; done
```

このように書きます

`$*`で全部の引数をまとめて処理している。全ての引数を一つの変数を受け取り(`[1, 2, 3]`のような変数になるイメージ)、変数`P`に一つづつ代入され
`echo $P`で出力する

このように書き直して実行してみてください

```sh
sh test.sh 1 2 3 4
1
2
3
4
```

になったかと思います

- パラメータを渡さないでファイル内で記述する


```sh
#!/bin/sh

array=("1" "2" "3")
echo ${array[1]}

for I in ${arry[@]};do echo $I; done
```

`arry[@] or arry[*]`で全ての要素をアクセスしている

comandsに添字(go)を指定してgoコマンドがあれば1、なければ0を返す(`+`部分)

`echo $+commands[go]`


ifの基本的な書き方
`if [ 条件 ] then コマンド fi`

下記は1なら真なのでshファイル内で書いたもの。then以降が実行される

```sh
if(( $+comands[go] )); then
  echo "go: available"
fi
```
### やってみよう

`./img`にある`png`ファイルを全て`jpg`にするスクリプトを書いてみよう

1.

`test.sh`と同階層に`/img`フォルダを作り、その中に画像を入れておき

`test.sh`を以下のようにして実行する

```sh
index=1
for file in ./img/*.png
do
  mv "$file" "./img${index}.jpg"
  index=`expr $index + 1`
done
```



```sh
#!/bin/sh
cd ./img && ls -la
```

`sh test.sh`

このように普段叩くコマンドをshから叩くことができる(コマンドの自動化)

2.


- echo (出力するコマンド)

`echo $SHELL`

自分がいまなんのSHELLを使ってるかがわかる

`echo $PATH`

PATH変数に入っているものを出力


### unixコマンド

```bash
expr 1 * 2 //式を評価する
```


### Q

#### `/bin/sh`と`/bin/bash`の違い

- Linuxのデフォルトはbash
- `/bin/sh`は`bin/bash`へのシンボルリンクとなっている
- `/bin/sh`で動かすのと`bin/bash`で動かすのでは結果が違う

bashはPOSIXモードがオンになっていて古いコマンドと後方互換を保っているがshはそれをオフにしている

```sh
#!/bin/bash
set -o
```
で実行すると

```sh
allexport       off
braceexpand     on
emacs           off
errexit         off
errtrace        off
functrace       off
hashall         on
histexpand      off
history         off
ignoreeof       off
interactive-comments    on
keyword         off
monitor         off
noclobber       off
noexec          off
noglob          off
nolog           off
notify          off
nounset         off
onecmd          off
physical        off
pipefail        off
posix           on
privileged      off
verbose         off
vi              off
xtrace          off
```

一方

```sh
#!/bin/sh
set -o
```
で実行すると

```sh
allexport       off
braceexpand     on
emacs           off
errexit         off
errtrace        off
functrace       off
hashall         on
histexpand      off
history         off
ignoreeof       off
interactive-comments    on
keyword         off
monitor         off
noclobber       off
noexec          off
noglob          off
nolog           off
notify          off
nounset         off
onecmd          off
physical        off
pipefail        off
posix           on
privileged      off
verbose         off
vi              off
xtrace          off
```

同じになっている...調査必要



- mapfileで列挙する

`zmodload zsh/mapfile`

でモジュールを追加

`echo ${(k)mapfile}`

`echo "${mapfile[some_file]}"`

- 関数

```sh
HelloFunction () {
  echo "hello $2 $1!!" # 引数を受け取る
}

HelloFunction kenji morita
```


if条件

```sh
if [ "$1" -gt "$2" ]
  then
    echo "1番目の引数の方が2番目より大きい"
  elif [ "$1" -eq "$2" ]
  then
    echo "1番目と2番目の引数は同じ"
  elif [ "$1" -lt "$2" ]
  then
    echo "2番目の引数の方が1番目より大きい"
  else
    echo "引数が渡っていない"
fi
```

[シェルスクリプトとMakefileの違い](https://www.clear-code.com/blog/2012/10/24.html)
[シェルスクリプトとMakefileって何が違うんですか？シェルかCかの違いだけで同じカテゴリーのものですか？](https://jp.quora.com/shieru-sukuriputo-to-Makefile-tte-nani-ga-chigau-nde-suka-shieru-ka-C-ka-no-chigai-dake-de-onaji-kategori-no-mono-desu-ka)

[プロセスグループ（英：process group）とは](https://wa3.i-3-i.info/word15035.html)
[プロセスグループ・セッションについて勉強した
](http://yktwww.hatenablog.com/entry/2015/06/07/031523)

[https://ssl.amulet.co.jp/cat-user-linux/command_line/fg-bg-jobs.html](https://ssl.amulet.co.jp/cat-user-linux/command_line/fg-bg-jobs.html)
