// DOM Elements
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const muteBtn = document.getElementById('mute-btn');
const volumeIcon = document.getElementById('volume-icon');

const progressArea = document.getElementById('progress-area');
const progressBar = document.getElementById('progress-bar');
const volumeArea = document.getElementById('volume-area');
const volumeBar = document.getElementById('volume-bar');

const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackAlbum = document.getElementById('track-album');
const trackLangBadge = document.getElementById('track-lang-badge');
const albumArt = document.getElementById('album-art');
const albumArtWrapper = document.getElementById('album-art-wrapper');

const miniArt = document.getElementById('mini-art');
const miniTitle = document.getElementById('mini-title');
const miniArtist = document.getElementById('mini-artist');

const playlistList = document.getElementById('playlist-list');
const langBtns = document.querySelectorAll('.lang-btn');
const canvas = document.getElementById('visualizer');
const particlesContainer = document.getElementById('particles-container');

const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const sidebar = document.querySelector('.sidebar');

// State
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: none, 1: all, 2: one
let isMuted = false;
let currentVolume = 1;
let currentTrackIndex = 0;
let isDraggingProgress = false;
let audio = new Audio();

// Realistic Playlist System with working demo MP3s
const allSongs = [
    // Hindi Hits
    {
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        album: "Aashiqui 2",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        lang: "hindi",
        badge: "Hindi Hit",
        color1: "#ff006e", color2: "#8338ec"
    },
    {
        title: "Chaleya",
        artist: "Arijit Singh, Shilpa Rao",
        album: "Jawan",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        lang: "hindi",
        badge: "Hindi Hit",
        color1: "#7b2cbf", color2: "#00f5d4"
    },
    {
        title: "Channa Mereya",
        artist: "Arijit Singh",
        album: "Ae Dil Hai Mushkil",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        lang: "hindi",
        badge: "Hindi Hit",
        color1: "#f72585", color2: "#4361ee"
    },
    {
        title: "Samjhawan",
        artist: "Arijit Singh, Shreya Ghoshal",
        album: "Humpty Sharma Ki Dulhania",
        cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4a4?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        lang: "hindi",
        badge: "Hindi Hit",
        color1: "#ff006e", color2: "#8338ec"
    },
    {
        title: "Kabira",
        artist: "Tochi Raina, Rekha Bhardwaj",
        album: "Yeh Jawaani Hai Deewani",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        lang: "hindi",
        badge: "Hindi Hit",
        color1: "#ffbe0b", color2: "#fb5607"
    },
    // Malayalam Hits
    {
        title: "Darshana",
        artist: "Hesham Abdul Wahab",
        album: "Hridayam",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        lang: "malayalam",
        badge: "Malayalam",
        color1: "#3a0ca3", color2: "#4cc9f0"
    },
    {
        title: "Kuthanthram",
        artist: "Sushin Shyam",
        album: "Manjummel Boys",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        lang: "malayalam",
        badge: "Malayalam",
        color1: "#f72585", color2: "#4361ee"
    },
    {
        title: "Aaradhike",
        artist: "Sooraj Santhosh",
        album: "Ambili",
        cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        lang: "malayalam",
        badge: "Malayalam",
        color1: "#06d6a0", color2: "#118ab2"
    },
    {
        title: "Nenjakame",
        artist: "Anwar Sadath",
        album: "Ambili",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        lang: "malayalam",
        badge: "Malayalam Hit",
        color1: "#7b2cbf", color2: "#00f5d4"
    },
    {
        title: "Welcome to Hyderabad",
        artist: "Sushin Shyam",
        album: "Premalu",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        lang: "malayalam",
        badge: "Malayalam Hit",
        color1: "#3a0ca3", color2: "#4cc9f0"
    },
    // Tamil Hits
    {
        title: "Arabic Kuthu",
        artist: "Anirudh Ravichander",
        album: "Beast",
        cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        lang: "tamil",
        badge: "Tamil Hit",
        color1: "#06d6a0", color2: "#118ab2"
    },
    {
        title: "Naa Ready",
        artist: "Thalapathy Vijay, Anirudh",
        album: "Leo",
        cover: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        lang: "tamil",
        badge: "Tamil Hit",
        color1: "#ffbe0b", color2: "#fb5607"
    },
    {
        title: "Rowdy Baby",
        artist: "Dhanush, Dhee",
        album: "Maari 2",
        cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        lang: "tamil",
        badge: "Tamil Hit",
        color1: "#ff006e", color2: "#8338ec"
    },
    {
        title: "Thalapathy Kacheri",
        artist: "Anirudh Ravichander",
        album: "Jana Nayagan",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        lang: "tamil",
        badge: "Tamil Hit",
        color1: "#f72585", color2: "#4361ee"
    },
    {
        title: "Hukum",
        artist: "Anirudh Ravichander",
        album: "Jailer",
        cover: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500&auto=format&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        lang: "tamil",
        badge: "Tamil Hit",
        color1: "#06d6a0", color2: "#118ab2"
    }
];

