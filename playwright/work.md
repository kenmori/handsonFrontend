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


## playwright

- E2Eテスト自動化ツール

- クロスブラウザテストができる
- スナップショット画像を生成してくれる
- テスト収録でテストコードを生成してくれる
and more...

何も考えずenter

## cdでsampleプロジェクトに移動

handsonFrontend/playwright/sample

## yarn test-view

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/page.gif" />

## テストする動作を収録してインスペクターに追加する

`/src/test/login.spec.js`
を作る

playwright inspectorの内容をそこにはる

[テスト]

- sign up押下した時に画面が表示されること

```js
test('if sign up clicked, show content include username input', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByText('Login ▶︎ Sign Up UserName必須 E-mail必須 Password ( 8文字以上の大小英数字 )必須 利用規約に同意しました ( 規約').click();
});
```

画像を生成したい

## スナップショットを作る関数を加える

 await page.screenshot({ path: `xxxx.png` })

 生成したい場所のpathを記述する。タイトルはtestのタイトルを要約したものでも良いです

```js
 await page.screenshot({ path: `./src/playwright/login/if-sign-up-clicked.png` })
```

最終的に

```js
test('if sign up clicked, show content include username input', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByText('Login ▶︎ Sign Up UserName必須 E-mail必須 Password ( 8文字以上の大小英数字 )必須 利用規約に同意しました ( 規約').click();
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
1.

```js
test('if email input fill "fafafa", error message appear', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.getByLabel('E-mail必須').fill('fafafa');
  await page.getByLabel('E-mail必須').blur();
  await page.screenshot({ path: "./src/playwright/login/email-error-message.png" });
});
```

2.

```js
test('if riyoukiyaku clicked, modal is open', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.locator('#js-checkbox-link').click(); // linkをclick
  await page.screenshot({ path: "./src/playwright/login/modal-open.png" });
});
```

</details>

## トラブルシューティング

- 立ち上がらない
  - `killall node` 立ち上げているlocalhostを一回全部止めてください
  - localを立ち上げ直す

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

- testが動かない
  - sampleディレクトリ直下でyarn testしてますか
