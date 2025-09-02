// DS足球 - 主要JavaScript功能文件
// 包含汉堡菜单、轮播图、下载链接等功能

// 全局变量
let currentReview = 0;
let reviews = [];
let dots = [];
let container = null;

// 汉堡菜单功能
class HamburgerMenu {
    constructor() {
        this.hamburger = null;
        this.navMenu = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        console.log('=== 汉堡菜单初始化开始 ===');
        
        this.hamburger = document.getElementById('hamburgerBtn');
        this.navMenu = document.querySelector('.nav-menu');
        
        console.log('汉堡菜单元素:', this.hamburger);
        console.log('导航菜单元素:', this.navMenu);
        
        if (this.hamburger && this.navMenu) {
            this.bindEvents();
            this.isInitialized = true;
            console.log('✅ 汉堡菜单初始化成功');
        } else {
            console.error('❌ 汉堡菜单元素未找到');
            if (!this.hamburger) console.error('汉堡菜单元素未找到');
            if (!this.navMenu) console.error('导航菜单元素未找到');
        }
        
        console.log('=== 汉堡菜单初始化结束 ===\n');
    }

    bindEvents() {
        // 添加点击事件监听器
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        console.log('✅ 汉堡菜单事件监听器已添加');
        
        // 点击菜单项关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // 阻止默认跳转
                this.closeMenu();
                console.log('菜单项点击后已关闭');
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                if (this.navMenu.classList.contains('active')) {
                    this.closeMenu();
                    console.log('点击页面其他地方，菜单已关闭');
                }
            }
        });
    }

    toggleMenu() {
        console.log('=== toggleMenu函数被调用 ===');
        
        if (!this.isInitialized) {
            console.error('汉堡菜单未初始化');
            return;
        }
        
        console.log('切换前的状态:');
        console.log('汉堡菜单active类:', this.hamburger.classList.contains('active'));
        console.log('导航菜单active类:', this.navMenu.classList.contains('active'));
        
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        console.log('切换后的状态:');
        console.log('汉堡菜单active类:', this.hamburger.classList.contains('active'));
        console.log('导航菜单active类:', this.navMenu.classList.contains('active'));
        
        if (this.navMenu.classList.contains('active')) {
            console.log('✅ 菜单已打开');
            this.addMenuAnimation();
        } else {
            console.log('❌ 菜单已关闭');
            this.removeMenuAnimation();
        }
        
        console.log('=== toggleMenu函数结束 ===\n');
    }

    closeMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
            this.removeMenuAnimation();
        }
    }

    addMenuAnimation() {
        const navItems = this.navMenu.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.transitionDelay = `${(index + 1) * 0.1}s`;
        });
    }

    removeMenuAnimation() {
        const navItems = this.navMenu.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });
    }
}

// 用户评价轮播功能
class ReviewsCarousel {
    constructor() {
        this.currentReview = 0;
        this.reviews = [];
        this.dots = [];
        this.container = null;
        this.init();
    }

    init() {
        console.log('=== 用户评价轮播初始化开始 ===');
        
        this.reviews = document.querySelectorAll('.review-card');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.container = document.getElementById('reviewsContainer');
        
        console.log('轮播元素:', {
            reviews: this.reviews.length,
            dots: this.dots.length,
            container: this.container
        });
        
        if (this.reviews.length > 0 && this.container) {
            this.bindEvents();
            console.log('✅ 用户评价轮播初始化成功');
        } else {
            console.error('❌ 轮播元素未找到');
        }
        
        console.log('=== 用户评价轮播初始化结束 ===\n');
    }

    bindEvents() {
        // 绑定箭头按钮事件
        const prevBtn = document.querySelector('.carousel-arrow.prev');
        const nextBtn = document.querySelector('.carousel-arrow.next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changeReview(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changeReview(1));
        }
        
        // 绑定圆点事件
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToReview(index));
        });
    }

    showReview(index) {
        if (index < 0) index = this.reviews.length - 1;
        if (index >= this.reviews.length) index = 0;
        
        this.currentReview = index;
        this.container.style.transform = `translateX(-${index * 100}%)`;
        
        // 更新圆点状态
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    changeReview(direction) {
        this.showReview(this.currentReview + direction);
    }
    
    goToReview(index) {
        this.showReview(index);
    }

    startAutoPlay() {
        setInterval(() => {
            this.changeReview(1);
        }, 5000);
    }
}

