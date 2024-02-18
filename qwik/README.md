
# qwik(読み方: クウィック) ハンズオン~qwikに触れる~


https://qwik.dev/tutorial/welcome/overview/

フルスタックフレームワーク

- Next.js
- Remix
- Qwik
- Astro
- [Fresh](https://fresh.deno.dev/)
- [HonoX](https://github.com/honojs/honox)


たくさんある
https://npmtrends.com/@builder.io/qwik-vs-@remix-run/react-vs-next-vs-remix


私が知ったきっかけ
https://zenn.dev/mizchi/articles/micro-frontend-qwik


最近Remix SPAについて調べて素振りしてみた
https://stackblitz.com/edit/remix-run-remix-76skjr?file=README.md

どんどん触っていくことで特徴と思想を知りたくなった

- `React`の `Selective Hydration`
  - Hydrationの実行を非同期にして遅延させる
- `Astro`、`Fresh`の `Islands Architecture`
  - [islands-architecture](https://jasonformat.com/islands-architecture/)
  - Hydrationを行う箇所を限定する
- `Remix`
  - [entry.client](https://remix.run/docs/en/main/file-conventions/entry.client)
- `Qwik` では `Resumable`(レジュメブル)
  - Hydrationを行わずにHTMLに状態をシリアライズさせる
    - アプリケーションの規模によって初期ロードのJSのサイズが変わらない
  - [Progressive Hydration 段階的な水分補給が思ったより難しい理由](https://www.builder.io/blog/why-progressive-hydration-is-harder-than-you-think)

流行るかどうかは分からないが、
Hydrationの問題解決としてこういうのがあることを知る

シリアライズされている様子
https://stackblitz.com/edit/qwik-starter-j2vb6y?file=src%2Fcomponents%2Fstarter%2Fcounter%2Fcounter.tsx

## Hydrationの問題点

- TTI(Time to Intaractive)に対して遅延がある
- 画面は表示されているのにクリックが効かない状態

https://x.com/TkDodo/status/1757037627100869027?s=20



https://www.gatsbyjs.com/docs/conceptual/react-hydration/#what-is-hydration (gatsby)

> Hydrationとは、クライアントサイドJavaScriptを使用して、サーバーレンダリングされたHTMLにアプリケーションの状態とインタラクティブ性を追加するプロセスである

> 静的なHTMLコンテンツをインタラクティブなアプリケーションに変える行為

「hydrateを簡単に説明する」

https://medium.com/@neonpie_official/hydration-explained-briefly-d503cd2d59b0


## Qwikの特徴

Qwikは[プログレッシブハイドレーション](https://www.builder.io/blog/why-progressive-hydration-is-harder-than-you-think)で解決する


この書き方は
> Qwik Optimizer の仕事は、特にアプリケーションをできるだけ多くのエントリ ポイントに分割することです。あまり詳しくは説明しませんが、開発者は $ サフィックスを使用して、遅延ロード境界が必要であることをオプティマイザーに通知します。

```js
const Counter = component$(() => {
  const state = useState({count: 0};
  return onRender$(() => (
    <button on$:click={() => state.count++}>
      {state.count}
    </button>
  ));
});
```

> 上の例では、$記号が3つある。これは、アプリケーションが3つの遅延ロードされたチャンクに分割されることを意味します。


> プログレッシブ・ハイドレイト・アプリケーションには、main()エントリーポイント／ブートストラップは存在しない

## 時間がある場合 Handson

https://stackblitz.com/edit/qwik-starter-j2vb6y

/routes/demo/mycounter/index.tsx

componentを作る
- https://qwik.dev/docs/components/overview/#component

```js
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return <div>Hello World!</div>;
});
```

`demo/mycounter`で確認する

https://qwik.dev/


`npm create qwik@latest`


# Routing

https://qwik.dev/docs/routing/


# クウィック・シティ
QwikがコンポーネントAPIに重点を置いているのに対して、Qwik Cityは一般的なサーバーに重点を置いた機能でコンポーネントをサポートするAPIを含んでいる：



## Qwikへようこそ！


和訳です

> Qwikは、クライアント上で即座に起動するリジューム可能なアプリケーションを構築するためのフロントエンドフレームワークです。Qwikは、ユーザがトリガーしたアクションを実行するために厳密に必要なコードのみをダウンロードして実行するという哲学に集中することで、これを実現します。Qwikは、Webアプリケーションを構築するための根本的に新しいアプローチを表す、きめ細かい遅延ロードフレームワークです。

> Qwikチュートリアル
> 以下はQwikを使い始めるためのチュートリアルです。それぞれのチュートリアルは1つのトピックに焦点を当て、動作させるためにあなたの参加を必要とする実践的な例を含んでいます。

> チュートリアルは以下のセクションに分かれています：

> はじめにサーバーサイドのプリレンダリングとクライアントサイドのインタラクティブ性を持つシンプルなアプリケーションの構築に重点を置いた、Qwikのテンポの速い入門です。このチュートリアルは、個々のAPIの詳細に焦点を当てるのではなく、Qwikアプリケーションがどのように構築されるかを体感できるように設計されています。

> コンポーネントコンポーネントの宣言、バインディング、コンポジションについて説明します。
> イベント：イベントの宣言、バインディング、トリガー。

> ストアストアの宣言、データ・バインディング、リアクティビティ、シリアライズ。

> プロプス：プロプスとコンポーネントの宣言と操作、シリアライズの制約について深く掘り下げます。

> リアクティブ：リアクティビティがどのように機能し、より複雑なアプリケーションを構築するためにどのように使用できるかを深く掘り下げます。

> コンテキスト：コンテキストを通じて、アプリケーションでデータをグローバルに利用できるようにします。

> ライフサイクル・フック：コンポーネントのライフサイクル・フック。

> スロット：コンテンツプロジェクションの仕組みと、より複雑なシナリオでの使い方について深く掘り下げます。

> スタイリング：CSSを使ってアプリケーションをスタイリングします。
> オプティマイザーオプティマイザーの制約を理解する。
> 新しいAPIの作成アプリケーションに新しい use___() と $ API を作成する。



# コンポーネントの作成、データの保存、リスナーのアタッチ、サーバからのデータ取得の方法


## store

https://qwik.dev/tutorial/introduction/store/

> useStore() を使用して、コンポーネントの状態を保存します。ストアの目的は

> コンポーネントの状態を保存する
> 状態をプロキシとして提示し、ストアへの読み取り/書き込みを監視する。
> アプリケーションの一時停止時に、ストアの状態をJSONにシリアライズする。
>ストアのどのプロパティがコンポーネント・テンプレートで使用されているかを観察し、ストアへのサブスクリプションを作成します。サブスクリプションは、ストアが変更された場合にコンポーネントテンプレートを自動的に更新するために使用されます。
> ストアは useStore() 関数を使用してコンポーネントの関数内で宣言されます。ストアを作成するには、useStore(...)関数の呼び出しでgithubの割り当てをラップします。



[参考]
- https://www.docswell.com/s/kawamataryo/K4GW15-qwik-resumable#p10

- 
