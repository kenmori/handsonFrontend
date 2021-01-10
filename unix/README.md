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


- echo (出力するコマンド)

`echo $SHELL`

自分がいまなんのSHELLを使ってるかがわかる

`echo $PATH`

PATH変数に入っているものを出力


### unixコマンド

```bash
expr 1 * 2 //式を評価する
```
