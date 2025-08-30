# DS足球项目结构

## 📁 项目目录结构

```
项目/
├── index.html              # 主页面
├── admin.html              # 后台管理页面
├── README.md               # 项目说明文档
├── PROJECT_STRUCTURE.md    # 项目结构说明
├── css/                    # 样式文件目录
│   ├── styles.css          # 主页面样式
│   └── admin.css           # 后台管理样式
├── js/                     # JavaScript文件目录
│   ├── script.js           # 主页面脚本
│   ├── admin.js            # 后台管理脚本
│   └── image-checker.js    # 图片检查脚本
├── images/                 # 图片资源目录
│   ├── logo.png            # 网站Logo
│   ├── qr-code.png         # 下载二维码
│   ├── screenshot1.svg     # 应用截图1
│   ├── screenshot2.svg     # 应用截图2
│   ├── screenshot3.svg     # 应用截图3
│   └── screenshot4.svg     # 应用截图4
└── assets/                 # 其他资源目录
```

## 🗂️ 文件说明

### HTML文件
- **index.html**: DS足球APP下载页面，包含轮播图、下载按钮、功能介绍等
- **admin.html**: 后台管理系统，用于管理内容、图片、下载链接等

### CSS文件
- **css/styles.css**: 主页面样式，包含响应式设计、动画效果等
- **css/admin.css**: 后台管理系统样式，包含登录界面、管理面板等

### JavaScript文件
- **js/script.js**: 主页面交互脚本，包含轮播图、设备检测、数据同步等
- **js/admin.js**: 后台管理脚本，包含登录验证、数据管理、图片上传等
- **js/image-checker.js**: 图片加载检查脚本

### 图片资源
- **images/**: 包含所有网站使用的图片资源
  - SVG格式的应用截图（轮播图使用）
  - PNG格式的Logo和二维码
  - 已清理无效的JPG图片

## 🧹 清理内容

### 已删除的无效文件
- 测试页面：carousel-test.html, admin-test.html, test-stats.html
- 预览页面：phone-preview.html, hero-preview.html, carousel-preview.html, test-images.html
- 无效图片：screenshot*.jpg, app-preview.png, about-image.jpg, hero-image.png, portfolio*.jpg

### 已清理的无效代码
- CSS文件末尾的重复和无效样式
- 图片加载失败的调试样式
- 未使用的carousel-img和app-preview-img样式

## 📋 标准规范

### 文件命名
- 使用小写字母和连字符
- 文件名具有描述性
- 按功能分类组织

### 目录结构
- CSS文件统一放在css/目录
- JavaScript文件统一放在js/目录
- 图片资源统一放在images/目录
- 其他资源放在assets/目录

### 代码规范
- HTML使用语义化标签
- CSS使用BEM命名规范
- JavaScript使用ES6+语法
- 文件编码统一使用UTF-8

## 🚀 部署说明

1. 确保所有文件路径正确
2. 检查图片资源是否完整
3. 测试后台管理功能
4. 验证响应式设计效果

