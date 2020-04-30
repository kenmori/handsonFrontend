hi everyone I'm Lin Clark and I make
_code cartoons and I also work in the
emerging technologies group at Mozilla
so that means things like web assembly
and the rough programming language and
servo which is a super fast browser
rendering engine I'm not here to talk
about those things today I'm here to
talk about fiber when the conference
organizers asked you all what you most
want to hear about fiber was far and
away the number one answer so that's why
I'm excited that I get to come here and

こんにちは、私はLin Clarkです。
_codeの漫画と私も
Mozillaの新興技術グループ
つまり、Webアセンブリのようなもの
ラフプログラミング言語と
超高速ブラウザであるサーボ
私は話をしていないレンダリングエンジン
今日のことについて私はここにいます
会議の際にファイバーについて話す
主催者はあなたにあなたに一番何を尋ねました
ファイバーについては聞きたかったです
一番の答えを捨てて、それが理由です
私がここに来ることに興奮し、

explain fiber to you I assume since it
was the number one answer that most of
you probably have an idea of what fiber
is and Sebastian did mention it earlier
but don't worry if you don't know
because I'm going to start from the
basics and explain to you exactly what
it is and how it works but before I do
that I want to show you what it does so
here's an example react app on the left
you see react as it is today and on the
right you see react with fiber now this
is a toy application it's not very
useful in and of itself but it is a good
stand-in for more real life applications
and I'll explain why that is later so
what a fiber do it improves perceived
performance and responsiveness for
complex complex react applications like
this one now that you know what it does
I'll explain what it is
so fiber is the new reconciliation
algorithm for react
that's terminology reconciliation
algorithm that might be new to some o
you so explain where that comes from
when react first came out the killer
feature was the virtual DOM and the
reason that this was the killer feature
was because it made coding user
interfaces so much easier


fiberを説明してください
一番の答えは
あなたはおそらくどのようなfiberのアイデアを持っています
であり、セバスチャンは以前に言及しました
知らなくても心配しないで
から始めるので
基本と正確に何を説明します
それはどのように機能するかですが、私がやる前に
それが何をするのかをお見せしたいと思います
左側のReactアプリの例です
あなたはそれが今日であり、
今、これがファイバーとReactするのを見る
おもちゃのアプリケーションです
それ自体は有用ですが、それは良いです
より現実的なアプリケーションの代役
それが後である理由を説明します
知覚を改善すfiberする
パフォーマンスと応答性
複雑な複雑なReactアプリケーション
あなたはそれが何をするか知っている
今これ
それが何であるかを説明します
fiberは新しい和解です
Reactのアルゴリズム
それは用語の和解です
いくつかのoに新しいかもしれないアルゴリズム
あなたはそれがどこから来たのかを説明する
Reactが最初にキラーを出たとき
機能は仮想DOMであり、
これがキラー機能だった理由
それはコーディングユーザーになったからでした
インターフェースがとても簡単


instead of having to tell the browser
how to go from the previous version of
your app to the next version you could
just tell react what the next version
should look like and it would handle
everything in between it turned out that
this was useful not just when working
with the Dom but also when working with
other things like hardware and virtual
reality and native apps if we asked one
to be able to address these use cases
though I was going to have to factor out
the part of react that figured out the
changes from the previous version of the
graph to the next version from the part
that actually manipulated the Dom to get
it there this introduced a formal
distinction between the reconciler and
the renderer renders our pluggable so
you can use renders from outside from
the rest of the community to target
other host platforms besides the Dom but
there's only one core reconciliation
algorithm that's what you download with
react this is why fiber is such a big
deal over the past year reacts core team
has been doing a ground-up rewrite of
this core feature this killer feature of
react and the end result is the fiber
reconciler let's go back to this demo
what is it about the fiber reconcile
that takes this kind of janky motion on
the left and makes it fluid in smooth so
I want to talk a little bit about what
exactly is going on in this demo there
are two different updates going on
there's one that's an arrow making the
triangle narrower and wider and there's
one that is going into each dot and
changing the number and this is a good
stand-in for other real-life
applications because it makes very


ブラウザに伝える必要はありません
以前のバージョンから移行する方法
アプリを次のバージョンに
次のバージョンが何であるかをReactしてください
のように見えるはずです
その間のすべてが判明した
これは作業中だけでなく便利でした
ドムと一緒にだけでなく、
ハードウェアや仮想のような他のもの
現実とネイティブアプリ
これらのユースケースに対処できるようにするため
因数分解しなければならなかったけど
考え出したReactの部分
以前のバージョンからの変更点
部品から次のバージョンへのグラフ
実際にDomを操作して
そこにこれは正式な
リコンシリエターとの違い
レンダラーはプラグ可能をレンダリングするので
外からレンダーを使用できます
ターゲットとするコミュニティの残りの部分
Dom以外のホストプラットフォーム
コア調整は1つだけです
ダウンロードに使用するアルゴリズム
これがReactするのは、ファイバーがとても大きい理由です
過去1年間の取引はコアチームにReactします
ゼロからの書き直しを行ってきました
このコア機能このキラー機能
Reactし、最終結果はfiberです
リコンシリエターはこのデモに戻りましょう
fiber調整についてそれは何ですか
それはこのようなぎくしゃくした動きをする
左はスムーズに流れるようにします
少し話がしたい
まさにこのデモで起こっています
2つの異なる更新が行われています
矢印を作るものがあります
三角形が狭くて広く、
各ドットに入る1つと
数を変更すると、これは良いことです
他の現実の代役
それは非常に作るのでアプリケーション


visible interactions between two
different kinds of updates there's a
high priority update and a low priority
update Sebastian talked about dis
earlier in the in his talk but for an
example of a high priority update would
be when you're typing you need to have
that immediate feedback loop when you're
typing an example of a low priority
update would be when you have thing
coming in from the server updating
things like the number of likes on a
comment and this shows that what happens
when you combine these high priority
updates and these low priority updates
so let's talk about the mechanics o
this example you have a triangle at the
top level and then there are more
triangles it keeps going down and down
until you get to a point where you have
to place a dot because you can't fit
more triangles these updates are going
to touch different parts of this treaty
the update that's going narrower and
wider is only going to touch the
top-level triangle so it doesn't it's
not very computationally intensive but
it is happening frequently if happening
every 16 milliseconds to give you that
fluid motion on the other hand the other
update is pretty computationally
intensive because it has to touch every
single instance in this tree it's only
happening once per second and if it
doesn't happen immediately on every
second if it's another 100 or 200


