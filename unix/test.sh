#!/bin/sh

index=1
for file in *.png
do
  mv "$file" "./img${index}.jpg"
  index=`expr $index + 1`
done