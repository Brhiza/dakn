// 从URL参数获取牌组类型
const urlParams = new URLSearchParams(window.location.search);
const deck = urlParams.get('deck') || 'mx'; // 默认使用穆夏牌组
const cdnBaseUrl = `img/${deck}/`;

// 初始化 particles.js 配置
document.addEventListener('DOMContentLoaded', function() {
    // 确保 particles-js 容器存在
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // 初始化 particles.js，保持原有配置
    particlesJS('particles-js', {
        particles: {
            number: { value: 0 }, // 设置为0，因为我们使用自定义粒子
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.7,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 1,
                random: true,
                anim: { enable: false }
            },
            line_linked: {
                enable: true,
                distance: 15,
                color: "#ffffff",
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                bounce: true,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });

    // 等待短暂延时确保 canvas 已创建
    setTimeout(() => {
        let canvas = document.querySelector('#particles-js canvas');
        if (!canvas) return;

        let ctx = canvas.getContext('2d');
        let centerX = 0;
        let centerY = window.innerHeight;
        let particles = [];

        // 初始化粒子
        for(let i = 0; i < 1500; i++) {
            let minRadius = Math.min(window.innerWidth, window.innerHeight) * 0.2;
            let maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.2;
            
            let baseTrackCount = 24;
            let randomOffset = (Math.random() - 0.5) * 0.8;
            let trackIndex = Math.floor(Math.random() * baseTrackCount) + randomOffset;
            trackIndex = Math.max(0, Math.min(trackIndex, baseTrackCount - 1));
            
            let normalizedTrack = Math.pow(trackIndex / (baseTrackCount - 1), 0.8);
            normalizedTrack = normalizedTrack * (0.9 + Math.random() * 0.2);
            let radius = minRadius + (maxRadius - minRadius) * normalizedTrack;
            
            radius += (Math.random() - 0.5) * (maxRadius - minRadius) * 0.05;
            
            if (normalizedTrack < 0.2 && Math.random() > normalizedTrack * 3) {
                continue;
            }

            let angle = Math.random() * Math.PI * 2;
            let speed = (0.02 + Math.random() * 0.04) / 100;
            let size = 0.3 + Math.random() * 1.0;
            particles.push({
                radius,
                angle,
                speed,
                size,
                sizeOffset: Math.random() * Math.PI * 2,
                sizeSpeed: 0.01 + Math.random() * 0.01
            });
        }

        // 更新和绘制粒子
        function updateParticles() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            particles.forEach(particle => {
                particle.angle += particle.speed;
                if (particle.angle >= Math.PI * 2) {
                    particle.angle = 0;
                }
                
                particle.sizeOffset += particle.sizeSpeed;
                if (particle.sizeOffset >= Math.PI * 2) {
                    particle.sizeOffset = 0;
                }
                let currentSize = particle.size * (0.85 + Math.sin(particle.sizeOffset) * 0.15);
                
                let x = centerX + particle.radius * Math.cos(particle.angle);
                let y = centerY + particle.radius * Math.sin(particle.angle);
                
                let margin = 100;
                if (x >= -margin && x <= canvas.width + margin && 
                    y >= -margin && y <= canvas.height + margin) {
                    ctx.beginPath();
                    ctx.arc(x, y, currentSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            requestAnimationFrame(updateParticles);
        }

        // 处理窗口大小变化
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            centerX = 0;
            centerY = window.innerHeight;
            
            let minRadius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
            let maxRadius = Math.max(window.innerWidth, window.innerHeight) * 2;
            
            particles.forEach(particle => {
                let normalizedRadius = (particle.radius - particle.radius * 0.3) / (particle.radius * 1.7);
                particle.radius = minRadius + (maxRadius - minRadius) * normalizedRadius;
                particle.radius += (Math.random() - 0.5) * (maxRadius - minRadius) * 0.03;
            });
        });

        // 启动动画
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateParticles();
    }, 100); // 添加100ms延时
}); 