2つの間の目に見える相互作用
さまざまな種類の更新があります
優先度の高い更新と優先度の低い
セバスチャンはdisについて話しました更新
彼の話の早い段階で、
優先度の高い更新の例は
あなたがタイピングしているとき、あなたは持っている必要があります
あなたがいるときにその即時フィードバックループ
優先度の低い例を入力する
更新があるとき
サーバー更新から入ってくる
のいいねの数のようなもの
コメントとこれは何が起こるかを示しています
これらの高い優先度を組み合わせると
更新およびこれらの優先度の低い更新
だから力学について話しましょうo
この例では、
トップレベル、それからもっとあります
三角形が下がり続けます
あなたが持っているポイントに到達するまで
フィットできないのでドットを配置する
これらのアップデートが進んでいる三角形が増える
この条約のさまざまな部分に触れる
狭くなるアップデートと
幅が広くなるのは
トップレベルの三角形なので、そうではありません
あまり計算集約的ではありませんが
起こっている場合、それは頻繁に起こっています
16ミリ秒ごとに
一方、流体の動き
更新はかなり計算上です
それはすべてに触れなければならないので集中的
このツリーの単一インスタンスはそれだけです
1秒に1回発生し、
すぐに起こるわけではない
別の100または2の場合は2番目

milliseconds you're probably not going
to notice so let's look at this
chronologically
in order for these side-to-side motions
to look fluid we need 60 frames per
second we need that 16 milliseconds per
frame now you may think that the answer
to get this is to make react itself
faster but the problem is not that this
update can't fit you know you're only
touching one instance it's not that it
can't fit in 16 milliseconds it's the
fact that it's getting stuck behind
these larger updates and most of the
time that's spent on these larger
updates it's actually spent in the
render function in other functions that
are part of the user code and not part
of react itself
so making react itself faster won't make
this fast enough to solve this problem
but there is a way to solve this problem
and that's by making the updates play
together better and it's not just react
updates that need to play together
better it's also updates coming from the
browser so things like CSS animations
browser resizes those would also get
trapped behind these larger updates and
that's because of the weight of the
browser works I've talked about this a
little bit before when you're building a
website it's kind of like your code is
the project lead on this website
unfortunately it only has one employee
it only has one worker that's working to
build this website and that's the main
thread so the main thread is kind of
like a full stack developer it does dom
javascript layout it does all of the
things and as long as it spends time
doing the javascript update it can't do
these other things you can't do layout
and

あなたはおそらく行かないミリ秒
気づくので、これを見てみましょう
年代順に
これらの左右の動きのために
滑らかに見えるようにするには、1フレームあたり60フレームが必要です
2番目に、毎秒16ミリ秒必要です。
フレーム今、あなたは答えを
これを得るためにそれ自体をReactさせることです
より速いですが、問題はこれではありません
アップデートはあなたに合うことができません
1つのインスタンスに触れることはそれではありません
できる

 I've said before
when you use react how it helps with
that is it knows how to work better with
amines right that's kind of like a
technical leave that knows exactly how
the main thread works and so it makes
the main thread more efficient in its
work it can direct the main thread in
its work by minimizing and batching
contain jizz what fiber does is
basically teach this technical leave
some basic project management skills
like how to split up work and how to
prioritize work and it also gives the
technical lead a watch so that it can
keep track of how much time is passed
so how do these new skills come into
play how do they change the way that the
reconciler works let's start by looking
at how the existing reconciler works and
this is a diagram I've used in
explaining it before on the left you'll
see the element so those are the things
that your component hands off during
render to tell react what it should
build in the middle are the instances
which react creates as a way of managing
figuring out what the previous state was
what the next state is and what changes
it needs to make and then the Dom nodes
are what react uses to actually tell the
browser what it needs to do with the
existing reconciler this is constructed
layer by layer so react will create the
element and then the instance and then
the Dom node or it will update the
instance and then the Dom node and to do
this it recursively calls mount
component or up to update component
until it gets to the bottom of this tree
so if you were to record a timeline of
this in your browsers dev tools you'd
actually see a graphic representation of
this you'll see a stack that has all of
these recursive calls and it just keeps
going deeper this actually shows us
where the problem is - because the main
thread is getting stuck underneath all
of these calls at the bottom of this
call stack but if you need to be able to
come up and check for other work see if
it needs to do other things you need to
be able to break this up and fiber does
that it makes it possible for the main
thread to compute a little part of the
tree and then come back up and check to
see if it has other work to do the way
that it keeps track of where it is in
the tree is through a data structure
all the fiber and that's where the fiber
reconciler gets its name from from this
data structure now the old reconciler

前に言った
あなたがそれをどのように助けるかをReactを使用するとき
つまり、それは上手く働く方法を知っています
アミンのようなものです
正確に方法を知っている技術休暇
メインスレッドが機能するので、
その中でより効率的なメインスレッド
メインスレッドを指示できる作業
最小化とバッチ処理によるその作業
fiberが何であるか精液を含みます
基本的にこの技術休暇を教える
基本的なプロジェクト管理スキル
作業を分割する方法や
作業に優先順位を付けると、
時計を技術的にリードして、
経過した時間を追跡する
これらの新しいスキルはどのようにして生まれるのですか
彼らはどのようにそれらを変更する方法を再生します
リコンシリエターの作業は、まず見てみましょう
既存のリコンシリエターがどのように機能するか
これは私が使った図です
左に前にそれを説明します
要素を確認してください
コンポーネントが引き渡す
それが何をすべきかをReactさせるためにレンダリングする
真ん中のビルドはインスタンスです
管理する方法としてReactを作成します
以前の状態を把握する
次の状態とは何か、何が変わるか
それを作る必要があり、それからDomノード
実際に伝えるためにreactが使用するものです
ブラウザはそれで何をする必要があるか
これが構築されている既存の調整サーバー
レイヤーごとにReactするので、
要素、インスタンス、そして
Domノードまたはそれは更新されます
インスタンスとDomノード
これは、mountを再帰的に呼び出します
コンポーネントまたは更新コンポーネントまで
この木の一番下まで
だからあなたがのタイムラインを記録するなら
これはあなたのブラウザの開発ツールで
実際にグラフィック表現を見る
これには、すべてのスタックが表示されます
これらの再帰呼び出しとそれは保持します
より深くこれは実際に私たちを示しています
問題がどこにあるか-メイン
スレッドはすべての下に行き詰まっています
この下部にあるこれらの呼び出しの
スタックを呼び出しますが、できるようにする必要がある場合
出てきて他の仕事をチェックしてください
それはあなたがする必要がある他のことをする必要があります
これを分解でき、ファイバーは
それはメインのためにそれを可能にすること
の一部を計算するスレッド
ツリー、そして戻ってきてチェックする
方法を実行する他の作業があるかどうかを確認します
それがどこにあるかを追跡していること
ツリーはデータ構造を介して
すべてのfiberとそこにfiberがあります
リコンシリエターはこれからその名前を取得します
データ構造が古いリコンシリエターになりました

 it
