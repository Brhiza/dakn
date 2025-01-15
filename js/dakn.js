document.addEventListener('DOMContentLoaded', () => {
    tarotGame.init('dakn');
});

// 暴露给全局的函数
window.resetCards = () => tarotGame.reset(); 