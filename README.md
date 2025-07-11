# 🎨カラーメモ

お気に入りの色を登録・管理できるシンプルなデスクトップアプリケーションです。

## 🔧主な機能

- **色の登録**: 色の名前、HEXカラーコード、簡単な説明を登録できます。
- **一覧表示**: 登録した色をカード形式で分かりやすく表示します。
- **カラーコードのコピー**: カラーコードをクリックするだけでクリップボードにコピーできます。
- **色の削除**: 不要になった色を簡単に削除できます。
- **データ保持**: 登録した色は `colors.json` ファイルに保存され、次回起動時にも保持されます。

## 💻使い方
1. [Releases](https://github.com/gori-GORILLA-gori/ColorMemo/releases)から最新バージョンの`ColorMemo.zip`をダウンロード
2. ダウンロードしたZIPファイルを展開
3. `ColorMemo` フォルダ内の `ColorMemo.exe` を実行
4. 色の名前やそのカラーコード、説明などを書き追加
5. 登録された色のカラーコード部分をクリックするとコピー
6. 色の右上の×を押すとポップアップが表示されOKを押すとその色を削除

## 📂ファイル構成
```
ColorMemo
┣━Code
┃ ┣━ColorMemo.py #アプリ本体のコード
┃ ┣━colors.json #色を保存しているjson
┃ ┣━index.html #UIを構成するHTML
┃ ┣━script.js #メイン処理、Pythonとの連携など
┃ ┗━style.css #UIを構成しているCSS
┣━ColorMemo.zip #exeなどがまとめられているZip
┣━LICENSE
┗━README.md
```
## 📷サンプル画像
![画像](https://drive.google.com/uc?export=view&id=1uGxdpnmXoOhNBaLh1Stfwj0mjyo0DwsN)
