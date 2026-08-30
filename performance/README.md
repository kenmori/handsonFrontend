### ブラウザの仕事

→HTML、CSS、JSファイルを取り込み画面上にピクセルをレンダリングさせること

### パフォーマンスの最適化とは

→各ファイルのバイトの受信からこれらをピクセルとしてレンダリングするために必要な処理までの中間段階(クリティカルレンダリングパス)を最適化すること

・https://t32k.me/mol/log/style-class-conference/

・https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=ja

### クリティカルレンダリングパス

1.レスポンスされたファイルの「バイト」を文字に変換(Byte Stream Decoder)

→htmlなど未加工のバイトを読み取りファイルに指定されているエンコード方法に基づいて個々の文字に変換する

↓

文字になる

↓
(inputStream Preprocessor)ScriptExcutionでdocument.write()されるとここにもどる

↓

2.トークンを識別(Tokenizer)

→文字列をW3Cで指定している個々のトークン<html>に変換

↓

3.Nodeに変換

→発行されたトークンはプロパティとルールを定義するオブジェクトに変換

↓

4.DOMツリーを構築

→ScriptExcution(スクリプトがあればパースをやめるてInputStreamに戻る)。

http://qiita.com/mamo/items/ff336b5cc0a1a95e03a7

→親子関係の構築。

↓

DOMができあがる。

プロセスの最終結果がオブジェクトドキュメントモデル。

ブラウザがページ処理する際に必ずこのDOMを使用する

このプロセスにかかった時間はParseHTMLの「selfTime」

DOMツリーはマークアップのプロパティと関係性をキャプチャしているが各要素がレンダリング時にどのように表示されるかは示していない。(CSSOMの仕事)

$(document).ready(function(){}); or $(function(){}); ・・・このDOMツリーが作られたら発火。unloadよりも早く実行される

・imageのloadedを待たない→$(window).load(); or window.onload(), $(document).on(‘load’,handler)

・複数回使用可能

・$が未定義の場合Jqueryに置き換えられる

DOMContentLoaded・・・HTML5で定義。$(document).ready()と同じでツリーの構築が完了したらちいう点で発火は一緒。

違いはJquery(古いブラウザバージョンに対応するためDOMcontentLoadを使わないready判定をした)かHTML5か。

最初のHTMLドキュメントの読み込みと解析が完了した時点で発火。stylesheetや画像、サブフレームの読み込みが終わるのを待ちません

正しい時にコードを実行する(Running Your Coad at the Right Time)

https://www.kirupa.com/html5/running_your_code_at_the_right_time.htm


HTMLパースはscriptの実行を待つ。scriptはstylesheetの解析を待つ。よってstylesheetもHTMLパースを止める要素になる

http://qiita.com/mamo/items/ff336b5cc0a1a95e03a7

CSSOM

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=ja

ブラウザはスタイルシートへの参照を見つけると

HTMLのプロセスを繰り返す

byte→characters→tokens→nodes→CSSOM

一度計算したスタイルのルールを再帰的に適応していく(カスケードダウン)

CSSの処理時間→Recalculate Styleイベント(解析、CSSOM構築、計算済みスタイルの再起計算がキャプチャされている)

selfTime→かかった時間

Elements affected(ページ内の要素に影響を与えている箇所)

どこに影響を与えているか？？

→レンダリングツリー

オブジェクトモデルの構築

→CSSOMとDOMの構築

レンダリングツリー

・CSSOMツリーとDOMツリーを組み合わせたものがレンダリングツリーが形成される。一方はコンテンツ記述、一方は表示スタイル

ページのレンダリングに必要なノードのみが含まれている状態

レンダリングツリーを作成するためのブラウザの処理

・表示される各ノードをトラバース

・scriptタグmetaタグなどは表示されることがないのでレンダリング出力に反映されない

・CSSで非表示処理されているdisplay:noneなどはツリーに含まない

・一致する適切なCSSOMのルールを見つけて適応

・コンテンツ及び計算済みスタイルを含めて表示荒れるノードを出力

最終的に全てのコンテンツとスタイル情報の両方を含むレンダーツリーが出力される

正しく構築されたらレイアウトの段階に進む(表示されるノードとノードの計算済みスタイルがわかった状態)

↓

レイアウト(オブジェクトの正確な位置とサイズを計算・別名「リフロー」)

<div stle=“width: 50%;”>など。

ブラウザはオブジェクトの正確な位置と算定するためレンダリングツリーのルートからオブジェクトをトラバースする

