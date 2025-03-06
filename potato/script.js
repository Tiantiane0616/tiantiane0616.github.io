class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

class TimeSystem {
    constructor() {
        this.startDate = new Date(2025, 1, 28, 22, 34); // 2025-02-28 22:34
        this.isLive = false;
        this.init();
    }

    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const diff = now - this.startDate;

        if (diff >= 0 && !this.isLive) {
            this.showLiveStatus();
            this.isLive = true;
        }

        this.isLive ? this.showDuration(diff) : this.showCountdown(-diff);
    }

    showCountdown(ms) {
        document.getElementById('countdownBox').style.display = 'grid';
        document.getElementById('durationBox').style.display = 'none';

        const days = Math.floor(ms / 86400000);
        const hours = Math.floor((ms % 86400000) / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);

        this.updateDisplay(['days', 'hours', 'minutes', 'seconds'], 
                          [days, hours, minutes, seconds]);
    }

    showDuration(ms) {
        document.getElementById('countdownBox').style.display = 'none';
        document.getElementById('durationBox').style.display = 'grid';

        const days = Math.floor(ms / 86400000);
        const hours = Math.floor((ms % 86400000) / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);

        this.updateDisplay(['liveDays', 'liveHours', 'liveMinutes', 'liveSeconds'],
                          [days, hours, minutes, seconds]);
    }

    updateDisplay(ids, values) {
        ids.forEach((id, index) => {
            const element = document.getElementById(id);
            element.textContent = index === 0 ? values[index] : 
                values[index].toString().padStart(2, '0');
        });
    }

    showLiveStatus() {
        const liveBadge = document.createElement('div');
        liveBadge.className = 'live-badge';
        liveBadge.innerHTML = `
            <span class="live-dot"></span>
            直播进行中
        `;
        document.querySelector('.hero-title').appendChild(liveBadge);
    }
}

class ParticleEngine {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
    }

    init() {
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.2
            });
        }
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.particles.forEach(particle => {
            particle.y += particle.speed;
            if (particle.y > this.height) particle.y = 0;
            
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255,215,0,${particle.size/4})`;
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

class App {
    static init() {
        // 加载完成处理
        window.addEventListener('load', () => {
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => document.getElementById('loader').remove(), 500);
        });

        // 初始化核心模块
        new ThemeManager();
        new TimeSystem();
        new ParticleEngine();

        // 微信复制功能
        document.getElementById('copyWechat').addEventListener('click', () => {
            this.copyText('wjh2518130691', '微信已复制');
        });
    }

    static copyText(text, successMsg) {
        navigator.clipboard.writeText(text)
            .then(() => this.showToast(successMsg))
            .catch(() => this.showToast('请手动复制'));
    }

    static showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => toast.remove(), 2000);
        }, 100);
    }
}

// 启动应用
App.init();