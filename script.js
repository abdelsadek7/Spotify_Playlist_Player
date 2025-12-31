// العناصر
const spotifyUrlInput = document.getElementById('spotifyUrl');
const embedCodeInput = document.getElementById('embedCode');
const loadPlaylistBtn = document.getElementById('loadPlaylist');
const spotifyPlayerContainer = document.getElementById('spotifyPlayerContainer');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // زر تحميل البلايليست
    loadPlaylistBtn.addEventListener('click', loadPlaylist);
    
    // زر Enter يعمل مثل النقر
    spotifyUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadPlaylist();
    });
    
    embedCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadPlaylist();
    });
});

// تحميل البلايليست
function loadPlaylist() {
    const url = spotifyUrlInput.value.trim();
    const embedCode = embedCodeInput.value.trim();
    
    // إذا كان هناك كود تضمين
    if (embedCode && embedCode.includes('iframe')) {
        spotifyPlayerContainer.innerHTML = embedCode;
        showSuccess('تم تحميل المشغل بنجاح!');
        return;
    }
    
    // إذا كان هناك رابط
    if (url && url.includes('spotify.com')) {
        const embedId = getSpotifyId(url);
        
        if (embedId) {
            const type = getSpotifyType(url);
            loadSpotifyEmbed(embedId, type);
            showSuccess('تم تحميل المشغل بنجاح!');
        } else {
            showError('الرابط غير صالح');
        }
    } else {
        showError('الرجاء إدخال رابط Spotify');
    }
}

// تحميل مشغل Spotify
function loadSpotifyEmbed(id, type) {
    const embedHtml = `
        <iframe 
            src="https://open.spotify.com/embed/${type}/${id}" 
            width="100%" 
            height="380" 
            frameborder="0" 
            allowtransparency="true" 
            allow="encrypted-media"
            style="border-radius: 12px;">
        </iframe>
    `;
    
    spotifyPlayerContainer.innerHTML = embedHtml;
}

// استخراج معرف Spotify من الرابط
function getSpotifyId(url) {
    const match = url.match(/\/(playlist|track|album|artist|episode|show)\/([a-zA-Z0-9]+)/);
    return match ? match[2] : null;
}

// تحديد نوع المحتوى
function getSpotifyType(url) {
    if (url.includes('/playlist/')) return 'playlist';
    if (url.includes('/track/')) return 'track';
    if (url.includes('/album/')) return 'album';
    if (url.includes('/artist/')) return 'artist';
    if (url.includes('/episode/')) return 'episode';
    if (url.includes('/show/')) return 'show';
    return 'playlist';
}

// عرض رسالة خطأ
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 4000);
}

// عرض رسالة نجاح
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}