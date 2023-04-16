# playwrightに触れるハンズオン

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/playwright.png" />

[playwright](https://playwright.dev/)(プレイライト)

※このハンズオンは**制作の方向け**に簡易的に書かれていてフロントエンドのテスト方法、設定とはかけ離れているかと思います。
適宜ドキュメントを参考にして設定してください

※あくまでどんなものなのか触れるだけのハンズオンです

※sampleプロジェクトは[@fuwafuwahappy](https://twitter.com/fuwafuwahappy)さんのご提供です。ありがとうございました

## テストの種類

- ユニットテスト(Unit Test)
  - 関数やコンポーネントに対するテスト
- インテグレーションテスト(Integration Test)
  - 関数の中で色々な関数が実行され、複数で調和された結果のテスト
  - コンポーネント文脈だとあいまい
- E2Eテスト(End to End Test)
  - ユーザーがどう振る舞うかアプリをクリックして回り正しく機能するかのテスト
- スナップショットテスト
  - UIが予期せぬ変更をされていないか、スナップショットとして結果を残し差分を検知するようなテスト
- クロスブラウザテスト(Cross Browser Test)
  複数のブラウザでの振る舞い、見え方を比較するテスト

## テストを書く目的

- 開発者が動作確認をする事ももちろんやりますが、面倒なケースもあります。それらをテストコードを書いて正しい動作をしていることを
示します。
- リファクタリング後にデグレっていないことをテストコードを書いておけば示すことができます
- テストを先に書くことで、それを「仕様書風」にして、足りていない振る舞いなどを浮かび上げることが前もってできます
- テストケースを見て足りていないテストがあればそこがバグになりうることがわかります
- レビュワーがわざわざ動作確認まですることを避けることができます。もちろんやる事もあります
- テストを書いて品質を保つことで安心安全に開発、デプロイできます

## playwright

- E2Eテスト自動化ツール

- クロスブラウザテストができる
- スナップショット画像を生成してくれる
- テスト収録でテストコードを生成してくれる
and more...

## fork or cloneしてください

このリポジトリ、[https://github.com/kenmori/handsonFrontend](https://github.com/kenmori/handsonFrontend)からfork or cloneしてください

## cdでsampleプロジェクトに移動

ターミナルを立ち上げて
`playwright/sample`
に`cd`で移動してください

## yarn test-view

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/page.gif"　width="400" />

## テストする動作を収録してインスペクターに追加する

testフォルダをsrc直下に作ってください(作ってあればそれを活かす)

その中に`login.spec.js`
を作る
中身は一旦空にしましょう

## `npx playwright install`

ターミナルで
`npx playwright install`を実行してください

## sample直下にいることを確認して

`yarn`を実行してください

次に`playwright inspector`を立ち上げる

(他にlocalhostが立ち上がっていないことを確認して)

`yarn dev`
をして
`yarn test-view`
を実行してください

`localhost:3000`で画面遷移すればok

## テストしたいアクションをしてください

アクションを収録する録画が始まっています

playwright inspectorの内容を

`login.spec.js`にコピペしてください

## テスト

例えば、

- sign up押下した時に画面が表示されること

をテストする場合はこちらです

```js
test('if sign up clicked, show content include username input', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await expect(page).toHaveTitle(/Sign Up/)
});
```

これはページのタイトルがSign Upになっていることを確認していて
ちゃんと`login.html`から`register.html`に遷移していることが確認できるテストです

試しに

```js
test('if sign up clicked, show content include username input', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  // await expect(page).toHaveTitle(/Sign Up/)
  await expect(page).toHaveTitle(/fafa/)
});
```

こうしてみてください。
タイトルが出鱈目な文字列にしてテストが通らないことを確認してみてください


## 画像を生成して画面が正しいことを証明するテスト

スクリーンショットを作る関数を加えることでできます

 `await page.screenshot({ path: "xxxx.png" })`

 生成したい場所のpathを記述する。タイトルはtestのタイトルを要約したものでも良いです

```js
 await page.screenshot({ path: "./src/playwright/login/if-sign-up-clicked.png" })
```

最終的にこのようにテストがかけました。

```js
test('if sign up clicked, show content include username input', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html'); // playwrightがページ遷移する。
  await page.getByRole('link', { name: 'Sign Up' }).click(); // クリック
  await page.getByText('Login ▶︎ Sign Up UserName必須 E-mail必須 Password ( 8文字以上の大小英数字 )必須 利用規約に同意しました ( 規約').click(); // TODO コンテンツの中身が正しければいいのでそのように置き換える
  await page.screenshot({ path: "./src/playwright/login/if-sign-up-clicked.png" })
});
```

## yarn test

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/スクリーンショット-2023-04-15-15.37.50.png" width="400" />

画像が生成されます
## 課題

### 正常系

1. `register.html`でEmail項目がinvalidの時にエラ-文言が出ることをテストしてください
2. `register.html`で利用規約をclickしたらモーダルがオープンされることをテストしてください

- `register.spec.js`としてテストを書くこと
- package.json内のコマンド、テストへのパスも変更すること
- テストのtitleもちゃんと何をテストしているのか書く
- 画像を生成するなら画像の名前も一意にすること


### 解答

<details>
<summary>解答</summary>

1. インスペクタはclickコードを生成しますが実はblur指定です。正しいイベントに直したり微調整しましょう

```js
test('if email input fill "fafafa", error message appear', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.getByLabel('E-mail必須').fill('fafafa');
  await page.getByLabel('E-mail必須').blur(); // here
  await page.screenshot({ path: "./src/playwright/login/email-error-message.png" });
});
```

[https://playwright.dev/docs/api/class-locator#locator-blur](https://playwright.dev/docs/api/class-locator#locator-blur)

2. locatorsを使いこなそう

```js
test('if riyoukiyaku clicked, modal is open', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.locator('#js-checkbox-link').click ();
  await expect(page.locator('#js-modal-inner')).toContainText("利用規約")
});
```

[https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)

</details>


## Tips

### ターミナルは3つ立ち上げておくといいです

- `yarn dev`でサーバーを立ち上げるターミナル
- `yarn test-view` でインスペクタを立ち上げるターミナル
- `yarn test` でテストを実行するターミナル

### インスペクターにある機能を使いこなそう

- Recordingを止めて右上にあるx印でテストコードを初期化する
- Recordingを止めてlocatorを使って要素を検出して利用する

## トラブルシューティング

- 立ち上がらない
  - `killall node` 立ち上げているlocalhostを一回全部止めてください
  - localを`yarn dev`で立ち上げ直す

 - Errorが出る

Error: browserType.launch: Executable doesn't exist at /Users/yours/Library/Caches/ms-playwright/chromium-1055/chrome-mac/Chromium.app/Contents/MacOS/Chromium
    ╔═════════════════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright Test or Playwright was just installed or updated. ║
    ║ Please run the following command to download new browsers:              ║
    ║                                                                         ║
    ║     npx playwright install                                              ║
    ║                                                                         ║
    ║ <3 Playwright Team                                                      ║
    ╚═════════════════════════════════════════════════════════════════════════╝

`npx playwright install` する必要あります

- 立ち上がらない2
  - yarn devした後で yarn test-viewしてください。先にyarn dev
  - pwdを叩くとsample配下にいますか？
- テストでこけて最後までスクリーンショットが生成されない
  - テストを書き過ぎて重くなっているかもしれないです。テストを短くしてみる

- sampleでyarn test-viewすると

```
warning package.json: No license field
$ npx playwright codegen http://localhost:3000/login.html
[Error: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login.html
=========================== logs ===========================
navigating to "http://localhost:3000/login.html", waiting until "load"
============================================================]
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
yarn devした後、別のターミナル立ち上げてplaywright/sample下に移動し、yarn test-view

- testでこける
  - testのタイトルが重複していませんか

- testが動かない、スクリーンショットが生成されない
  - sampleディレクトリ直下でyarn testしてますか
  - 別のテストをしていませんか?
  - 別のlocalhostを立ち上げていませんか?
  - 以下を試して再度立ち上げ直し、実行してみてください
  
  ```
    - 1. killall node
      2. pwdでsample直下にいることを確認
      3. yarn dev
      4. 別ターミナルを開く
      5. 別ターミナルでpwdでsample直下にいることを確認
      6. yarn test
  ```

  - vscodeの拡張でplaywrightをインストールして設定していませんか？
    - その場合configファイルが作られてこのプロジェクトの設置とバッティングします
    - vscode拡張の設定の方が正しいと思いますが、それはまだWIPですのであくまでドキュメントに沿ってください

