import os
import re

def inject_secrets():
    # 搜尋要替換的檔案 (通常是 dist 底下的所有 .js 和 .html)
    dist_dir = 'dist'
    if not os.path.exists(dist_dir):
        print(f"Error: {dist_dir} not found")
        return

    # 定義要替換的環境變數對映
    # 格式: { "佔位符": "實際環境變數名稱" }
    replacements = {
        # Gemini AI
        "__GEMINI_API_KEY__":              os.environ.get("GEMINI_API_KEY_REAL", ""),
        # Firebase 全部 7 個參數
        "__FIREBASE_API_KEY__":            os.environ.get("VITE_FIREBASE_API_KEY", ""),
        "__FIREBASE_AUTH_DOMAIN__":        os.environ.get("VITE_FIREBASE_AUTH_DOMAIN", ""),
        "__FIREBASE_PROJECT_ID__":         os.environ.get("VITE_FIREBASE_PROJECT_ID", ""),
        "__FIREBASE_STORAGE_BUCKET__":     os.environ.get("VITE_FIREBASE_STORAGE_BUCKET", ""),
        "__FIREBASE_MESSAGING_SENDER_ID__":os.environ.get("VITE_FIREBASE_MESSAGING_SENDER_ID", ""),
        "__FIREBASE_APP_ID__":             os.environ.get("VITE_FIREBASE_APP_ID", ""),
        "__FIREBASE_DATABASE_ID__":        os.environ.get("VITE_FIREBASE_DATABASE_ID", ""),
    }

    print("Checking for secret injection...")
    
    for root, dirs, files in os.walk(dist_dir):
        for name in files:
            if name.endswith(('.js', '.html')):
                filepath = os.path.join(root, name)
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                new_content = content
                for placeholder, secret_value in replacements.items():
                    if placeholder in content:
                        if not secret_value:
                            print(f"⚠️  WARNING: {placeholder} found but env var is empty! Check GitHub Secrets.")
                        else:
                            print(f"✅ Injecting into {filepath}: {placeholder}")
                        new_content = new_content.replace(placeholder, secret_value)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)

if __name__ == "__main__":
    inject_secrets()
