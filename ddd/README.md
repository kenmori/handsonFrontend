# 知っておきたいDDD

## モデリング
一意な識別子(エンティティの発見)

## エンティティと値オブジェクト

**エンティティ**

- 長期にわたって変更(ライフサイクル)を管理する必要があるもの
オブジェクトの同一性を識別する必要があるため、ドメインにて一意な識別子が必要となる (社員、記事、商品、ユーザー、テナント)。可変なもの

**値オブジェクト**

- 変更を管理する必要がないもの(色、誕生日、氏名、郵便番号、電話番号)
できる限り、エンティティではなく値オブジェクトを使ってモデリングすることが奨励されている。不変なもの

## エンティティ

 モデリングとエンティティ発見の流れ

1. ソフトウェア要件の理解

2. モデリングを検討しエンティティを抽出

3. エンティティを識別する属性と振る舞いを検討

4. 「一意な識別子」の設計

    - 一意な識別子の生成方法

    - 一意な識別子の生成タイミング

5. エンティティの振る舞い(メソッド)を検討

6. エンティティの作成方法(コンストラクタ/ファクトリ)を検討

7. エンティティのバリデーションを検討

## 1. ソフトウェア要件の理解

ドメインエキスパートとの仕様を確認
・変更という用語はライフサイクルを管理する必要があるため
エンティティ候補(主語の用語がエンティティとなることがある)

## 3. エンティティを識別する属性と振る舞いを検討

エンティティ

- テナント
  - 名前(文字列)
  ---
  - アクティベートする()
  - デアクティベートする()
  - アクティブ状態か()
  - ユーザー登録する()

- ユーザー
  - ユーザー名(文字列)
  - パスワード(文字列)
  ---
  -　パスワードを変更する()
  - 名前を変更する()
  - 個人情報を変更する()

    - エンティティ個人
    - 値オブジェクト 名前
    - 値オブジェクト 個人情報

ビジネス用語そのまま振る舞いとして追加する

- 意図の明確なインターフェイス
  - クラス名やメソッド名に効果と目的に関する名前をつけ、実装方法や手段を含めない
- エンティティでは同一性を識別する本質に絞り込むことが重要であるため
それ以外はオブジェクトとしてモデリングする。「ユーザー」から「個人」というエンティティに切り出し、個人情報という値オブジェクトを追加している



## 6. エンティティの作成方法(コンストラクタ/ファクトリ)を検討

- コンストラクタ
  - 識別子の生成に必要な情報や、問い合わせに必要な情報を引数として渡す
  - エンティティの作成方法が複雑な場合ファクトリを用意する


```java
//雰囲気

public class Employee extends Entitiy {
  // フィールド(属性)
  private string_name
  // アクセサメソッド
  private void setName(name)
  // コンストラクタ
  Employee(name){
    this.setName(name)// 値が適切かチェックして、フィールドに設定する、不適切なら例外が送信される
  }
  // オブジェクト全体のバリデーション
  public override void Validation(handler){
    validator = new EmployValidator(this, handler)
    validator.Validate()
  }

}

public class EmployeeValidator extends Validator {
  //　エンティティにチェックロジックを実装するのではなく、バリデーションようのクラスを用意する
}
```

- 事前条件'(precondition)
- 事後条件(postcondition)
- 不変条件(invariant)

## サービス

### ドメインサービス

- エンティティや値オブジェクトの責務ではないドメインモデルのロジック(複数のドメインオブジェクトを使って計算する処理やファサード)
- 例えば「予約」というエンティティが「特定の時間帯に予約ができる空きがあるか」など、そのエンティティが知ることができないもの

### アプリケーションサービス

- ドメイン層を使うアプリケーション層に含まれ、トランザクションやセキュリティのような調整役的な処理を行う

- とても薄く、ドメインモデル上のタスク調整に使うロジック

### WIP


### 参照

「実践ドメイン駆動設計」から学ぶDDDの実装入門 翔泳社


