// 修改打字机显示的文本数组
const textArray = ["单牌占卜", "三牌占卜", "大阿卡纳", "塔罗解牌"];

document.addEventListener('DOMContentLoaded', function() {
    let typeJsText = document.querySelector(".animatedText");
    if (!typeJsText) return;

    let stringIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function typeJs() {
        if (stringIndex < textArray.length) {
            const currentString = textArray[stringIndex];

            if (isTyping) {
                if (charIndex < currentString.length) {
                    typeJsText.innerHTML += currentString.charAt(charIndex);
                    charIndex++;
                } else {
                    isTyping = false;
                }
            } else {
                if (charIndex > 0) {
                    typeJsText.innerHTML = currentString.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    isTyping = true;
                    stringIndex++;

                    if (stringIndex >= textArray.length) {
                        stringIndex = 0;
                    }

                    charIndex = 0;
                    typeJsText.innerHTML = "";
                }
            }
        }
    }

    setInterval(typeJs, 120);
}); 