// Logo点击功能
class LogoManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('=== Logo管理器初始化开始 ===');
        
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                console.log('Logo被点击，刷新页面');
                location.reload();
            });
            console.log('✅ Logo点击事件已绑定');
        } else {
            console.error('❌ Logo元素未找到');
        }
        
        console.log('=== Logo管理器初始化结束 ===\n');
    }
}

// 设备检测和下载链接设置
class DownloadManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('=== 下载管理器初始化开始 ===');
        this.setDownloadLinks();
        console.log('✅ 下载管理器初始化成功');
        console.log('=== 下载管理器初始化结束 ===\n');
    }

    detectDevice() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        } else if (/android/i.test(userAgent)) {
            return 'Android';
        } else {
            return 'Other';
        }
    }
    
    setDownloadLinks() {
        const iosBtn = document.querySelector('.btn-primary.download-btn');
        const androidBtn = document.querySelector('.btn-secondary.download-btn');
        const qrCodeBtn = document.querySelector('.btn-outline');

        if (iosBtn) {
            iosBtn.onclick = () => { 
                window.location.href = 'https://apps.apple.com/app/dszuqiu'; 
            };
        }
        if (androidBtn) {
            androidBtn.onclick = () => { 
                window.location.href = 'https://play.google.com/store/apps/details?id=com.dszuqiu.app'; 
            };
        }
        if (qrCodeBtn) {
            qrCodeBtn.onclick = () => { 
                this.showQRCodeModal(); 
            };
        }
    }

    showQRCodeModal() {
        // 显示二维码模态框的逻辑
        console.log('显示二维码模态框');
        // 这里可以添加模态框显示逻辑
    }
}

// 数字动画功能
class NumberAnimator {
    constructor() {
        this.numbers = [];
        this.init();
    }

    init() {
        console.log('=== 数字动画初始化开始 ===');
        
        this.numbers = document.querySelectorAll('.stat-number');
        console.log('数字元素数量:', this.numbers.length);
        
        if (this.numbers.length > 0) {
            this.animateNumbers();
            console.log('✅ 数字动画初始化成功');
        } else {
            console.log('⚠️ 未找到数字元素');
        }
        
        console.log('=== 数字动画初始化结束 ===\n');
    }

    animateNumbers() {
        this.numbers.forEach(number => {
            const target = number.textContent;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const isDecimal = target.includes('.');
            
            let numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
            let current = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = current;
                if (isDecimal) {
                    displayValue = current.toFixed(1);
                } else {
                    displayValue = Math.floor(current);
                }
                
                if (isPercentage) {
                    displayValue += '%';
                }
                if (isPlus) {
                    displayValue += '+';
                }
                
                number.textContent = displayValue;
            }, 30);
        });
    }
}

// 主应用类
class DSFootballApp {
    constructor() {
        this.hamburgerMenu = null;
        this.reviewsCarousel = null;
        this.downloadManager = null;
        this.numberAnimator = null;
        this.logoManager = null;
        this.init();
    }

    init() {
        console.log('=== DS足球应用初始化开始 ===');
        
        // 等待DOM完全加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
        
        // 备用初始化方法
        window.addEventListener('load', () => {
            console.log('页面完全加载完成');
        });
    }

    startApp() {
        console.log('=== 开始初始化应用 ===');
        
        try {
            // 初始化各个功能模块
            this.logoManager = new LogoManager();
            this.hamburgerMenu = new HamburgerMenu();
            this.reviewsCarousel = new ReviewsCarousel();
            this.downloadManager = new DownloadManager();
            this.numberAnimator = new NumberAnimator();
            
            // 启动轮播自动播放
            if (this.reviewsCarousel) {
                this.reviewsCarousel.startAutoPlay();
            }
            
            console.log('✅ 应用初始化完成');
        } catch (error) {
            console.error('❌ 应用初始化失败:', error);
        }
        
        console.log('=== 应用初始化结束 ===\n');
    }
}

// 全局函数（为了兼容性）
window.toggleMenu = function() {
    if (window.dsFootballApp && window.dsFootballApp.hamburgerMenu) {
        window.dsFootballApp.hamburgerMenu.toggleMenu();
    } else {
        console.error('汉堡菜单未初始化');
    }
};

// 启动应用
window.dsFootballApp = new DSFootballApp();