didn't have a name
so retro actively it's been given the
name the stack reconciler because it
uses a stack to keep track of the same
same thing this fiber is just a plain
JavaScript object and it has a one to
one relationship with an instance it
manages the work for an instance so it
keeps track of which instance is for
using the property state node it also
keeps track of its relationships to
other fibers in the tree easier to
understand these relationships if we use
an example so I'm going to use this
example user interface it's a list with
a button and when you click the button
it squares the numbers in that list this
only requires a handful of components so
we have a list component and when you
call render on it it returns an array
this may be new do as Tom mentioned in
his keynote earlier this morning we can
now return a raise from render so when
we're building up this tree the first
fiber in the tree is the host Drew and
that actually is it corresponds to the
container that you injected to react app
into in the dom and its first child is
the list there's a relationship from the
host root to the list which is child and
then there's a relationship from the
list back up to the parent which is the
return relationship now these children
of lists actually have some more
interesting relationships the button has
the same child and return relationship
but the first item you'll notice does
not have that child relationship from
the list to the item instead there's our
relationship from the button to the item
that's a sibling relationship and so all
of these siblings are going to point to
their next sibling that's how react is
going to traverse through this layer of
the tree so those are the relationships
that each fiber keep track of child
return and sibling there are some other
properties that fiber keeps track of but
I want to go through an example so you
can see how they all work in practice
so I'm going to go back to this example
I've used before but I want to make
things a little bit more interesting
halfway through the user is going to
click a button that increases the font
size and this doesn't need to do
anything in react 

それ
名前がなかった
とてもレトロで、それは与えられました
スタックリコンシリエターに名前を付ける
スタックを使用して同じものを追跡します
このfiberと同じものは単なるプレーンです
JavaScriptオブジェクトとそれに1つあります
インスタンスとの1つの関係
インスタンスの作業を管理するため、
どのインスタンスが対象であるかを追跡します
プロパティ状態ノードを使用する
との関係を追跡します
ツリー内の他のfiberは簡単に
使用する場合、これらの関係を理解する
例なので、これを使用します
ユーザーインターフェイスの例これはリストです
ボタンとボタンをクリックしたとき
それはそのリストの数を二乗します
ほんの一握りのコンポーネントしか必要としないので
リストコンポーネントがあり、いつ
レンダーを呼び出すと、配列が返されます
これはトムが述べたように新しいことかもしれません
今朝の彼の基調講演では
レンダーからレイズを返すので、
最初にこの木を作ります
木のfiberはホストドリューであり、
それは実際には
アプリをReactさせるために注入したコンテナ
dom inとその最初の子は
リストからの関係があります
子であるリストへのホストルートと
その後、からの関係があります
である親に戻るリスト
今これらの子供たちとの関係を返す
リストの実際にいくつかあります
ボタンの興味深い関係
同じ子とリターンの関係
しかし、最初に気づくアイテムは
からその子供関係を持っていません
代わりにアイテムのリストがあります
ボタンからアイテムへの関係
それは兄弟関係なので、すべて
これらの兄弟のポイントするつもりです
彼らの次の兄弟はReactです
のこのレイヤーをトラバースします
ツリーなので、それらは関係です
各fiberが子供を追跡すること
リターンと兄弟が他にいます
fiberが追跡しているが、
例を挙げたいので
それらが実際にどのように機能するかを見ることができます
この例に戻ります
以前使ったことがあるけど作りたい
もう少し面白いこと
ユーザーの途中で
フォントを増やすボタンをクリックします
サイズとこれはする必要はありません
React中の何か




so it's just a regular
JavaScript update but it's going to
require some layout calculations from
the main thread so we'll see how this
changes how we build up the tree here's
the diagram that I've used before
because there's a lot going up I'm going
on in fiber reconciler I'm just going to
show the fiber tree building up the
fiber tree I'm not going to show the
elements or the dom nodes like i have in
the past before we start the update we
already have the current fiber tree this
was constructed during the initial
render and react also started something
called the work-in-progress tree and as
of the first fiber to that the reason
that we need to work in progress trees
is that we don't want to actually make
changes to the dom while we're computing
the changes in this tree and this is
different from the stack reconciler the
way that the stack reconciler works is
as is walking down the tree and changing
instances it's changing the
corresponding dom nodes so for example
when we make a change from 2 to 4 in the
instance it's going to make that change
in the dom node from 2 to 4 before it
actually computes on the instance below
it the third instance that that should
go from 3 to 9 this works if you're
doing everything all at the same time if
you're doing things synchronously but if
you need to interrupt this if you need
to take a break in between those two
then the browser will say ok well I need
to paint I need to do a layout and
change this from 2 to 4 but it won't
have the information to change the
things below that so your UI will end up
being inconsistent to avoid this problem
fiber introduces phases in phase 1 the
renderer reconciliation phase it just
builds up this fiber tree the
work-in-progress tree and figures out a
list of changes from that but it doesn't
actually make those changes it's not
until it gets to the commit phase that
will actually make those changes in the
Dom based on the reconcile phase that
can be interrupted
so we asked left the main thread go and
do other work at certain points during
the reconciliation phase but phase two
cannot be interrupted that commit has to
happen all at once or you would get so
DUI inconsistencies so our task in phase
one is going to be to build up this
work-in-progress tree and figure out the
changes in it let's start an update and
see how this is filled in so to start
the update we click the button this call
set state when sub state is called
reacts will add the update to an update
queue so a list of updates on the list
and then Rick goes to schedule 

