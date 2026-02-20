const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const download4k = document.getElementById('download-4k');
const downloadHd = document.getElementById('download-hd');
const closeBtn = document.querySelector('.close');
const categoryBtns = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');
const favModalBtn = document.getElementById('fav-modal-btn');

let currentCategory = 'nature';
let allImages = [];
let allCategoriesImages = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentImageId = null;

const imageDescriptions = {
    nature: ['Mountain Landscape', 'Forest Trees', 'Ocean Waves', 'Sunset Sky', 'Green Valley', 'Waterfall', 'Lake View', 'Flower Garden', 'Desert Dunes', 'River Stream', 'Autumn Leaves', 'Snow Mountain', 'Tropical Beach', 'Rainforest', 'Canyon Rocks', 'Meadow Field', 'Pine Forest', 'Coastal Cliffs', 'Spring Blossom', 'Winter Wonderland', 'Misty Morning', 'Golden Hour', 'Starry Night', 'Rainbow Sky', 'Cherry Blossoms', 'Palm Trees', 'Rocky Mountains', 'Peaceful Lake', 'Sunrise View', 'Nature Paradise'],
    city: ['City Skyline', 'Urban Street', 'Night Lights', 'Modern Buildings', 'Downtown View', 'Bridge Architecture', 'Skyscrapers', 'City Traffic', 'Metro Station', 'Street Art', 'Neon Signs', 'Rooftop View', 'City Park', 'Historic District', 'Shopping District', 'Harbor View', 'City Square', 'Busy Intersection', 'Aerial View', 'Waterfront', 'City Sunset', 'Urban Jungle', 'Glass Buildings', 'City Reflection', 'Street Market', 'City Lights', 'Modern Architecture', 'City Panorama', 'Urban Landscape', 'Metropolitan'],
    abstract: ['Colorful Waves', 'Geometric Shapes', 'Gradient Flow', 'Abstract Art', 'Color Splash', 'Digital Art', 'Fluid Motion', 'Pattern Design', 'Vibrant Colors', 'Modern Art', 'Artistic Blend', 'Color Burst', 'Creative Design', 'Abstract Lines', 'Color Harmony', 'Digital Pattern', 'Artistic Flow', 'Color Spectrum', 'Abstract Texture', 'Modern Pattern', 'Color Fusion', 'Artistic Waves', 'Digital Creation', 'Abstract Form', 'Color Mix', 'Creative Art', 'Abstract Beauty', 'Color Dance', 'Artistic Vision', 'Abstract Wonder'],
    animals: ['Wild Lion', 'Cute Puppy', 'Majestic Eagle', 'Ocean Dolphin', 'Forest Deer', 'Playful Kitten', 'Wild Tiger', 'Colorful Parrot', 'Elephant Herd', 'Butterfly Wings', 'Wolf Pack', 'Panda Bear', 'Tropical Fish', 'Horse Running', 'Owl Eyes', 'Monkey Playing', 'Zebra Stripes', 'Penguin Colony', 'Fox Portrait', 'Giraffe Tall', 'Koala Bear', 'Peacock Feathers', 'Rabbit Cute', 'Shark Swimming', 'Bear Cub', 'Flamingo Pink', 'Cheetah Fast', 'Turtle Slow', 'Hummingbird', 'Seal Pup'],
    space: ['Galaxy Stars', 'Planet Earth', 'Nebula Cloud', 'Milky Way', 'Moon Surface', 'Star Cluster', 'Solar System', 'Cosmic View', 'Space Station', 'Asteroid Belt', 'Black Hole', 'Supernova', 'Mars Planet', 'Saturn Rings', 'Jupiter Storm', 'Comet Tail', 'Star Formation', 'Deep Space', 'Cosmic Dust', 'Space Exploration', 'Lunar Eclipse', 'Aurora Lights', 'Constellation', 'Meteor Shower', 'Space Nebula', 'Cosmic Wonder', 'Stellar View', 'Universe', 'Celestial Bodies', 'Space Beauty'],
    minimal: ['Clean White', 'Simple Black', 'Minimal Design', 'Pure Simplicity', 'Elegant Lines', 'Subtle Gradient', 'Minimalist Art', 'Clean Space', 'Simple Form', 'Minimal Color', 'Pure Design', 'Clean Lines', 'Simple Beauty', 'Minimal Style', 'Clean Aesthetic', 'Simple Elegance', 'Minimal Pattern', 'Pure Minimal', 'Clean Design', 'Simple Minimal', 'Minimal Waves', 'Clean Simplicity', 'Simple Lines', 'Minimal Art', 'Pure Lines', 'Clean Minimal', 'Simple Design', 'Minimal Beauty', 'Pure Simplicity', 'Clean Style'],
    'pakistani-politicians': ['Imran Khan', 'Nawaz Sharif', 'Shehbaz Sharif', 'Bilawal Bhutto', 'Asif Ali Zardari', 'Maryam Nawaz', 'Pervez Musharraf', 'Benazir Bhutto', 'Zulfikar Ali Bhutto', 'Muhammad Ali Jinnah', 'Liaquat Ali Khan', 'Ayub Khan', 'Yahya Khan', 'Zia ul Haq', 'Farooq Sattar', 'Altaf Hussain', 'Aitzaz Ahsan', 'Shah Mehmood Qureshi', 'Chaudhry Nisar', 'Khawaja Asif', 'Ahsan Iqbal', 'Fawad Chaudhry', 'Shireen Mazari', 'Hina Rabbani Khar', 'Sherry Rehman', 'Aftab Sherpao', 'Asfandyar Wali', 'Mahmood Khan Achakzai', 'Sirajul Haq', 'Fazlur Rehman']
};

