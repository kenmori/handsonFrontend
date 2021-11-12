# shellScriptハンズオン

## ファイルを作る

```txt
$ echo '#!/bin/sh' > my-script.sh
$ echo 'echo Hello World' >> my-script.sh
$ chmod 755 my-script.sh
$ ./my-script.sh
Hello World
```

## 変数を定義してスクリプトを実行する

`var="これは変数です"`
`echo ${var}`

## 実行時に引数を渡して出力する

`echo "私は$1です"`

##




`最初の行は、ファイルが/bin/shによって実行されることをUnixに通知します。`