だからそれはただの定期的なものです
JavaScriptは更新されますが、
からのレイアウト計算が必要です
メインスレッドです。
ここでツリーを構築する方法を変更します
以前使用した図
たくさん上がっているので
fiber調停機で私はただ行くつもりです
構築するファイバーツリーを表示します
ファイバーツリーは表示しません
要素または私が持っているようなdomノード
更新を開始する前の過去
これはすでに現在のファイバーツリーを持っています
最初の間に建設されました
レンダリングとReactも何かを始めました
進行中の作業ツリーと呼ばれ、
その理由への最初のfiberの
進行中のツリーで作業する必要があること
実際に作りたくない
計算中のdomへの変更
このツリーの変更とこれは
スタック調整とは異なり、
スタックリコンシリエターが機能する方法は
木の下を歩いて変化するように
それが変化しているインスタンス
たとえば、対応するdomノード
で2から4に変更すると
インスタンスは、その変更を行うつもりです
その前の2から4までのdomノード内
以下のインスタンスで実際に計算します
それはそれがすべき3番目のインスタンス
3から9に移動します。
すべてを同時に行う場合
あなたは物事を同期してやっていますが、もし
必要に応じてこれを中断する必要があります
それらの間に休憩を取るために
それからブラウザは大丈夫だと言うでしょう
ペイントするには、レイアウトを行う必要があります。
これを2から4に変更しますが、変更しません
変更する情報があります
その下のものは、UIが最終的に
この問題を回避するために一貫性がない
ファイバーはフェーズ1にフェーズを導入し、
レンダラー調整フェーズ
このファイバーツリーを構築します
進行中のツリーと計算
それからの変更点のリストですが、そうではありません
実際にはそうではない変更を加えます
それがコミットフェーズに到達するまで
実際にそれらの変更を行います
調整フェーズに基づくDOM
中断することができます
それで、メインスレッドを去って、
中の特定の時点で他の作業を行う
調整フェーズですが、フェーズ2
コミットを中断することはできません
一度に起こるか、そうなるでしょう
DUIに不整合があるため、フェーズ内のタスク
これを構築することになります
進行中のツリーと
変更を加えて、更新を始めましょう。
開始するには、これがどのように入力されているかを確認してください
この呼び出しボタンをクリックして更新
サブ状態が呼び出されたときに状態を設定する
Reactは更新を更新に追加します
キューに入れるため、リスト上の更新のリスト
そしてリックはスケジュールに行きます

the work
that's going to have have to happen to
make this a reality
when that state was called the athlet
reacts know that it doesn't need to have
this happen it doesn't need to do this
work immediately react can schedule this
is deferred work so it can schedule its
happen later and to do this it uses a
function called request idle callback
this is basically like react saying to
the main thread let me know when you
have some spare time and we'll do this
work for browsers that don't support
requests I'll call back react will
polyfill it and so when the main thread
has some free time once it's done with
its work it comes back to react and it
knows how much time it has to spare so
this could be a few milliseconds or it
could be up to 50 milliseconds if there
are no frame scheduled in the near
future so react the main thread has come
back and we're going to start building
up this work-in-progress tree and we'll
fill it in with a function called work
loop the warp loop is what gives fiber
disappearance in the in the timeline it
allows reacts to go down do a little bit
of computation and then come back up to
let the main thread get to whatever
other work it needs to do and in order
to do this and need to keep track of two
things it needs to keep track of the
next unit of work that it needs to work
on and also needs to keep track of the
time remaining it has with the main
thread so the rack rack and the main
thread get started and they're going to
start in the first pass through the
worklet they're going to start with the
host root and they're just going to copy
values over from the current version to
the work-in-progress treaty
and this included a pointer to the child
of the host root which is a list since
there are no updates it's just going to
clone the list into the work-in-progress
tree and since the list had an update to
it clones that update q2 so the list
fiber is going to be returned as the
next unit of work and react comes back
up to check whether or not its deadline
has expired but cuz we still have some
time

作品
それは起こらなければならないだろう
これを実現する
その状態がアスリートと呼ばれたとき
持っている必要がないことを知ってReactします
これが起こる必要はありません
すぐにReactする仕事はこれをスケジュールすることができます
スケジュールできるように据え置き作業です
後で発生し、これを行うには、
リクエストアイドルコールバックと呼ばれる関数
これは基本的にReactするようなものです
メインスレッドはあなたがいつ私に知らせた
少し時間があって、これをやります
サポートしていないブラウザで動作する
コールバックするリクエストはreact will
それをポリフィルして、メインスレッドが
それが終わったら、自由時間があります
それがReactして戻ってきたその仕事
どれだけの時間を割けるか知っている
これは数ミリ秒またはそれである可能性があります
ある場合、最大50ミリ秒になる可能性があります
近くで予定されているフレームはありません
未来なので、メインスレッドが来ました
戻って、構築を開始します
この作業中のツリーを上に移動すると、
仕事と呼ばれる関数でそれを埋めます
ループワープループはファイバーを与えるものです
タイムラインでの消失
リアクションが少し下がることを許可します
計算してから、
メインスレッドが何にでも到達できるようにします
それが行う必要がある他の作業
これを行うには、2つを追跡する必要があります
追跡する必要があるもの
動作する必要がある次の作業単位
オンとまた追跡する必要があります
メインの残り時間
ラックラックとメイン
スレッドが開始され、彼らは
の最初のパスから開始します
彼らが始めるワークレット
ホストルートと彼らはコピーするだけです
現在のバージョンからまでの値
進行中の条約
そしてこれは子供へのポインタを含んでいました
以降のリストであるホストルートの
更新はありません。
リストを進行中の作業に複製する
ツリーとリストが更新されたので
q2を更新するクローンを作成するので、リストは
fiberはとして返されます
次の作業単位とReactが戻ってきます
締め切りかどうか確認するまで
期限切れですが、まだいくつかあります
時間

