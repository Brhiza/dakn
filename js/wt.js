document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing wt game');
    tarotGame.init('wt');
});

// 暴露给全局的函数
window.drawOneCard = () => tarotGame.handleWTDraw();
window.resetCards = () => tarotGame.reset();