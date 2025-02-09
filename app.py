from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/analyze_dream', methods=['POST'])
def analyze_dream():
    data = request.json
    dream = data.get('dream', '')
    
    try:
        response = requests.post(
            url=os.getenv('API_BASE_URL') + '/chat/completions',
            headers={
                "Authorization": f"Bearer {os.getenv('API_KEY')}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": "你是一位专业的解梦大师，请根据用户的输入语言使用你的回复语言..."},
                    {"role": "user", "content": dream}
                ]
            },
            timeout=30  # 添加超时设置
        )
        
        # 添加调试日志
        app.logger.debug(f"API响应状态码: {response.status_code}")
        app.logger.debug(f"API响应内容: {response.text}")
        
        if response.status_code == 200:
            return jsonify({'analysis': response.json()['choices'][0]['message']['content']})
        else:
            return jsonify({
                'error': f'API服务异常（状态码：{response.status_code}）',
                'detail': response.text[:200]  # 返回部分错误详情
            }), 500
            
    except Exception as e:
        app.logger.error(f"API调用失败: {str(e)}")
        return jsonify({
            'error': '服务连接失败',
            'detail': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