reiax will go back down and start
processing the list the list does have
an update you it has an update that
react needs to take care of so starts
processing that update it calls the
updater function which was caught were
just passing the set state and you may
never have seen enough data function
before even though they've been
supported and react for multiple years
people still often use an object and
pass an object into that state but with
fiber you really want to use updater
functions and they might even remove
this at some point so calling the OP
cedar function gives us the new state
and the update queue is finished
processing so this fibers unmarked it
has a tag attached to it because it
needs to have a change made in the Dom
tree to move any further down we're
going to need to in this tree so keep
processing this tree we need to know
about the list children so reacts going
to set the props and the state on the
list instance and call render and then
we get this array of elements back react
goes through the array of elements and
sees whether or not these the fibers
from the current tree are the same
whether or not they can be reused and
since they can in our case it just
clones those then returns the first
child in this list that's the button as
the next unit of work react comes back
up to check the deadlines and I think
that you're starting to see the pattern
that's emerging here so I'm going to
make things a little bit more
interesting the user is going to click
that button to make that font size
change this adds something a callback to
the cue that the main thread is going to
need to take care of
but it's not so I take care of it
immediately because react still has time
on its clock it's going to stick around
with react and start processing the next
item the next unit of work which is the
button this button doesn't have any
children this is the first time we've
had something in this tree that we've
reached that doesn't have any children

reiaxは戻って開始します
リストにあるリストの処理
アップデートあなたはそれがアップデートを持っています
Reactする必要があるので、開始する
それを呼び出す更新処理
キャッチしたアップデータ機能は
設定状態を渡すだけで、
十分なデータ機能を見たことがない
彼らはされていた前に
複数年にわたってサポートされ、Reactする
人々はまだオブジェクトを頻繁に使用し、
オブジェクトをその状態に渡しますが、
あなたが本当にアップデーターを使いたいファイバー
関数とそれらは削除する可能性があります
これはある時点でOPを呼び出す
杉機能は私たちに新しい状態を与えます
更新キューが終了しました
このfiberはそれをマークしないように処理します
タグが付いているので
ドムに変更を加える必要がある
ツリーをさらに下に移動します
このツリーに入れる必要があるので、キープしてください
知っておく必要があるこのツリーの処理
リストの子供たちがReactするので
小道具と状態を設定するには
インスタンスをリストしてrenderを呼び出し、次に
この要素の配列を元に戻します
要素の配列を通過し、
これらのfiberかどうかを確認します
現在のツリーからは同じです
それらが再利用できるかどうか
彼らは私たちの場合それだけでできるので
それらを複製し、最初の
ボタンであるこのリストの子
次の作業単位のReactが戻ってきます
締め切りまでチェックしてね
あなたがパターンを見始めていること
それはここに現れているので、私は
もう少し作ります
ユーザーがクリックするのが面白い
そのボタンをそのフォントサイズにする
これを変更すると、コールバックが追加されます
メインスレッドが行く手がかり
世話をする必要があります
しかしそれは私がそれを大事にするのでそうではありません
Reactはまだ時間があるのですぐ
その時計にこだわるだろう
Reactして次の処理を開始
アイテムである次の作業単位
このボタンには何もありません
子供たちはこれが私たちが初めてです
この木の中に私たちが持っている何かがありました
子供がいない

so it's not creating any new work so
react can complete this unit of work and
that means comparing the old and the new
to see whether or not there have been
changes if there were changes that would
mark it as needing changes in the column
but since there aren't it doesn't and
then so if there's no children it
returns to sibling if the next unit of
work now remember this is the item that
has the number one in it so react goes
back up to check the deadlines then goes
back down and this will follow the same
pattern as the list but let's say that
there was a should component update on
the item that says if the number prop
that's passed in is the same I know that
my div isn't going to need to change so
I might as well just return false from
component update this means that
the item will not have a tag attached to
it that says it needs to have a change
in the Dom the precise details of how it
works once your component update returns
false are still a little length walk so
I'm not going to go into the details I'm
just going to skip ahead to where the
item is completed and it returns its
sibling as the next unit of work we go
back up we come back down it's
processing less the same way except this
time should component update does return
true so it gets marked as having a
change I get that tag attached to it and
it's div is cloned and returned to the
next unit of work
we still have a little bit more time on
the clock so we're going to process this
div the div doesn't have any children so
we can complete it we compare the old in
the new and we see that two is changing
to four so we do actually need to make a
change
so we attach on those tags and it also
gets added to a list on a parent item a
list of changes and the reason that it
got added this is the first time we're
adding one of these things to a list
item that keeps track of all of the
fibers underneath it that have changes
now there's next no next unit of work
that it can return there's no child and
there's no siblings so it just called
complete on its parent and notices
parent doesn't have any more work to
process so I mentioned that this was the
first time that we added the div or that
we added anything to a list of changes
and the dip was added to the list of
changes on the item because it had that
tag that needs change and also been
completed and now we've completed item
and that also has a tag so it's going to
move itself up to it's going to start
creating this list of changes on its
parent and the way that it does it as
part of that it merges its own list of
changes into the parents effect list
that's what these lists of changes are
called

だから新しい作品は作らない
reactはこの作業単位を完了でき、
それは古いものと新しいものを比較することを意味します
あったかどうかを確認する
変更があった場合の変更
列に変更が必要であることを示す
しかし、それがないので、
子供がいない場合は
次の単位の場合、兄弟に戻ります
仕事は、これがそのアイテムであることを覚えています
その中でナンバーワンを持っているので、Reactが行く
期限を確認するためにバックアップしてから、
戻ってこれは同じに従います
リストとしてのパターンですが、
必要なコンポーネントの更新がありました
数が小道具である場合に言う項目
渡されたものは私が知っているのと同じです
私のdivは変更する必要がないので
私はちょうどから偽を返すかもしれません
これはコンポーネントの更新を意味します
アイテムにはタグが付けられません
変更する必要があると言っている
ドムでどのようにそれの正確な詳細
コンポーネントの更新が戻ると機能します
falseはまだ少し長めの散歩なので
詳細については説明しません
先にスキップするだけです
アイテムが完成し、それを返します
次の作業単位としての兄弟
私たちが戻ってきます
これ以外は同じように処理しない
コンポーネントの更新が戻るまでの時間
trueであるため、
変更タグを付けてもらいます
divが複製され、
次の作業単位
まだ少し時間があります
時計なので、これを処理します
div divには子がないので
私たちはそれを完了することができます
新しいと私たちは2つが変化していることがわかります
4つにしたので、実際に
変化する
これらのタグを付けます。
親アイテムのリストに追加されます
変更のリストとその理由
追加されたのは初めてです
これらのいずれかをリストに追加する
すべてを追跡するアイテム
その下に変化のあfiberる
今、次の作業単位はありません
それが返すことができることは子供がいないと
兄弟がないので、
その親と通知で完了
親はもう仕事をしていません
プロセスなので、これは
初めてdivを追加したとき
変更のリストに何かを追加しました
とディップがのリストに追加されました
それがあったので、アイテムの変更
変更が必要なタグ
完成し、アイテムを完成させました
タグも付いているので
開始するまで自分自身を移動します
変更のこのリストを作成する
親とそれがする方法
その一部は、独自のリストをマージします
親効果リストへの変更
それがこれらの変更のリストです
呼ばれる