let songs = [...allSongs];

// Initialize Player
function init() {
    createParticles();
    loadTrack(currentTrackIndex);
    renderPlaylist();
    setupVisualizer();
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onTrackEnd);
    audio.addEventListener('loadedmetadata', () => {
        if (!isNaN(audio.duration)) {
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    });
    audio.addEventListener('seeked', () => {
        if (isPlaying) audio.play();
    });
}

function createParticles() {
    particlesContainer.innerHTML = '';
    for(let i=0; i<35; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = `${Math.random() * 100}%`;
        p.style.width = `${Math.random() * 4 + 2}px`;
        p.style.height = p.style.width;
        p.style.animationDuration = `${Math.random() * 15 + 10}s`;
        p.style.animationDelay = `${Math.random() * 10}s`;
        particlesContainer.appendChild(p);
    }
}

// Load Track with smooth blur/fade transitions
function loadTrack(index) {
    const song = songs[index];
    audio.src = song.src;
    
    // Animate text out
    const textElements = [trackTitle, trackArtist, trackAlbum, trackLangBadge];
    textElements.forEach(el => el.style.opacity = '0');
    
    setTimeout(() => {
        trackTitle.textContent = song.title;
        trackArtist.textContent = song.artist;
        trackAlbum.textContent = song.album;
        trackLangBadge.textContent = song.badge || 'Hits';
        
        miniTitle.textContent = song.title;
        miniArtist.textContent = song.artist;
        
        // Animate text in
        textElements.forEach(el => el.style.opacity = '1');
    }, 400);
    
    // Animate images
    albumArt.style.opacity = '0';
    miniArt.style.opacity = '0';
    
    setTimeout(() => {
        albumArt.src = song.cover;
        miniArt.src = song.cover;
        albumArt.style.opacity = '1';
        miniArt.style.opacity = '1';
    }, 400);

    // Update Theme Colors smoothly
    document.documentElement.style.setProperty('--primary-glow', song.color1);
    document.documentElement.style.setProperty('--secondary-glow', song.color2);
    
    updatePlaylistActiveState();
    
    if (isPlaying) {
        audio.play().catch(e => console.log('Autoplay prevented', e));
    }
}

// Play / Pause Logic
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
        albumArtWrapper.classList.remove('playing');
    } else {
        audio.play().catch(e => console.log('Autoplay prevented', e));
        playIcon.classList.replace('fa-play', 'fa-pause');
        albumArtWrapper.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Track Control
function nextTrack() {
    if (isShuffle) {
        let randomIndex = currentTrackIndex;
        while (randomIndex === currentTrackIndex && songs.length > 1) {
            randomIndex = Math.floor(Math.random() * songs.length);
        }
        currentTrackIndex = randomIndex;
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % songs.length;
    }
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
        loadTrack(currentTrackIndex);
    }
}

function onTrackEnd() {
    if (repeatMode === 2) { // Repeat one
        audio.currentTime = 0;
        audio.play();
    } else if (repeatMode === 1 || currentTrackIndex < songs.length - 1 || isShuffle) { // Repeat all or next
        nextTrack();
    } else { // Stop
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        albumArtWrapper.classList.remove('playing');
        audio.currentTime = 0;
    }
}

// Progress Bar Updates
function updateProgress(e) {
    if (isDraggingProgress) return;
    
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

function handleProgressDrag(e) {
    const width = progressArea.clientWidth;
    const rect = progressArea.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    
    if (clickX < 0) clickX = 0;
    if (clickX > width) clickX = width;
    
    const progressPercent = (clickX / width) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    const duration = audio.duration;
    if (!isNaN(duration)) {
        const newTime = (clickX / width) * duration;
        currentTimeEl.textContent = formatTime(newTime);
        return newTime;
    }
    return null;
}

// Volume Controls
function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    currentVolume = Math.max(0, Math.min(1, clickX / width));
    
    audio.volume = currentVolume;
    volumeBar.style.width = `${currentVolume * 100}%`;
    
    isMuted = currentVolume === 0;
    updateVolumeIcon();
}

function toggleMute() {
    if (isMuted) {
        audio.volume = currentVolume > 0 ? currentVolume : 1;
        volumeBar.style.width = `${audio.volume * 100}%`;
        isMuted = false;
    } else {
        audio.volume = 0;
        volumeBar.style.width = '0%';
        isMuted = true;
    }
    updateVolumeIcon();
}

