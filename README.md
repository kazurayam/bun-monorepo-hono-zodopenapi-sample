# package.jsonファイルのmainフィールドの値が原因でTS2307 "Cannot find module" エラーが発生した件

## 短い説明

Qiita記事 [Hono + Zod-OpenAPIで快適に開発する, @mtfuji_ksk](https://qiita.com/mtfuji_ksk/items/5da28a1f4fabfa994246) のサンプルコードを写経した。Node.jsではなくbunを使った。workspaceを活用して自作のパッケージ三つをひとつのGitレポジトリに格納した。いわゆるモノレポにした。ところがTypeScriptコードに `Cannot find module '@kazurayam/hono-zodopenapi-sample-shared' or its corresponding type declarations. ts(2307)` というエラーが発生した。TS2307エラーのことをGoogleやAIで調べるとたくさんヒットした。しかし容易に解決しなかった。四週間もかかってようやく原因を突き止めることができた。importされる側のパッケージの `package.json` ファイルに `main` フィールドが書いてあって、mainの値がが不適当だった。このミスが当該パッケージをimportする側のTypeScriptコードに間接的に影響を及ぼしTS2307エラーが発生した。`main` フィールドの値を修正するすることでTS2307エラーを解消することができた。

## 長い説明

詳しくは

- https://kazurayam.github.io/TS2307error-caused-by-the-main-field-in-package.config-in-monorepo/

を参照願います。

### "bun init" が生成した `index.ts` を削除した

