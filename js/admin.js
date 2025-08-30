class AdminPanel {
    constructor() {
        this.isLoggedIn = false;
        this.defaultPassword = 'admin123';
        this.loginExpiryTime = 24 * 60 * 60 * 1000; // 24小时
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.bindEvents();
        this.loadData();
    }

    checkLoginStatus() {
        const savedPassword = localStorage.getItem('adminPassword');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const loginTime = localStorage.getItem('loginTime');
        const currentTime = Date.now();
        
        // 检查登录是否过期
        if (loginTime && (currentTime - parseInt(loginTime)) > this.loginExpiryTime) {
            this.logout();
            return;
        }
        
        if (rememberMe && savedPassword === this.defaultPassword) {
            this.login();
        } else {
            this.showLoginScreen();
        }
    }

    showLoginScreen() {
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('mainScreen').style.display = 'none';
        this.isLoggedIn = false;
    }

    showMainScreen() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainScreen').style.display = 'block';
        this.isLoggedIn = true;
    }

    login() {
        this.showMainScreen();
        this.initTabs();
        this.loadSavedData();
        // 记录登录时间
        localStorage.setItem('loginTime', Date.now().toString());
    }

    logout() {
        localStorage.removeItem('adminPassword');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('loginTime');
        this.showLoginScreen();
    }

    bindEvents() {
        // 登录表单
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 退出登录
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // 图片上传按钮事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('upload-btn')) {
                const fileInput = e.target.parentElement.querySelector('.image-upload');
                if (fileInput) {
                    fileInput.click();
                }
            }
        });

        // 图片上传文件选择事件
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('image-upload')) {
                this.handleImageUpload(e);
            }
        });

        // 自动保存功能
        document.addEventListener('change', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.autoSave();
            }
        });
    }

    handleLogin() {
        const password = document.getElementById('adminPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (password === this.defaultPassword) {
            if (rememberMe) {
                localStorage.setItem('adminPassword', password);
                localStorage.setItem('rememberMe', 'true');
            }
            this.login();
        } else {
            alert('密码错误！默认密码：admin123');
        }
    }

    initTabs() {
        const navItems = document.querySelectorAll('.nav-item');
        const contentTabs = document.querySelectorAll('.content-tab');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = item.getAttribute('data-tab');
                
                // 更新导航状态
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // 更新内容显示
                contentTabs.forEach(tab => tab.classList.remove('active'));
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    loadData() {
        // 加载默认数据
        this.loadDefaultContent();
        this.loadDefaultImages();
        this.loadDefaultDownloads();
        this.loadDefaultSettings();
    }

    loadDefaultContent() {
        const defaultContent = {
            heroTitle: 'DS足球',
            heroSubtitle: '足球比分直播与数据分析平台，随时随地享受全球足球盛宴',
            heroHighlight: '拥有全球207个国家或地区、2688个联赛、52824支球队的详细数据供您查询',
            downloadCount: '500万+',
            userRating: '4.9',
            goodRate: '99.9%',
            supportEmail: 'support@dszuqiu.com',
            supportPhone: '400-999-8888',
            supportWechat: 'dszuqiu_support',
            copyright: '© 2025 DSZUQIU.COM. All Rights Reserved. 蜀ICP备14008209号',
            features: [
                {
                    title: '比分直播',
                    desc: '即时比分、角球比分，实时更新比赛数据，掌握最新赛况'
                },
                {
                    title: '数据统计',
                    desc: '专业的足球大数据分析，全面准确及时的数据直播'
                },
                {
                    title: '比赛日程',
                    desc: '竞彩足球、北京单场，全球足球赛事日程一览无余'
                },
                {
                    title: '视频直播',
                    desc: '视频集锦、录像回放，精彩瞬间不容错过'
                },
                {
                    title: '足球资讯',
                    desc: '比赛前瞻、专家专栏，深度解析足球世界'
                },
                {
                    title: '专家号',
                    desc: '专家团专业分析，助您更好地了解足球比赛'
                }
            ]
        };

        // 填充表单
        Object.keys(defaultContent).forEach(key => {
            const element = document.getElementById(key);
            if (element && typeof defaultContent[key] === 'string') {
                element.value = defaultContent[key];
            }
        });

        // 填充功能特色
        this.loadFeatures(defaultContent.features);
    }

    loadFeatures(features) {
        const featuresContainer = document.querySelector('.features-editor');
        const addBtn = featuresContainer.querySelector('.add-btn');
        
        // 清空现有功能
        featuresContainer.querySelectorAll('.feature-item').forEach(item => {
            item.remove();
        });

        // 添加功能特色
        features.forEach(feature => {
            this.addFeature(feature.title, feature.desc);
        });
    }

    loadDefaultImages() {
        const defaultImages = {
            screenshot1: 'images/screenshot1.svg',
            screenshot2: 'images/screenshot2.svg',
            screenshot3: 'images/screenshot3.svg',
            screenshot4: 'images/screenshot4.svg',
            qrCode: 'images/qr-code.png',
            logo: 'images/logo.png'
        };

        Object.keys(defaultImages).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = defaultImages[key];
            }
        });
    }

    loadDefaultDownloads() {
        const defaultDownloads = {
            iosDownload: 'https://apps.apple.com/app/dszuqiu',
            androidDownload: 'https://play.google.com/store/apps/details?id=com.dszuqiu.app',
            generalDownload: 'https://live.dszuqiu.com/download'
        };

        Object.keys(defaultDownloads).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = defaultDownloads[key];
            }
        });
    }

    loadDefaultSettings() {
        const defaultSettings = {
            siteTitle: 'DS足球 - 足球比分直播与数据分析平台',
            siteDescription: 'DS足球是专业的足球比分直播与数据分析平台',
            analyticsCode: '',
            customerServiceCode: ''
        };

        Object.keys(defaultSettings).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = defaultSettings[key];
            }
        });
    }

    loadSavedData() {
        // 从localStorage加载保存的数据
        const savedData = localStorage.getItem('adminData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.applySavedData(data);
        }
        
        // 加载已保存的图片
        this.loadSavedImages();
    }

    applySavedData(data) {
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = data[key];
            }
        });
    }
    
    loadSavedImages() {
        const savedImages = localStorage.getItem('uploadedImages');
        if (savedImages) {
            const images = JSON.parse(savedImages);
            
            Object.keys(images).forEach(imageId => {
                const imageData = images[imageId];
                const fileInput = document.getElementById(imageId);
                if (fileInput) {
                    const imageContainer = fileInput.closest('.image-item');
                    const img = imageContainer.querySelector('img');
                    const noImageDiv = imageContainer.querySelector('.no-image');
                    
                    if (img) {
                        img.src = imageData.src;
                        img.style.display = 'block';
                        if (noImageDiv) {
                            noImageDiv.style.display = 'none';
                        }
                    }
                }
            });
        }
    }

    autoSave() {
        const data = {};
        
        // 收集所有表单数据
        document.querySelectorAll('input, textarea').forEach(input => {
            if (input.id) {
                data[input.id] = input.value;
            }
        });

        // 保存到localStorage
        localStorage.setItem('adminData', JSON.stringify(data));
        
        // 同步到主页面
        this.syncToMainPage();
    }

    saveData() {
        this.autoSave();
        this.showNotification('数据保存成功！', 'success');
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                this.showNotification('请选择图片文件！', 'error');
                return;
            }
            
            // 检查文件大小（限制为5MB）
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('图片文件大小不能超过5MB！', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                // 查找对应的预览图片
                const imageContainer = event.target.closest('.image-item');
                const img = imageContainer.querySelector('img');
                const noImageDiv = imageContainer.querySelector('.no-image');
                
                if (img) {
                    img.src = e.target.result;
                    img.style.display = 'block';
                    if (noImageDiv) {
                        noImageDiv.style.display = 'none';
                    }
                    
                    // 保存图片数据
                    const imageId = event.target.id;
                    const imageData = {
                        src: e.target.result,
                        name: file.name,
                        type: file.type,
                        size: file.size
                    };
                    
                    // 保存到localStorage
                    const savedImages = JSON.parse(localStorage.getItem('uploadedImages') || '{}');
                    savedImages[imageId] = imageData;
                    localStorage.setItem('uploadedImages', JSON.stringify(savedImages));
                    
                    // 同步到主页面
                    this.syncToMainPage();
                    
                    this.showNotification('图片上传成功！', 'success');
                }
            };
            
            reader.onerror = () => {
                this.showNotification('图片读取失败！', 'error');
            };
            
            reader.readAsDataURL(file);
        }
    }

    syncToMainPage() {
        // 获取保存的数据
        const savedData = localStorage.getItem('adminData');
        const savedImages = localStorage.getItem('uploadedImages');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // 更新主页面的统计数据
            if (data.downloadCount) {
                const statElements = document.querySelectorAll('.stat-number');
                if (statElements[0]) statElements[0].textContent = data.downloadCount;
                if (statElements[1]) statElements[1].textContent = data.userRating;
                if (statElements[2]) statElements[2].textContent = data.goodRate;
            }
            
            // 更新主页面标题和描述
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
        }
        
        if (savedImages) {
            const images = JSON.parse(savedImages);
            
            // 更新主页面图片
            Object.keys(images).forEach(imageId => {
                const imageData = images[imageId];
                const mainPageImg = document.querySelector(`[data-image-id="${imageId}"]`);
                if (mainPageImg) {
                    mainPageImg.src = imageData.src;
                }
            });
        }
    }

    addFeature(title = '', desc = '') {
        const featuresContainer = document.querySelector('.features-editor');
        const addBtn = featuresContainer.querySelector('.add-btn');
        
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        featureItem.innerHTML = `
            <div class="feature-header">
                <h4>功能${featuresContainer.querySelectorAll('.feature-item').length + 1}</h4>
                <button class="remove-btn" onclick="adminPanel.removeFeature(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>标题</label>
                    <input type="text" class="feature-title" value="${title}" placeholder="功能标题">
                </div>
                <div class="form-group">
                    <label>描述</label>
                    <textarea class="feature-desc" rows="2" placeholder="功能描述">${desc}</textarea>
                </div>
            </div>
        `;
        
        featuresContainer.insertBefore(featureItem, addBtn);
        
        // 重新编号
        this.renumberFeatures();
        
        // 自动保存
        this.autoSave();
    }

    removeFeature(button) {
        const featureItem = button.closest('.feature-item');
        featureItem.remove();
        
        // 重新编号
        this.renumberFeatures();
        
        // 自动保存
        this.autoSave();
    }

    renumberFeatures() {
        document.querySelectorAll('.feature-item').forEach((item, index) => {
            item.querySelector('h4').textContent = `功能${index + 1}`;
        });
    }

    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // 设置背景色
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db'
        };
        notification.style.background = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// 全局函数
function saveContent() {
    adminPanel.saveData();
}

function saveImages() {
    adminPanel.saveData();
}

function saveDownloads() {
    adminPanel.saveData();
}

function saveSettings() {
    adminPanel.saveData();
}

function addFeature() {
    adminPanel.addFeature();
}

function removeFeature(button) {
    adminPanel.removeFeature(button);
}

// 初始化
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