function loadImages(category) {
    if (category === 'favorites') {
        displayFavorites();
        return;
    }
    
    gallery.innerHTML = '<div class="loader"><i class="fas fa-spinner fa-spin"></i> Loading wallpapers...</div>';
    
    const images = [];
    const descriptions = imageDescriptions[category] || [];
    
    for (let i = 1; i <= 30; i++) {
        const id = `${category}-${i}`;
        images.push({
            id: id,
            category: category,
            urls: {
                thumb: `https://picsum.photos/400/300?random=${category}${i}`,
                regular: `https://picsum.photos/1920/1080?random=${category}${i}`,
                full: `https://picsum.photos/3840/2160?random=${category}${i}`
            },
            alt_description: descriptions[i - 1] || `${category.charAt(0).toUpperCase() + category.slice(1)} wallpaper ${i}`,
            user: {
                name: 'Premium Collection'
            }
        });
    }
    allImages = images;
    
    if (allCategoriesImages.length === 0) {
        loadAllCategories();
    }
    
    displayImages(images);
}

function loadAllCategories() {
    const categories = ['nature', 'city', 'abstract', 'animals', 'space', 'minimal', 'pakistani-politicians'];
    allCategoriesImages = [];
    
    categories.forEach(cat => {
        const descriptions = imageDescriptions[cat] || [];
        
        for (let i = 1; i <= 30; i++) {
            const id = `${cat}-${i}`;
            allCategoriesImages.push({
                id: id,
                category: cat,
                urls: {
                    thumb: `https://picsum.photos/400/300?random=${cat}${i}`,
                    regular: `https://picsum.photos/1920/1080?random=${cat}${i}`,
                    full: `https://picsum.photos/3840/2160?random=${cat}${i}`
                },
                alt_description: descriptions[i - 1] || `${cat.charAt(0).toUpperCase() + cat.slice(1)} wallpaper ${i}`,
                user: {
                    name: 'Premium Collection'
                }
            });
        }
    });
}