so it takes the div and put that as the
first thing in the effect list for its
parent and then it puts itself on the
end of that effect list now that it's
complete it returns the sibling of the
next unit of work and we go back up to
check the deadlines but it looks like
we've run out of time so react needs to
let the manger I get back to its other
duties reaction still wants to finish
this job though so it uses requests idle
callback to basically fade in the main
thread when you're done with what you're
doing come back here and we'll finish up
the main site goes back to his desk
takes care of the callback that's
waiting for it and this may include
doing layout as it does in our case but
notice that nothing in the content of
our react app is changed even though
react note says going to need to change
two to four sometime in the future it
doesn't do that now
when the main thread is done with the
work it comes back to react and they
start where they left off the last two
units of work are finished in the same
way they get their tags and they're
added to the effect list and now that
completes all of the work the units of
work below lift so now complete can be
called on list and this means that list
moves everything up into its parents
effect list and also adds itself to the
end finally when the list is completed
it can complete its parent the host
route so now react sets the
work-in-progress tree as a pending
commit this is the end of the first
phase we've updated the work-in-progress
tree and we figured out a list of
changes in that tree now it's time for
Phase two
actually committing this work to the Dom
react will check its deadlines and if I
have time it would do the commit now and
if it definitely use request idle call
back again and as soon as the main
thread gets back to it the first thing
it would do is commit this pending
commit so we're starting phase two
reiax will go through the effect list
and make the changes to the Dom starting
with the first fiber which is the div so
changes to two four and then 

したがって、divを受け取り、それを
その効果リストの最初のもの
親し、それから自分自身を
エフェクトリストの終わりです。
の兄弟を返します
次の作業単位に戻り、
締め切りを確認してください
時間切れになったので、対応する必要があります
飼い葉桶に私を他の場所に戻しましょう
職務Reactはまだ終わらせたい
このジョブはアイドル状態のリクエストを使用します
基本的にメインでフェードインするコールバック
あなたがしていることを終えたときにスレッド
ここに戻ってきて、終わります
メインサイトは彼の机に戻ります
のコールバックを処理します
それを待っていると、これには
私たちの場合と同じようにレイアウトを行いますが
内容に何もないことに注意してください
私たちのReactアプリは変更されています
Reactノートは変更する必要があると言います
将来的には2から4
今はそれをしていません
メインスレッドが
Reactして戻ってくる仕事
彼らが最後の2つをやめたところから始める
作業単位は同じで終了します
タグを取得する方法と
エフェクトリストに追加されました
ユニットのすべての作業を完了します
リフトの下で作業できるようになりました。
リストで呼び出され、これはそのリストを意味します
すべてを親に移動します
エフェクトリストとそれ自身を
リストが完成したら最後に終了
それはその親ホストを完了することができます
ルートは今Reactセットを設定します
保留中の作業中のツリー
コミットこれは最初の終わりです
進行中の作業を更新したフェーズ
ツリーと私たちはのリストを考え出した
そのツリーの変更が今です
フェーズ2
この作業を実際にDomにコミットする
Reactは、その期限をチェックし、私が
今すぐコミットする時間がある
それが間違いなくリクエストアイドルコールを使用する場合
再び、メインとすぐ
スレッドが最初にそれに戻る
これは保留中のコミットです
コミットするので、フェーズ2を開始します
レイアックスはエフェクトリストを通過します
Domを変更し始めます
divである最初のファイバーで
2つ4つに変更し、

we move on
to the list which is this gives parent
now for our case they're actually aren't
any changes here because we aren't using
refs but if we had a ref on here that
ref will be detached now and then it
would be reattached later the react
keeps updating the Dom and going through
this effect list now all the changes
were calculated in phase one and they've
been committed to the Dom tree this
means that the work-in-progress tree is
actually a more up-to-date version of
state of the app than the current tree
so react needs to fix that what it does
is it switches the pointers so that the
current pointer now points to the
work-in-progress tree that we just built
and there's a nice benefit of this it
means that reacts can reuse the old
objects it can reuse the things in the
work in progress tree and just copy over
key values the next time it has to build
up a work-in-progress tree this is
called double buffering and
saves time on memory allocation and
garbage collection so now we're done
with this commit react goes through each
of the effects on the effect list one
more time and does a little bit more
work so it will do there's less rest of
the lifecycle hooks it will update any
refs it will also handle those error
boundaries that Tom was talking about
earlier so this is a new thing to react
it makes it possible for you to actually
handle the errors and a particular part
of the app and this is good because it
makes it easier for react to show you
helpful error messages but it also means
that components will have a chance to
handle errors themselves using a handle
errors method so once lifecycle rests
and errors have been taken care of for
each of these effects we finish the
commit so this walkthrough has shown you
how breaking up work into these units of
work may react more responsive to
browser events and this is a nice
feature but in and of itself it doesn't
actually fix the problem that we were
talking about earlier where react
commits got caught they got trapped
behind other larger react commits or
lower priority react minute updates and
in order to solve that we need to add a
little something more which is priority
so in the fiber reconciler each update
will need to have a priority assigned
these are currently the priorities
synchronous works pretty much like a
stack reconciler does today tasks work
needs to be handled before the next tick
of the event loop animation uses
requestanimationframe to schedule it
will happen so that you see it in the
next frame high priority low priority
and off-screen priority those are all
scheduled like I was talking about using
request idle callback high priority work
should happen pretty quickly in order to
seem responsive low priority work isn't
as sensitive to these minor delays so if
you're doing something like data
fetching you're not going to notice if
there's an extra 100 or 200 milliseconds
and they're so low priority where it can
be done used for that and then all
screen is for anything that's hidden or
that is off screen currently it'd be
nice to have it render

