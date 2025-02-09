async function analyzeDream() {
    const dream = document.getElementById('dreamInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (dream.length < 1) {
        resultDiv.innerHTML = '<div class="error">⚠️ 请至少输入1字以上的梦境描述</div>';
        return;
    }
    
    resultDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            🔮 正在深度解析您的梦境...
        </div>
    `;
    
    try {
        const response = await fetch('/api/analyze_dream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dream })
        });
        
        if (!response.ok) throw new Error('服务异常');
        
        const data = await response.json();
        resultDiv.innerHTML = `
            <div class="analysis">
                <h3>✨ 解析结果：</h3>
                <p>${data.analysis.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                ⚠️ 解析失败：${error.message || '请检查网络连接后重试'}
            </div>
        `;
    }
}
