// 动态时间显示
function renderTime() {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const timeString = new Date().toLocaleDateString('zh-CN', options)
        .replace(/(上午|下午)/, '')
        .replace(/星期/g, '周');

    document.getElementById('time').innerHTML = `
        <div style="font-size: 1.2em; margin-bottom: 0.5em;">📅 当前时间</div>
        <div style="font-family: monospace;">${timeString}</div>
    `;
}

// 初始化
renderTime();
setInterval(renderTime, 1000);

// 主题切换
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 自动检测系统主题偏好
function detectColorScheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;
    document.documentElement.setAttribute('data-theme', theme);
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', detectColorScheme);

detectColorScheme();