function updateVolumeIcon() {
    volumeIcon.className = '';
    if (isMuted || audio.volume === 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
    } else if (audio.volume < 0.5) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    } else {
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Render Interactive Playlist
function renderPlaylist() {
    playlistList.innerHTML = '';
    songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
        div.innerHTML = `
            <img src="${song.cover}" alt="cover" class="playlist-item-img">
            <div class="playlist-item-info">
                <span class="playlist-item-title">${song.title}</span>
                <span class="playlist-item-artist">${song.artist}</span>
            </div>
            <span class="playlist-item-duration"><i class="fa-solid fa-play"></i></span>
        `;
        div.addEventListener('click', () => {
            if (currentTrackIndex === index && isPlaying) {
                togglePlay();
            } else {
                currentTrackIndex = index;
                const wasPlaying = isPlaying;
                isPlaying = true;
                playIcon.classList.replace('fa-play', 'fa-pause');
                albumArtWrapper.classList.add('playing');
                loadTrack(currentTrackIndex);
            }
        });
        playlistList.appendChild(div);
    });
}

function updatePlaylistActiveState() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentTrackIndex) {
            item.classList.add('active');
            // Auto scroll to active item
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

// Language/Category Filtering
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const selectedLang = btn.getAttribute('data-lang');
        
        if (selectedLang === 'all') {
            songs = [...allSongs];
        } else {
            songs = allSongs.filter(song => song.lang === selectedLang);
        }
        
        currentTrackIndex = 0;
        const wasPlaying = isPlaying;
        
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            albumArtWrapper.classList.remove('playing');
        }
        
        loadTrack(currentTrackIndex);
        renderPlaylist();
        
        if (wasPlaying) {
            isPlaying = true;
            albumArtWrapper.classList.add('playing');
            audio.play();
        }
        
        if(window.innerWidth <= 992) {
            sidebar.classList.remove('active');
        }
    });
});

// Controls Listeners
playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Progress Bar Drag & Click Logic
progressArea.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    handleProgressDrag(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) {
        handleProgressDrag(e);
    }
});

document.addEventListener('mouseup', (e) => {
    if (isDraggingProgress) {
        isDraggingProgress = false;
        const newTime = handleProgressDrag(e);
        if (newTime !== null) {
            audio.currentTime = newTime;
        }
    }
});

progressArea.addEventListener('click', (e) => {
    if (!isDraggingProgress) {
        const newTime = handleProgressDrag(e);
        if (newTime !== null) {
            audio.currentTime = newTime;
        }
    }
});

volumeArea.addEventListener('click', setVolume);
muteBtn.addEventListener('click', toggleMute);

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});

repeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    if (repeatMode === 0) {
        repeatBtn.classList.remove('active');
        repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    } else if (repeatMode === 1) {
        repeatBtn.classList.add('active');
        repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    } else {
        repeatBtn.classList.add('active');
        repeatBtn.innerHTML = '<i class="fa-solid fa-repeat-1"></i>';
    }
});

mobileNavToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight') {
        nextTrack();
    } else if (e.code === 'ArrowLeft') {
        prevTrack();
    }
});

// Dynamic Cinematic Visualizer
function setupVisualizer() {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    let time = 0;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const color1 = getComputedStyle(document.documentElement).getPropertyValue('--primary-glow').trim() || '#7b2cbf';
        const color2 = getComputedStyle(document.documentElement).getPropertyValue('--secondary-glow').trim() || '#00f5d4';
        
        if (isPlaying) {
            const barWidth = 10;
            const barGap = 6;
            const totalBars = Math.floor(canvas.width / (barWidth + barGap));
            
            const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 20;
            ctx.shadowColor = color2;
            
            for(let i = 0; i < totalBars; i++) {
                // Smooth wave + dynamic audio levels
                const noise = Math.sin(time + i * 0.15) * 0.5 + 0.5;
                const noise2 = Math.cos(time * 0.8 + i * 0.1) * 0.5 + 0.5;
                const audioLevel = audio.volume * (0.3 + Math.random() * 0.7);
                
                const height = 15 + (canvas.height * 0.4) * ((noise + noise2) / 2) * audioLevel;
                const x = i * (barWidth + barGap);
                const y = canvas.height - height;
                
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth, height, [6, 6, 0, 0]);
                ctx.fill();
            }
            time += 0.15;
        } else {
            ctx.shadowBlur = 0;
        }
        
        requestAnimationFrame(draw);
    }
    draw();
}

init();
