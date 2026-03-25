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
        "__GEMINI_API_KEY__": os.environ.get("GEMINI_API_KEY_REAL", ""),
        "__FIREBASE_API_KEY__": os.environ.get("VITE_FIREBASE_API_KEY", ""),
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
                        print(f"Injecting into {filepath}: {placeholder}")
                        new_content = new_content.replace(placeholder, secret_value)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)

if __name__ == "__main__":
    inject_secrets()
