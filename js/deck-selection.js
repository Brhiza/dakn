document.addEventListener('DOMContentLoaded', function() {
    const spreadSelection = document.getElementById('spread-selection');
    const deckSelection = document.getElementById('deck-selection');
    let selectedUrl = '';

    // 监听牌阵按钮点击
    document.querySelectorAll('.spread-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            selectedUrl = this.getAttribute('href');
            
            // 添加淡出动画
            spreadSelection.classList.add('fade-out');
            
            // 等待淡出动画完成后再显示牌组选择
            setTimeout(() => {
                spreadSelection.style.display = 'none';
                deckSelection.style.display = 'block';
                
                // 使用 setTimeout 确保 display:block 生效后再添加透明度动画
                setTimeout(() => {
                    deckSelection.style.opacity = '1';
                }, 50);
                
                // 更新标题文字
                document.querySelector('.contentheading').textContent = '选择你的牌组';
            }, 800); // 与 CSS transition 时间匹配
        });
    });

    // 监听牌组按钮点击
    document.querySelectorAll('.deck-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const deck = this.getAttribute('data-deck');
            const separator = selectedUrl.includes('?') ? '&' : '?';
            window.location.href = `${selectedUrl}${separator}deck=${deck}`;
        });
    });
}); 