function displayImages(images) {
    gallery.innerHTML = '';
    
    images.forEach(image => {
        const isFav = favorites.includes(image.id);
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.urls.thumb}" alt="${image.alt_description}" loading="lazy">
            <div class="overlay">
                <h3>${image.alt_description}</h3>
                <p><i class="fas fa-user"></i> ${image.user.name}</p>
                <div class="actions">
                    <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${image.id}">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="download-quick-btn" data-url="${image.urls.full}" data-id="${image.id}">
                        <i class="fas fa-download"></i>
                    </button>
                    <span class="resolution-badge"><i class="fas fa-desktop"></i> 4K UHD</span>
                </div>
            </div>
        `;
        
        item.querySelector('img').addEventListener('click', () => {
            openModal(image);
        });
        
        item.querySelector('.fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(image.id);
            const btn = item.querySelector('.fav-btn');
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.className = favorites.includes(image.id) ? 'fas fa-heart' : 'far fa-heart';
        });
        
        item.querySelector('.download-quick-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            downloadImage(image.urls.full, `wallpaper-4k-${image.id}.jpg`);
        });
        
        gallery.appendChild(item);
    });
}

function displayFavorites() {
    const favImages = allImages.filter(img => favorites.includes(img.id));
    if (favImages.length === 0) {
        gallery.innerHTML = '<div class="loader"><i class="fas fa-heart-broken"></i> No favorites yet. Start adding some!</div>';
    } else {
        displayImages(favImages);
    }
}

function openModal(image) {
    modal.style.display = 'block';
    modalImg.src = image.urls.regular;
    modalTitle.textContent = image.alt_description;
    modalAuthor.textContent = `Photo by ${image.user.name}`;
    currentImageId = image.id;
    
    download4k.onclick = () => downloadImage(image.urls.full, `wallpaper-4k-${image.id}.jpg`);
    downloadHd.onclick = () => downloadImage(image.urls.regular, `wallpaper-hd-${image.id}.jpg`);
    
    const isFav = favorites.includes(image.id);
    favModalBtn.classList.toggle('active', isFav);
    favModalBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;
}

function downloadImage(url, filename) {
    downloadCount++;
    localStorage.setItem('downloadCount', downloadCount);
    document.getElementById('download-count').textContent = downloadCount;
    
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(() => alert('Download failed. Please try again.'));
}

function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

favModalBtn.addEventListener('click', () => {
    toggleFavorite(currentImageId);
    const isFav = favorites.includes(currentImageId);
    favModalBtn.classList.toggle('active', isFav);
    favModalBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;
    
    if (currentCategory === 'favorites') {
        displayFavorites();
    }
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        searchInput.value = '';
        loadImages(currentCategory);
    });
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        if (currentCategory === 'favorites') {
            displayFavorites();
        } else {
            displayImages(allImages);
        }
    } else if (searchTerm.length >= 3) {
        searchOnline(searchTerm);
    }
});

let searchTimeout;
function searchOnline(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        gallery.innerHTML = '<div class="loader"><i class="fas fa-spinner fa-spin"></i> Searching for "' + query + '"...</div>';
        
        // Try Unsplash API first
        if (typeof API_CONFIG !== 'undefined' && API_CONFIG.unsplash.enabled && API_CONFIG.unsplash.accessKey !== 'YOUR_UNSPLASH_ACCESS_KEY_HERE') {
            try {
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape`, {
                    headers: {
                        'Authorization': `Client-ID ${API_CONFIG.unsplash.accessKey}`
                    }
                });
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    const images = data.results.map((img, index) => ({
                        id: `search-${query}-${index}`,
                        category: query,
                        urls: {
                            thumb: img.urls.small,
                            regular: img.urls.regular,
                            full: img.urls.full
                        },
                        alt_description: img.alt_description || img.description || `${query} wallpaper`,
                        user: {
                            name: img.user.name
                        }
                    }));
                    displayImages(images);
                    return;
                }
            } catch (error) {
                console.log('Unsplash API failed, trying Pexels...');
            }
        }
        
        // Try Pexels API
        if (typeof API_CONFIG !== 'undefined' && API_CONFIG.pexels.enabled && API_CONFIG.pexels.apiKey !== 'YOUR_PEXELS_API_KEY_HERE') {
            try {
                const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape`, {
                    headers: {
                        'Authorization': API_CONFIG.pexels.apiKey
                    }
                });
                const data = await response.json();
                
                if (data.photos && data.photos.length > 0) {
                    const images = data.photos.map((img, index) => ({
                        id: `search-${query}-${index}`,
                        category: query,
                        urls: {
                            thumb: img.src.medium,
                            regular: img.src.large,
                            full: img.src.original
                        },
                        alt_description: img.alt || `${query} wallpaper`,
                        user: {
                            name: img.photographer
                        }
                    }));
                    displayImages(images);
                    return;
                }
            } catch (error) {
                console.log('Pexels API failed, trying Pixabay...');
            }
        }
        
        // Try Pixabay API
        if (typeof API_CONFIG !== 'undefined' && API_CONFIG.pixabay.enabled && API_CONFIG.pixabay.apiKey !== 'YOUR_PIXABAY_API_KEY_HERE') {
            try {
                const response = await fetch(`https://pixabay.com/api/?key=${API_CONFIG.pixabay.apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=30&orientation=horizontal`);
                const data = await response.json();
                
                if (data.hits && data.hits.length > 0) {
                    const images = data.hits.map((img, index) => ({
                        id: `search-${query}-${index}`,
                        category: query,
                        urls: {
                            thumb: img.webformatURL,
                            regular: img.largeImageURL,
                            full: img.largeImageURL
                        },
                        alt_description: img.tags || `${query} wallpaper`,
                        user: {
                            name: img.user
                        }
                    }));
                    displayImages(images);
                    return;
                }
            } catch (error) {
                console.log('Pixabay API failed, trying Unsplash Source...');
            }
        }
        
        // Fallback 1: Unsplash Source (no API key needed)
        try {
            const images = [];
            for (let i = 1; i <= 30; i++) {
                images.push({
                    id: `search-${query}-${i}`,
                    category: query,
                    urls: {
                        thumb: `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}&sig=${i}`,
                        regular: `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}&sig=${i}`,
                        full: `https://source.unsplash.com/3840x2160/?${encodeURIComponent(query)}&sig=${i}`
                    },
                    alt_description: `${query} wallpaper ${i}`,
                    user: {
                        name: 'Unsplash Collection'
                    }
                });
            }
            displayImages(images);
            return;
        } catch (error) {
            console.log('Unsplash Source failed, trying Lorem Picsum...');
        }
        
        // Fallback 2: Lorem Picsum (always works)
        const images = [];
        for (let i = 1; i <= 30; i++) {
            images.push({
                id: `search-${query}-${i}`,
                category: query,
                urls: {
                    thumb: `https://picsum.photos/400/300?random=${query}${i}`,
                    regular: `https://picsum.photos/1920/1080?random=${query}${i}`,
                    full: `https://picsum.photos/3840/2160?random=${query}${i}`
                },
                alt_description: `${query} wallpaper ${i}`,
                user: {
                    name: 'Photo Collection'
                }
            });
        }
        displayImages(images);
    }, 500);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

