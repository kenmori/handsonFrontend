const path = require('path')

module.exports = {
  mode: "development",
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js'),
    clean: true,
  },
  watchOptions: {
    ignored: /node_modules/  //正規表現で指定（node_modules を除外）
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    host: '192.168.100.176',
    port: 8080,
     // ルートディレクトリのファイルを監視
     watchContentBase: true,
     //バンドルされたファイルを出力する（実際に書き出す）
     writeToDisk: true,
  },
}

