# package.jsonファイルのmainフィールドの値が原因でTS2307エラーが発生するという話

## 短い説明

Qiita記事 [Hono + Zod-OpenAPIで快適に開発する, @mtfuji_ksk](https://qiita.com/mtfuji_ksk/items/5da28a1f4fabfa994246) のサンプルコードを写経しようとした。２つ以上の自作のパッケージを一つのGitレポジトリに格納する構成、いわゆるモノレポにした。bunでworkspaceを活用した。ところが `Cannot find module '@kazurayam/hono-zodopenapi-sample-shared' or its corresponding type declarations. ts(2307)` というエラーが発生した。TS2307エラーは頻出問題だ。Google検索やAIに解消法を尋ねるとたくさんヒットするが、わたしのケースに当てはまる情報が得られなかった。四週間も試行錯誤してようやく原因を突き止めることができた。importされる側のパッケージの `package.json` ファイルに `main` フィールドが書いてあって、指定された値が間違っていたから。この状況でパッケージをimportする側のTypeScriptコードでTS2307が発生する。

こういうケースを詳しく述べた記事は見当たらなかったので、ここで述べて公開します。


## 長い説明

詳しくは

- https://kazurayam.github.io/TS2307error-caused-by-the-main-field-in-package.config-in-monorepo/

を参照願います。
