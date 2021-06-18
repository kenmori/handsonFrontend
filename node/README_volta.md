# voltaの設定

## volta

1.
`curl https://get.volta.sh | bash`


```text
    Creating directory layout
  Extracting Volta binaries and launchers
    Finished installation. Updating user profile settings.
Updating your Volta directory. This may take a few moments...
success: Setup complete. Open a new terminal to start using Volta!
```

2. 再起動


3. node指定

- メジャーバージョンだけ指定する場合

`volta install node@14`


- LTSを使いたい場合

`volta install node`

cd ~/Desktop
mkdir test && cd test

以下 test配下で叩く

4. defaultバージョンを決める

`volta install node@14`

`success: installed and set node@14.17.1 (with npm@6.14.13) as default`
と表示される

5. `npm init`


6. `volta pin node@12.20`



再起動

## uninstall nodenv

[https://github.com/nodenv/nodenv#uninstalling-nodenv](https://github.com/nodenv/nodenv#uninstalling-nodenv)