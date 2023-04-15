# playwrightに触れるハンズオン

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/playwright.png" />

※このハンズオンは制作の方向けに書かれていてフロントエンドのテスト方法とはかけ離れているかと思います。適宜ドキュメントを参考にして設定してください
※あくまでどんなものなのか触れるだけのハンズオンです
※sampleプロジェクトは[@fuwafuwahappy](https://twitter.com/fuwafuwahappy)さんのご提供です。ありがとうございます

playwrightとはend-to-endテストを便利にやってくれるもの

- unit test(単体テスト)
- end-to-end(統合テスト)

何も考えずenter

## cdでsampleプロジェクトに移動

handsonFrontend/playwright/sample

## yarn test-view

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/page.gif" />

## テストする動作を収録してインスペクターに追加する

`/src/test/login.spec.js`
を作る

playwright inspectorの内容をそこにはる

画像

## スナップショットを作る関数を加える

 await page.screenshot({ path: `xxxx.png` })

## yarn test

<img src="https://kenjimorita.jp/wp-content/uploads/2023/04/スクリーンショット-2023-04-15-15.37.50.png" width="400" />

## トラブルシューティング

- 立ち上がらない
  - killall node
  - localを立ち上げ直す

- テストでこけて最後までスクリーンショットが生成されない
  - テストを短くしてみるとか