私たちは次に進みます
これが親になるリストに
今私たちのケースでは、実際にはそうではありません
ここでは変更を使用していません
refsですが、ここでrefがあった場合、
refは時々切り離されます
後でReactして再接続されます
ドムを更新し続けます
このエフェクトはすべての変更をリストします
フェーズ1で計算され、
ドムの木に託された
進行中の作業ツリーが
実際の最新バージョン
現在のツリーよりもアプリの状態
だからReactはそれが何をするかを修正する必要があります
それはポインタを切り替えるので、
現在のポインタは
先ほど作成した作業中のツリー
これには素晴らしいメリットがあります
Reactは古いものを再利用できることを意味します
オブジェクトを再利用できます
進行中のツリーで作業し、単にコピーする
次に構築する必要のあるキー値
進行中の作業ツリーを上へ
ダブルバッファリングと呼ばれ、
メモリ割り当ての時間を節約し、
ガベージコレクションなので、これで完了です
このコミットでは、Reactはそれぞれを通過します
効果リスト1の効果の
より多くの時間ともう少し
残りが少なくなるように機能する
更新するライフサイクルフック
refsそれはそれらのエラーも処理します
トムが話していた境界
以前にこれはReactする新しいものです
それはあなたが実際にすることを可能にします
エラーと特定の部分を処理する
アプリのこれは良いので
Reactがあなたを示すのを容易にします
役立つエラーメッセージですが、
そのコンポーネントは、
ハンドルを使用してエラー自体を処理する
エラーメソッドなので、ライフサイクルが停止すると
エラーが処理されました
これらの各効果は、
コミットするので、このウォークスルーはあなたを示しています
作業をこれらの単位に分割する方法
仕事はより敏感にReactするかもしれません
ブラウザイベントとこれはいいです
機能は、それ自体ではありません
実際に問題を修正しました
先にReactする場所について話します
コミットがキャッチされ、トラップされました
他のより大きなReactコミットの背後にある、または
優先度が低いと、分ごとの更新にReactし、
これを解決するには、
優先されるもう少し
ファイバーリコンサイラーで各更新
優先度を割り当てる必要があります
これらは現在優先事項です
同期は、
スタックリコンシリエターは今日の仕事をします
次のティックの前に処理する必要があります
イベントループアニメーションの使用
それをスケジュールするためにrequestanimationframe
あなたがそれを見るように起こります
次のフレーム高優先度低優先度
画面外の優先順位がすべてです
使用について話していたようにスケジュール
アイドルコールバックの優先度の高い作業をリクエストする
するためにかなり迅速に発生するはずです
応答性の低い優先度の作業はそうではありません
これらの小さな遅延に敏感なので
あなたはデータのようなものをやっています
フェッチしても気付かない場合は
追加の100または200ミリ秒があります
優先度が低いので
そのために使用され、その後すべて
画面は、非表示になっているものや
それは現在オフスクリーンです
レンダリングしてよかった

in case two get shown but you'll need to
have it right now with these priorities
what we want to have happen is for
higher priority work to jump in front of
low priority work even if the lower
priority work has already been started
again I think it's looking at this in
context will help you understand how
these priorities work so let's say in
the last example instead of having that
font resize increase we have an urgent
react update button the user clicks a
button and this is a call back in the
main threads queue but the manger is not
going to take care of it until the
deadline is reached and what it is then
it takes care of that callback which
call set state then react is going to
add this to the list of updates but
because of the high priority update it
buffs in the queue it jumps ahead of the
low priority update that we are already
working on and this means that when
react starts work again it doesn't start
on the next unit of work that was going
to that was planning to instead it
restarts with the hosts route and it
basically throws away all of this work
that it's done and then react will go
through the higher priority update and
commit and then it will start back over
again at the beginning of that lower
priority update now I don't have time to
get into the details of this but I do
want to answer two questions that might
have popped in your head one is about
lifecycle hooks so some of them fire
during the reconciliation phase and
others fire during the render for the
commit phase that means that life cycle
methods might not fire in the same order
that you expect so in the example we
just walked through with different
priority updates here's how component
will update and component did update
would work first a low priority update
would fire component will update and
then the high priority update would
button and fire component will update
and component it update and then the low
priority work would get restarted and
fired these two again in some apps
there's an expectation of symmetry
between these two that they'll be called
as a pair in the same order but as you
can see that's not always true with
fiber so to make sure that this doesn't
break apps the fiber team is working on
a graceful upgrade path for this another
thing you might have wondered is what if
a whole bunch of high priority updates
jump in line they jump into queue then
your lower priority update
never happen when this happens is called
starvation one way that react tried to
fix this is by reusing work where it can
so if it had a low priority work that
was done and the high priority work
didn't touch that part of the tree then
they can reuse that work and the team is
actively working on other solutions to
help mitigate mitigate the starvation
problem so this is how the fiber
architecture will make react apps better
in the near term it makes updates play
together better by allowing these more
high priority updates to jump in line to
jump ahead of the lower priority updates
so that it makes the UI more fluid and
responsible and it does this by breaking
up the work into smaller units of work
these can be paused so that the main sir


