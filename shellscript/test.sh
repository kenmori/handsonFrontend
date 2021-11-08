#!/bin/sh

var="これは変数です"

echo ${var}

echo "私は$1です"

ARRAY=(item 2 item3 item4)
ARRAY2=(1 2 3)

ARRAY[0]="ITEM1"

echo ${ARRAY[0]}

# 全てのアイテム

echo ${ARRAY[*]}


if [ "$1" -eq "$2" ]
then
  echo "同じです"
elif [ "$3" -ge "$4" ]
then
  echo "大きいです"
else
  echo "nasi"
fi

