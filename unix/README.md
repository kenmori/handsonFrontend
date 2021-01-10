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


構文

```sh

HOGE="hoge" # 変数HOGEにhogeを代入している
FUGA="fuga" # 変数FUGAにfugaを代入している
```

- echo (出力するコマンド)

`echo $SHELL`

自分がいまなんのSHELLを使ってるかがわかる

`echo $PATH`

PATH変数に入っているものを出力


