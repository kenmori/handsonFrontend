
# localhost をspで確認

PCとSPを同じwifiでつなぐ

`ifconfig | grep 192`を叩く

`inet 192.168.100.100 netmask 0xffffff00 broadcast 192.168.100.255`

の`192.168.100.100`をspに貼り付ける

PCのブラウザがlocalhost: 5880だったら

`192.168.100.100:5880`