・「ボックスモデル」を作成

Layout(レンダリングツリーの構築、位置、サイズを計算)

↓

各ノードを画面上の実際のピクセルに変換「ペインティング/ラスタライジング」

ペイント(完成したレンダーツリーを取り込んで画面にピクセルをレンダリングする)

PaintSetupとPaintイベントを発行

上記のクリティカルレンダリングパスを最適化するにあたり
以下のことを気をつける
・クリティカルリソース数の最小化
・クリティカルバイト数の最小化
・クリティカルパス長(Critical path length)の最小化

html内で外部css1つを読みに行くと
htmlをリクエストして、その後CSSをリクエストする。
２往復するので2ラウンドトリップとなる。
https://t32k.me/mol/log/style-class-conference/
なのでインライン化するのがグーグル推奨
→だが全てインライン化すると膨れ上がる
→クリティカルCSSだけをインライン化する

Critical
クリティカルCSSを検出するnpmモジュール
https://github.com/filamentgroup/criticalcss

CriticalCSSのインラインCSSを作るライブラリ
https://github.com/addyosmani/critical

クリティカルCSSの対応
https://t32k.me/mol/log/style-class-conference/

    
http://webhack.hatenablog.com/entry/how-fast-page-speed


CRPを計測するツール
LightHouse
https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related?hl=ja

github
https://github.com/GoogleChrome/lighthouse

LightHouseの評価基準


### ATF(Above the fold→折り目の上→スクロールせずに表示される箇所)

pageSpeedInsightでは
ファーストビューを1秒以内にレンダリングさせることを指標としている。下のコンテンツはバックグランドで構わない
・訪問者の77%はATFしか閲覧していない
・ユーザーがページ表示に待てるのは2秒まで
・3秒以上かかると40%以上のユーザーは離脱する
・表示が1秒遅れるごとにコンバージョン率は7%落ちる
・表示が1秒遅れるごとに顧客満足度は16%落ちる
https://www.suzukikenichi.com/blog/website-performance-optimization/

・DNSルックアップ、TCPハンドシェイクを実行するためのネットワークの往復、後にHTTPリクエストを送信するためのネットワークの往復全体といったネットワークのオーバーヘッドに費やされている残りは400msしかない


Google社員が

Above The Foldのコンテンツ表示には、CSSやJSのインライン化をおすすめします

と言っている。
https://plus.google.com/+PierreFar/posts/jSRJaZscmpX
読み込みの順番待ちをしている外部ファイルよりも先に表示させてしまえという発想





googleChomeが提供する
serviceWorkerでPWAの点数を上げる
https://github.com/GoogleChrome/sw-precache/

gulpにpageSpeedInsightsの点数を表示させる
https://github.com/addyosmani/psi

https://www.slideshare.net/stoyan/high-performance-web-pages-20-new-best-practices/3-This_talk_ulliHow_to_improve
500ms　遅いと = 20%トラフィックが落ちる(google)
100ms遅いと = 1%売り上げが落ちる(Amazon)


### TimeLine
リクエストからバイトが帰ってくるまで
https://t32k.me/mol/log/reduce-http-requests-overview/

connectからresponseが返ってくるまでがwaiting
最後のパケットが送り終わるまでがreceving
・クライアントとサーバーのやりとりにかかる時間とラウンドトリップ(RTT)とダウンロード(DL)が重要

一つのドメインに同時接続できるのは6つまで
開くのを待っっているのがwating
ドメインシャーディングとは静的ファイルを別ドメインに配置することで同時接続数の上限を最大化させる手法

並列ダウンロードさせる

ドメイン数を多くしたらしたでDNSルックアッップに時間がかかったりクライアントの最大コネクション量を大きく超えて意味なかったりするので2.3つぐらいがベスト

RTTはサーバーを近くに置くことしか解決できないのでフロントエンドはいかにRTTをさせないかが重要

https://t32k.me/mol/log/reduce-http-requests-overview/

ページインサイトでのモバイル解析(求められる指標)
https://developers.google.com/speed/docs/insights/mobile


### リフローとリペイン


https://developers.google.com/web/fundamentals/performance/rendering/?hl=ja

・端末は画面を1秒に60回リフレッシュする
・画面がリフレッシュされるたびに1つの画像、フレームを表示させる必要がある
1/60 = 16.66ms
実際にはハウスキーピングを行う必要があり、全ての作業は10ms以内に完了する必要がある



