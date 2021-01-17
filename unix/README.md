# Unix 操作に慣れるハンズオン

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

