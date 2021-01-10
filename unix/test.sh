#!/bin/sh

HOGE="hoge" # 変数HOGEにhogeを代入している。=の後は空白なし。くっつける
FUGA="fuga" # 変数FUGAにfugaを代入している

echo $HOGE$FUGA # 変数同士連結する場合はくっつける

NAME="kenji"
echo "Hello! $NAME" # ダブルクォーテーションでは式が展開されるが...
echo 'Hello! $NAME'