### ピクセルパイプライン
JS/CSS →スタイル→レイアウト→ペイント→コンポジット

JS
Styleの計算
→スタイルシートのセレクタを見つけ出す。

レイアウト
→ブラウザがその要素と他の要素の関係性を計算して配置する。bodyをいじった時など、ブラウザにより幅が違うので、子要素全てに影響する
width, height, margin, left/top

ペイント
→要素の視覚的な部分の描画に与えるスタイル
    →２つある。ドローコールのリスト作成。ピクセルでの埋め込み。後者がラスタライゼーション
box-shadow/border-radius/ background/outline

コンポジット
→要素の重なり順の描画
transform/opacity

重要
1.レイアウトの変更(要素の高さ、幅、位置)はブラウザは他の要素を全てチェックし直してページを「リフロー」する

2.ペイントのみに与えるStyle変更の場合ブラウザはレイアウトをスキップするが、ペイントは行われる

3.レイアウトもペイントも行わないプロパティ変更の場合、ブラウザはそれらをスキップしてコンポジットのみを行う

どのプロパティ変更が上の3つのどのバージョンにトリガーされるか。ピクセルパイプラインに影響するプロパティ
https://csstriggers.com/


ジャンクの意味と状態 16msでおさまらない場合
https://zamboney.github.io/pixel-pipeline/#/1/2


ハイパフォーマンス・アニメーション
https://www.html5rocks.com/ja/tutorials/speed/high-performance-animations/
ブラウザが行う処理
スタイルの計算(Recalulate Style)
↓
要素のジオメトリ(位置と大きさ)と位置を生成(Layout)
↓
レイヤーへそれぞれの要素のピクセルを埋める(Paint SetupとPaint)
↓
スクリーンに対して描画する(Composite Layers)

タイムラインのウォーターフォールの上にあればあるほどブラウザの処理する量が多くなる


・要素に変更を加えるとブラウザはその変更を受ける全ての要素を計算してレイアウトする(他の要素の再計算)
例) html要素の幅を変更すると全ての子要素の再計算、子要素ではみ出すような処理は影響を与える親要素を再計算

Paintの処理。paintのプロパティをいじると再描画
それらの属するレイヤーがGPUに転送

CPUとGPU間の転送量も限られている

コンポジションを伴うアニメーションプロパティ

GPUレイヤー生成
・translateZ(0)やtranslate3d(0,0,0)を使って強制的に
・

 JSでアニメーションを制御する際とCSSでアニメーションを制御する場合の違い
・JS(命令的アニメーション)
→メインスレッドを使うことがデメリット
    →スタイル計算やレイアウトや描画のタスクを邪魔する
        →スレッドの競合が起きる
            →アニメーションフレームのコマ落ちの可能性がある
メリット
→パララックススクリーニングのように多彩な表現力
→数多くの制御(再生、一時停止、逆再生、中止、キャンセル等)

・CSSアニメーション(宣言的アニメーション)
宣言的アプローチとはtransitionやanimationをCSS記述すること
メリット
→レイヤーが作れる(Compositだけの処理にさせる)
→メインスレッドでの操作や実行を止めることができる

→複雑な制御ができない。表現力がない。アニメーションを組み合わせられない。

展望
→Workerを使ったJSアニメーション
    →レイアウトやスタイルの再計算を引き起こさない

命令的なアニメーションの展望
https://github.com/ianvollick/animation-proxy/blob/master/Explainer.md

宣言的なアニメーションのアプローチ
https://www.smashingmagazine.com/2013/03/animating-web-gonna-need-bigger-api/

結論
・layoutやpaintを引き起こすプロパティをアニメーションさせるのを避ける
アニメーションはなるべくCSSでやること→事前にブラウザに最適化することができるから

transformを使う→レイヤーを作り、GPUに処理を任せられる→メインスレッドの仕事を邪魔しない。compositのみの処理で軽い

・opacity : 0…1;
・transform: translate(npx, npx);
・transform: rotate(ndeg);
・transform: scale(n);
位置、大きさ、回転、透明度。これ以外のものをアニメーションするなら絹のような滑らかな動きは実現できない
transformとopacityのみのプロパティ変更にとどめるべき


・将来JSぐらいの表現で実装できてコストがなく、CSSアニメーションと同じくらいブラウザに



アナリティクスJSの仕組み
https://developers.google.com/analytics/devguides/collection/analyticsjs/how-analyticsjs-works?hl=ja

参照
http://www.aiship.jp/knowhow/archives/16781