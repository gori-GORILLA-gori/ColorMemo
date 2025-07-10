import webview
import json
import pyperclip
import os
import sys

# exe化した場合としない場合で、基準となるパスを変更する
if getattr(sys, 'frozen', False):
    # exe化した場合
    BASE_DIR = os.path.dirname(sys.executable)
else:
    # 通常のPythonスクリプトとして実行した場合
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Api:
    def getColors(self):
        """colors.jsonを読み込んで内容を返す"""
        file_path = os.path.join(BASE_DIR, 'colors.json')
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Error: {file_path} not found.")
            return []
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return []

    def copyToClipboard(self, text):
        """受け取ったテキストをクリップボードにコピーする"""
        pyperclip.copy(text)
        print(f"Copied to clipboard: {text}")

    def addColor(self, new_color):
        """新しい色のデータを受け取り、JSONファイルに追記する"""
        print(f"Received new color: {new_color}")
        file_path = os.path.join(BASE_DIR, 'colors.json')
        try:
            # まず既存のデータを読み込む
            with open(file_path, 'r', encoding='utf-8') as f:
                colors = json.load(f)
            
            # 新しい色をリストの先頭に追加
            colors.insert(0, new_color)

            # 新しいリストでファイルを上書き
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(colors, f, indent=4, ensure_ascii=False)
            
            return {"success": True, "message": "色を追加しました。"}
        except Exception as e:
            print(f"Error adding color: {e}")
            return {"success": False, "message": str(e)}

    def deleteColor(self, index):
        """指定されたインデックスの色を削除する"""
        print(f"Deleting color at index: {index}")
        file_path = os.path.join(BASE_DIR, 'colors.json')
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                colors = json.load(f)

            # インデックスの範囲チェック
            if 0 <= index < len(colors):
                colors.pop(index)
            else:
                raise IndexError("指定されたインデックスが範囲外です。")

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(colors, f, indent=4, ensure_ascii=False)

            return {"success": True, "message": "色を削除しました。"}
        except Exception as e:
            print(f"Error deleting color: {e}")
            return {"success": False, "message": str(e)}


if __name__ == '__main__':
    api = Api()
    window = webview.create_window(
        'カラーメモ',
        'index.html',
        js_api=api,
        width=1200, 
        height=800,
        resizable=True
    )
    # debug=True を追加すると、ウィンドウ内で右クリックから開発者ツールを開けるようになる
    webview.start()