loadImages(currentCategory);


// Stats counters
let downloadCount = parseInt(localStorage.getItem('downloadCount')) || 0;
document.getElementById('download-count').textContent = downloadCount;

function updateFavCount() {
    document.getElementById('fav-count').textContent = favorites.length;
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// View toggle
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        
        if (view === 'list') {
            gallery.classList.add('list-view');
        } else {
            gallery.classList.remove('list-view');
        }
    });
});

// Sort functionality
const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    let sortedImages = [...allImages];
    
    if (sortBy === 'name') {
        sortedImages.sort((a, b) => a.alt_description.localeCompare(b.alt_description));
    } else if (sortBy === 'recent') {
        sortedImages.reverse();
    }
    
    displayImages(sortedImages);
});

updateFavCount();


// Video support
let currentMediaType = 'photo';
const modalVideo = document.getElementById('modal-video');
const typeSelect = document.getElementById('type-select');

async function loadVideos() {
    gallery.innerHTML = '<div class="loader"><i class="fas fa-spinner fa-spin"></i> Loading videos...</div>';
    
    if (typeof API_CONFIG !== 'undefined' && API_CONFIG.pexels.enabled && API_CONFIG.pexels.apiKey !== 'YOUR_PEXELS_API_KEY_HERE') {
        try {
            const response = await fetch(`https://api.pexels.com/videos/popular?per_page=30`, {
                headers: {
                    'Authorization': API_CONFIG.pexels.apiKey
                }
            });
            const data = await response.json();
            
            if (data.videos && data.videos.length > 0) {
                const videos = data.videos.map((vid, index) => ({
                    id: `video-${index}`,
                    category: 'videos',
                    type: 'video',
                    urls: {
                        thumb: vid.image,
                        regular: vid.video_files.find(f => f.quality === 'hd')?.link || vid.video_files[0].link,
                        full: vid.video_files.find(f => f.quality === 'hd')?.link || vid.video_files[0].link
                    },
                    video_files: vid.video_files,
                    alt_description: `Video ${index + 1}`,
                    user: {
                        name: vid.user.name
                    }
                }));
                allImages = videos;
                displayVideos(videos);
                return;
            }
        } catch (error) {
            console.log('Pexels video API failed');
        }
    }
    
    gallery.innerHTML = '<div class="loader"><i class="fas fa-exclamation-circle"></i> Please add Pexels API key to view videos</div>';
}

