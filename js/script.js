// 设备检测函数
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    return { isMobile, isIOS, isAndroid };
}

// 根据设备类型设置下载链接
function setDownloadLinks() {
    const device = detectDevice();
    
    // 设置下载按钮
    const iosBtn = document.querySelector('.btn-primary.download-btn');
    const androidBtn = document.querySelector('.btn-secondary.download-btn');
    const qrCodeBtn = document.querySelector('.btn-outline');
    
    if (iosBtn) { 
        iosBtn.onclick = () => { window.location.href = 'https://apps.apple.com/app/dszuqiu'; }; 
    }
    if (androidBtn) { 
        androidBtn.onclick = () => { window.location.href = 'https://play.google.com/store/apps/details?id=com.dszuqiu.app'; }; 
    }
    if (qrCodeBtn) { 
        qrCodeBtn.onclick = () => { showQRCodeModal(); }; 
    }
}

// 显示二维码模态框
function showQRCodeModal() {
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content">
            <span class="qr-close">&times;</span>
            <h3>扫描二维码下载</h3>
            <img src="images/qr-code.png" alt="下载二维码" style="width: 200px; height: 200px; margin: 20px 0;">
            <p>使用手机扫描二维码即可下载DS足球APP</p>
        </div>
    `;
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .qr-modal {
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .qr-modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            position: relative;
            max-width: 400px;
            width: 90%;
        }
        .qr-close {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #666;
        }
        .qr-close:hover {
            color: #000;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    modal.querySelector('.qr-close').onclick = () => {
        document.body.removeChild(modal);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}



// 导航栏功能
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击导航链接时关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 动态导航栏样式
function initDynamicNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 数字动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const originalText = number.textContent;
        
        // 检查是否是带小数点的数字（如4.9）
        if (originalText.includes('.')) {
            const parts = originalText.split('.');
            const wholePart = parseInt(parts[0]);
            const decimalPart = parts[1];
            let current = 0;
            const increment = wholePart / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= wholePart) {
                    current = wholePart;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current) + '.' + decimalPart;
            }, 30);
        }
        // 检查是否是带百分号的数字（如99.9%）
        else if (originalText.includes('%')) {
            const parts = originalText.split('%');
            const numPart = parts[0];
            if (numPart.includes('.')) {
                const numParts = numPart.split('.');
                const wholePart = parseInt(numParts[0]);
                const decimalPart = numParts[1];
                let current = 0;
                const increment = wholePart / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= wholePart) {
                        current = wholePart;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current) + '.' + decimalPart + '%';
                }, 30);
            } else {
                const target = parseInt(numPart);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current) + '%';
                }, 30);
            }
        }
        // 检查是否是带"万+"的数字（如500万+）
        else if (originalText.includes('万+')) {
            const numPart = originalText.replace('万+', '');
            const target = parseInt(numPart);
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current) + '万+';
            }, 30);
        }
        // 普通整数
        else {
            const target = parseInt(originalText);
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current);
                }, 30);
            }
        }
    });
}

// 表单验证
function initFormValidation() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#e1e8ed';
                }
            });
            
            if (isValid) {
                alert('感谢您的反馈！我们会尽快回复您。');
                form.reset();
            } else {
                alert('请填写所有必填字段。');
            }
        });
    }
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #27ae60;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px)';
        backToTopBtn.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
    });
}

// 首页轮播图功能
function initHeroCarousel() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    if (heroSlides.length === 0) return;
    
    let currentHeroSlide = 0;
    const totalHeroSlides = heroSlides.length;
    
    function showHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
        currentHeroSlide = index;
    }
    
    function nextHeroSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
        showHeroSlide(currentHeroSlide);
    }
    
    // 自动播放首页轮播图
    setInterval(nextHeroSlide, 4000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    setDownloadLinks();
    initNavbar();
    initDynamicNavbar();
    initSmoothScroll();
    initFormValidation();
    initBackToTop();
    initHeroCarousel();
    
    // 加载后台保存的数据
    loadAdminData();
    
    // 延迟执行数字动画
    setTimeout(animateNumbers, 1000);
});

// 加载后台保存的数据
function loadAdminData() {
    // 加载保存的内容数据
    const savedData = localStorage.getItem('adminData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // 更新统计数据
        if (data.downloadCount) {
            const statElements = document.querySelectorAll('.stat-number');
            if (statElements[0]) statElements[0].textContent = data.downloadCount;
            if (statElements[1]) statElements[1].textContent = data.userRating;
            if (statElements[2]) statElements[2].textContent = data.goodRate;
        }
        
        // 更新标题和描述
        if (data.heroTitle) {
            const titleElement = document.querySelector('.hero-title');
            if (titleElement) titleElement.textContent = data.heroTitle;
        }
        
        if (data.heroSubtitle) {
            const subtitleElement = document.querySelector('.hero-subtitle');
            if (subtitleElement) subtitleElement.textContent = data.heroSubtitle;
        }
        
        if (data.heroHighlight) {
            const highlightElement = document.querySelector('.hero-highlight');
            if (highlightElement) highlightElement.textContent = data.heroHighlight;
        }
        
        // 更新下载链接
        if (data.iosDownload) {
            const iosBtn = document.querySelector('.btn-primary.download-btn');
            if (iosBtn) {
                iosBtn.onclick = () => { window.location.href = data.iosDownload; };
            }
        }
        
        if (data.androidDownload) {
            const androidBtn = document.querySelector('.btn-secondary.download-btn');
            if (androidBtn) {
                androidBtn.onclick = () => { window.location.href = data.androidDownload; };
            }
        }
    }
    
    // 加载保存的图片数据
    const savedImages = localStorage.getItem('uploadedImages');
    if (savedImages) {
        const images = JSON.parse(savedImages);
        
        Object.keys(images).forEach(imageId => {
            const imageData = images[imageId];
            const mainPageImg = document.querySelector(`[data-image-id="${imageId}"]`);
            if (mainPageImg) {
                mainPageImg.src = imageData.src;
            }
        });
    }
}
