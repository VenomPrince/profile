// Create subtle floating background elements
function createFloatingElements() {
    const bgAnimation = document.getElementById('bgAnimation');
    
    for (let i = 0; i < 50; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 4 + 's';
        bgAnimation.appendChild(element);
    }
}

// Real view counter
function updateViewCount() {
    const viewCountElement = document.getElementById('realViewCount');
    let count = localStorage.getItem('viewCount') ? parseInt(localStorage.getItem('viewCount')) : 607;
    
    // Simulate real views with random increments
    setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        viewCountElement.textContent = count;
        localStorage.setItem('viewCount', count);
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds
    
    viewCountElement.textContent = count;
}

// Black hole effect
function initBlackHole() {
    const secretButton = document.getElementById('secretButton');
    const blackHole = document.getElementById('blackHole');
    const oopsMessage = document.getElementById('oopsMessage');
    const mainContainer = document.getElementById('mainContainer');
    
    secretButton.addEventListener('click', function() {
        // Position black hole at click point
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        blackHole.style.left = centerX + 'px';
        blackHole.style.top = centerY + 'px';
        blackHole.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Start black hole animation
        setTimeout(() => {
            blackHole.classList.add('active');
        }, 100);
        
        // Suck in main content
        setTimeout(() => {
            mainContainer.style.opacity = '0';
            mainContainer.style.transform = 'scale(0)';
            mainContainer.style.transition = 'all 1s ease-in';
        }, 1500);
        
        // Show oops message
        setTimeout(() => {
            oopsMessage.classList.add('show');
        }, 2500);
        
        // Store black hole state
        localStorage.setItem('blackHoleActive', 'true');
    });
}

// Check if black hole was activated
function checkBlackHoleState() {
    if (localStorage.getItem('blackHoleActive') === 'true') {
        const blackHole = document.getElementById('blackHole');
        const oopsMessage = document.getElementById('oopsMessage');
        const mainContainer = document.getElementById('mainContainer');
        
        // Show black hole state immediately
        blackHole.classList.add('active');
        mainContainer.style.opacity = '0';
        mainContainer.style.transform = 'scale(0)';
        oopsMessage.classList.add('show');
    }
}

// Reset black hole on page reload (simulate normal behavior)
function resetBlackHole() {
    // Clear black hole state after a delay to simulate "normal" reload
    setTimeout(() => {
        localStorage.removeItem('blackHoleActive');
    }, 1000);
}

// Social icon tooltips
function initTooltips() {
    const socialIcons = document.querySelectorAll('.social-icon');
    const tooltip = document.getElementById('tooltip');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const name = this.getAttribute('data-name');
            tooltip.textContent = name;
            tooltip.classList.add('show');
            
            // Position tooltip relative to icon
            const rect = this.getBoundingClientRect();
            const containerRect = this.closest('.social-icons').getBoundingClientRect();
            
            tooltip.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
        });
        
        icon.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
}

// Add click interactions
function initClickInteractions() {
    document.querySelectorAll('.social-icon, .info-card, .add-discord-btn, .github-card').forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.96)';
            setTimeout(() => {
                this.style.transform = '';
            }, 120);
        });
    });
}

// Music Player Functionality
const musicPlaylist = [
    {
        title: "Lofi Study Beats",
        youtubeId: "jfKfPfyJRdk", // Replace with your YouTube video ID
        duration: 180 // Duration in seconds (3 minutes)
    },
    {
        title: "Chill Vibes",
        youtubeId: "5qap5aO4i9A", // Replace with your YouTube video ID  
        duration: 240 // Duration in seconds (4 minutes)
    },
    {
        title: "Night Thoughts",
        youtubeId: "DWcJFNfaw9c", // Replace with your YouTube video ID
        duration: 200 // Duration in seconds
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentTime = 0;
let audioInterval;

const musicTitle = document.getElementById('musicTitle');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

// Load current song
function loadSong() {
    const song = musicPlaylist[currentSongIndex];
    musicTitle.textContent = song.title;
    totalTimeDisplay.textContent = formatTime(song.duration);
    currentTime = 0;
    currentTimeDisplay.textContent = formatTime(currentTime);
    progressFill.style.width = '0%';
    
    // Here you would typically load the actual YouTube audio
    console.log(`Loading: https://www.youtube.com/watch?v=${song.youtubeId}`);
}

// Format time display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause functionality
function initMusicPlayer() {
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            this.innerHTML = '⏸️';
            // Start simulated playback
            audioInterval = setInterval(() => {
                const song = musicPlaylist[currentSongIndex];
                currentTime++;
                currentTimeDisplay.textContent = formatTime(currentTime);
                
                const progress = (currentTime / song.duration) * 100;
                progressFill.style.width = progress + '%';
                
                if (currentTime >= song.duration) {
                    nextSong();
                }
            }, 1000);
        } else {
            this.innerHTML = '⚡';
            clearInterval(audioInterval);
        }
    });

    // Previous song
    prevBtn.addEventListener('click', function() {
        currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : musicPlaylist.length - 1;
        loadSong();
        if (isPlaying) {
            clearInterval(audioInterval);
            playBtn.click();
        }
    });

    // Next song
    nextBtn.addEventListener('click', nextSong);

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % musicPlaylist.length;
        loadSong();
        if (isPlaying) {
            clearInterval(audioInterval);
            playBtn.click();
        }
    }

    // Progress bar click
    progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const song = musicPlaylist[currentSongIndex];
        
        currentTime = Math.floor(percent * song.duration);
        currentTimeDisplay.textContent = formatTime(currentTime);
        progressFill.style.width = (percent * 100) + '%';
    });

    // Initialize first song
    loadSong();
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    updateViewCount();
    checkBlackHoleState();
    resetBlackHole();
    initBlackHole();
    initTooltips();
    initClickInteractions();
    initMusicPlayer();
});