function displayVideos(videos) {
    gallery.innerHTML = '';
    
    videos.forEach(video => {
        const isFav = favorites.includes(video.id);
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${video.urls.thumb}" alt="${video.alt_description}" loading="lazy">
            <div class="video-badge"><i class="fas fa-video"></i> VIDEO</div>
            <div class="play-overlay"><i class="fas fa-play"></i></div>
            <div class="overlay">
                <h3>${video.alt_description}</h3>
                <p><i class="fas fa-user"></i> ${video.user.name}</p>
                <div class="actions">
                    <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${video.id}">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="download-quick-btn" data-url="${video.urls.full}" data-id="${video.id}">
                        <i class="fas fa-download"></i>
                    </button>
                    <span class="resolution-badge"><i class="fas fa-film"></i> HD VIDEO</span>
                </div>
            </div>
        `;
        
        item.querySelector('img').addEventListener('click', () => {
            openVideoModal(video);
        });
        
        item.querySelector('.fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(video.id);
            const btn = item.querySelector('.fav-btn');
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.className = favorites.includes(video.id) ? 'fas fa-heart' : 'far fa-heart';
        });
        
        item.querySelector('.download-quick-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            downloadImage(video.urls.full, `video-${video.id}.mp4`);
        });
        
        gallery.appendChild(item);
    });
}

function openVideoModal(video) {
    modal.style.display = 'block';
    modalImg.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.src = video.urls.regular;
    modalVideo.play();
    modalTitle.textContent = video.alt_description;
    modalAuthor.textContent = `Video by ${video.user.name}`;
    currentImageId = video.id;
    
    download4k.onclick = () => downloadImage(video.urls.full, `video-hd-${video.id}.mp4`);
    downloadHd.onclick = () => downloadImage(video.urls.regular, `video-sd-${video.id}.mp4`);
    
    const isFav = favorites.includes(video.id);
    favModalBtn.classList.toggle('active', isFav);
    favModalBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;
}

// Update category button handler
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        currentMediaType = btn.dataset.type;
        searchInput.value = '';
        
        if (currentCategory === 'videos') {
            loadVideos();
        } else {
            loadImages(currentCategory);
        }
    });
});

// Type filter
typeSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    if (type === 'video') {
        loadVideos();
    } else if (type === 'photo') {
        loadImages(currentCategory);
    }
});

// Update close modal to stop video
const originalCloseModal = closeBtn.onclick;
closeBtn.addEventListener('click', () => {
    modalVideo.pause();
    modalVideo.src = '';
    modalImg.style.display = 'block';
    modalVideo.style.display = 'none';
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modalVideo.pause();
        modalVideo.src = '';
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modal.style.display = 'none';
    }
});

// Update openModal to handle images
const originalOpenModal = openModal;
function openModal(image) {
    modal.style.display = 'block';
    modalVideo.style.display = 'none';
    modalImg.style.display = 'block';
    modalImg.src = image.urls.regular;
    modalTitle.textContent = image.alt_description;
    modalAuthor.textContent = `Photo by ${image.user.name}`;
    currentImageId = image.id;
    
    download4k.onclick = () => downloadImage(image.urls.full, `wallpaper-4k-${image.id}.jpg`);
    downloadHd.onclick = () => downloadImage(image.urls.regular, `wallpaper-hd-${image.id}.jpg`);
    
    const isFav = favorites.includes(image.id);
    favModalBtn.classList.toggle('active', isFav);
    favModalBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;
}
