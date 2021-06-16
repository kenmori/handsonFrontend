# voltaの設定(how to settings)

## volta

<img src="https://terracetech.jp/wp-content/uploads/2021/06/無題229.png" width="400" alt="volta settings">

[author](https://kenjimorita.jp/)

[スター頂けるとやる気出ます](https://github.com/kenmori/handsonFrontend/stargazers)




[volta document](https://volta.sh/)

### pos

- Rust製で速い
- node, npm, yarnと別でプロジェクト毎にver管理できる
- MacM1でも問題ない
- jsonで管理
- チームで共有できる

### cons

- 情報が少ない
- uninstallする際に大変らしい
- yarnとdenoのサポートがいまいちらしい

## 設定ハンズオン

### 1. install

`curl https://get.volta.sh | bash`


```text
    Creating directory layout
  Extracting Volta binaries and launchers
    Finished installation. Updating user profile settings.
Updating your Volta directory. This may take a few moments...
success: Setup complete. Open a new terminal to start using Volta!
```

パスも最初から通してくれている

### 2. shell再起動


### 3. node指定

- メジャーバージョンだけ指定する場合

`volta install node@14`


- LTSを使いたい場合

`volta install node`

cd ~/Desktop
mkdir test && cd test

以下 test配下で叩く

### 4. defaultバージョンを決める

`volta install node@14`

`success: installed and set node@14.17.1 (with npm@6.14.13) as default`
と表示される

### 5. `npm init -y`

プロジェクトに`package.json`を作って、その中に設定される(`nodenvのnode_versions`のようなものを`package.json`に記述される)


### 6. `volta pin node@12.20`

ここで設定


再起動

## 以下環境に応じて

### uninstall nodenv

nodenvをアンインストールする

[https://github.com/nodenv/nodenv#uninstalling-nodenv](https://github.com/nodenv/nodenv#uninstalling-nodenv)