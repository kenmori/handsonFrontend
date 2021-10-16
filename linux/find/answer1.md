# 課題回答例

あくまで例です

## 課題1

 1. `cd ~/Downloads`
 2. `mkdir testfind`
 3. `find testfind`

## 課題2

`find ~/Downloads -name testf\*`

## 課題3

`find ~/Downloads -type d -name \*test\*` (Downloads配下全てのtestを含むフォルダを列挙)

似ているものでこちらがあるが、
`find ~/Downloads/*test* -type d` (Downloads/直下にあるtestを含むフォルダを列挙)

こちらはパスを書くところで直下を指定していることに注意してください

## 課題4

`find . -type f -name \*.png`

## 課題5

例えば`無題`という名前なら

`find . -type f -name \*無題\*.png -exec zip ./testping.zip {} \;`

## 課題6

`find . -name \test*.zip`


## 課題7

`find ./testfind -type f -name "*.html" -exec rm -f {} \;`

パスの部分は環境次第です


## 課題8

ざっくり答え。載ってないのは調べてみてね

`find . -mmin -60`

`find . -amin -60`

`find . -size +50M`

`find . -size -100M`

`find . -size +50M -size -100M`

`find . -type f -name /*a\*.png -size +10M -exec rm {} \;`
