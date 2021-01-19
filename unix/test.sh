#!/bin/sh

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
