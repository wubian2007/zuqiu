// 图片加载检查脚本
function checkImages() {
    const images = document.querySelectorAll('img');
    console.log('检查图片加载状态...');
    
    images.forEach((img, index) => {
        console.log(`图片 ${index + 1}:`, {
            src: img.src,
            alt: img.alt,
            width: img.naturalWidth,
            height: img.naturalHeight,
            complete: img.complete,
            naturalWidth: img.naturalWidth
        });
        
        if (img.complete && img.naturalWidth === 0) {
            console.error(`图片加载失败: ${img.src}`);
            img.style.border = '2px solid red';
        }
    });
}

// 页面加载完成后检查图片
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkImages, 1000); // 延迟1秒检查，确保图片有时间加载
});

// 监听图片加载事件
document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG') {
        console.log('图片加载成功:', e.target.src);
    }
}, true);

// 监听图片加载错误事件
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.error('图片加载失败:', e.target.src);
        e.target.style.border = '2px solid red';
    }
}, true);