2つが表示された場合に必要です
これらの優先順位で今それを持っています
私たちが起こしたいのは
前にジャンプする優先度の高い作業
低い優先度の作業でも
優先作業はすでに開始されています
もう一度私はこれを見ていると思います
コンテキストは、あなたがどのように理解するのに役立ちます
これらの優先順位は機能するので、
それを持つ代わりに最後の例
フォントサイズの拡大は緊急です
ユーザーがクリックした更新ボタンにReactする
ボタンとこれはでのコールバックです
メインスレッドはキューに入れられますが、マネージャーはそうではありません
までそれを世話します
期限に達し、それがどうなるか
それはそのコールバックを処理します
呼び出しセットの状態は、Reactします
これを更新のリストに追加しますが、
優先度が高いため、更新してください
キューのバフはそれが先にジャンプします
すでに優先度の低い更新
作業していると、これは
Reactは再び動作を開始しますそれは開始しません
次の作業単位で
その代わりにそれを計画していた
ホストルートとそれで再起動します
基本的にこの作業のすべてを捨てます
それが完了し、その後Reactが行くこと
優先度の高いアップデートと
コミットすると、最初からやり直します
再びその低いの初めに
優先アップデート今私には時間がない
これの詳細に入りますが、私はします
かもしれない2つの質問に答えたい
あなたの頭の中に飛び込んできました
ライフサイクルフックの一部は起動します
調整フェーズの間
その他のレンダリング中に発砲
そのライフサイクルを意味するコミットフェーズ
メソッドが同じ順序で起動しない場合がある
あなたが私たちの例でそう期待すること
ただ違うと歩いた
優先度の更新はここにどのようにコンポーネントです
更新され、コンポーネントは更新されました
優先度の低い更新が最初に機能します
コンポーネントが起動し、更新されます
優先度の高い更新は
ボタンと発射コンポーネントが更新されます
そしてそれが更新するコンポーネント、そして低
優先作業が再開され、
一部のアプリでこれら2つを再度解雇しました
対称性の期待があります
これらの2つの間で呼ばれます
同じ順序でペアとして、しかしあなたとして
常にそうであるとは限らないことがわかります
fiberなので、これがないことを確認してください
ファイバーチームが取り組んでいるアプリを中断する
この別の優雅なアップグレードパス
あなたが疑問に思ったかもしれないことは
優先度の高い更新の束
彼らは列に飛び込み、次にキューに飛び込む
優先度の低い更新
これが起こっても決して起こらないと呼ばれています
飢餓Reactする方法の1つ
これを修正するには、可能な場合は作業を再利用します
優先度の低い作業があった場合
行われ、優先度の高い作業
ツリーのその部分には触れなかった
彼らはその仕事を再利用でき、チームは
他のソリューションに積極的に取り組んで
飢餓の緩和を助ける
問題は、これがどのようfiberに
アーキテクチャはアプリのReactを良くします
近い将来、アップデートが再生されます
これらをもっと許可することで
優先順位の高い更新プログラム
優先度の低いアップデートより先にジャンプ
UIをより滑らかにし、
責任があり、それは破壊することによってこれを行います
作業をより小さな作業単位に
これらは一時停止することができるので、メインのサー


I can get to other tasks that it needs
to do and by the way there's a name for
this it's called cooperative scheduling
and you'll see it in other kinds of
software for example you'll see in
operating systems to help applications
play together better and at Mozilla
we're actually currently bringing this
into the browser and to the actual Dom
as a way of making Firefox more
responsive with a project called project
quantum the only operative scheduling
does for react today it also opens up
new possibilities in react future so
example one of the trouble spots that
Sebastien talked about this morning is
startup how long it takes to initially
render the app and you may have seen a
blog post yesterday from James Kyle
about this as well the problem in many
react apps is that to render a single
tree react has to fetch all of the
components in a single file and then
load them and then start building up the
instance or the fiber tree but it could
be different
reiax can start building up the tree of
components tree mint so that's that
streaming rendering and fiber will make
it easier to do this and also to do it
in a smarter way
a Sebastian was talking about another
thing that fiber could make easier is
handling work in parallel so if you add
more workers than just the main thread
the work can be faster but parallelizing
things isn't always a silver bullet
there are efficient ways to parallel
eyes things and inefficient ways to do
it
fiber will make it easier to do it in an
efficient way
by splitting up branches of the tree in
doing branches of the tree in parallel
and this is another thing that we've
experimented with successfully at
Mozilla our new CSS style engine which
was developed as part of servo and now
it's being introduced to Firefox
it handles the tree the same way it
handles paralyzed paralyzed sibling
branches and our testing a page that
only takes 30 30 milliseconds once it's
parallel lies like this so you can
imagine what kind of performance winds
this might bring for react unfortunately
don't have enough time to talk about all
of these future possibilities all of the
things that fiber could bring long-term
and I wished I did I think that fiber
sets react up for a few years of really
interesting experimentation and
performance wins and I'm really looking
forward to seeing how that turns out so
I want to say thank you to the react
core team for explaining fiber to me so
that I could explain it to all of you
and thank you all for listening

必要な他のタスクに到達できる
するために、ちなみに名前があります
これは協調スケジューリングと呼ばれます
あなたは他の種類のそれを見るでしょう
たとえばあなたが見るソフトウェア
アプリケーションを支援するオペレーティングシステム
Mozillaで一緒にプレイする
私たちは実際にこれを持っています
ブラウザと実際のDomに
Firefoxをもっと作る方法として
プロジェクトと呼ばれるプロジェクトにReactする
唯一の有効なスケジューリング
今日Reactするためにもそれは開きます
将来のReactにおける新しい可能性
その問題点の例
今朝のセバスチャンの話は
起動にかかる時間
アプリをレンダリングすると、
ジェームズカイルの昨日のブログ投稿
これについても多くの問題
アプリのReactは、単一をレンダリングすることです
ツリーReactはすべてをフェッチする必要があります
単一のファイル内のコンポーネント
それらをロードしてから、構築を開始します
インスタンスまたはファイバーツリーですが、
異なる
reiaxは、ツリーの構築を開始できます
コンポーネントツリーミントです。
ストリーミングレンダリングとファイバーは
これを行うのも、それを行うのも簡単です
よりスマートな方法で
セバスチャンは別の話をしていた
fiberが簡単にできることは
作業を並行して処理するので、
メインスレッドよりも多くのワーカー
作業は速くなりますが、並列化できます
物事が必ずしも特効薬とは限らない
並列する効率的な方法があります
物事と非効率的な方法に目を向ける
それ
fiberはそれを行うのをより簡単にします
効率的な方法
木の枝を分割することによって
木の枝を並行して行う
そしてこれは私たちが持っているもう一つのことです
で成功した実験
Mozillaの新しいCSSスタイルエンジン
サーボの一部として開発され、現在
Firefoxに導入されています
同じようにツリーを処理します
麻痺した麻痺した兄弟を扱います
ブランチと私たちのテストページ
30ミリ秒しかかかりません
パラレルはこのようにありますので、
どんな風が吹くか想像してみて
これは残念なことにReactをもたらすかもしれません
すべてについて話す時間がない
これらの将来の可能性のすべての
fiberが長期的にもたらすことができるもの
と私は私がしたいと思いましたそfiberの
セットは本当に数年Reactします
興味深い実験と
パフォーマンスが勝利し、私は本当に探しています
それがどうなるかを見るのを楽しみにしています
Reactありがとうございます
ファイバーを説明するコアチーム
皆さんに説明できると思います
聞いてくれてありがとう