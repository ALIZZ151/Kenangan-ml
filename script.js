/* ENHANCED PARTICLE BACKGROUND */
const c = document.getElementById("particles");
const ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 1 + 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, c.width, c.height);
    particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        
        if (p.y > c.height) {
            p.y = 0;
            p.x = Math.random() * c.width;
        }
        if (p.x > c.width || p.x < 0) {
            p.speedX = -p.speedX;
        }
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(76, 195, 255, ${p.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ENHANCED TYPING EFFECT */
const typedTextElement = document.getElementById('typed-text');
const textToType = "Tempat Kembali ke Masa-Masa Terindah Bersama Teman Lama";
let charIndex = 0;
let isDeleting = false;
let typingDelay = 80;
let erasingDelay = 40;
let newTextDelay = 2000;

function typeText() {
    const currentText = textToType.substring(0, charIndex);
    typedTextElement.textContent = currentText;
    typedTextElement.classList.toggle('blue-text', currentText.length % 2 === 0);
    
    if (!isDeleting && charIndex < textToType.length) {
        charIndex++;
        setTimeout(typeText, typingDelay);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeText, erasingDelay);
    } else if (!isDeleting && charIndex === textToType.length) {
        setTimeout(() => {
            isDeleting = true;
            typeText();
        }, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setTimeout(typeText, typingDelay + 500);
    }
}

/* ENHANCED SCROLL ANIMATIONS */
function checkScroll() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
            
            // Animate text blocks with staggered delay
            const textBlock = section.querySelector('.text-block');
            if (textBlock) {
                setTimeout(() => {
                    textBlock.style.opacity = '1';
                    textBlock.style.transform = 'translateX(0)';
                }, 200);
            }
        }
    });
}

/* ENHANCED MODAL FUNCTIONS */
function showMemories() {
    const modal = document.getElementById('memoryModal');
    modal.style.display = 'flex';
    playEnhancedSound();
    
    // Add floating animation to modal
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalAppear 0.6s ease-out, blueLight 3s ease-in-out infinite';
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('memoryModal');
    modal.style.display = 'none';
    playEnhancedSound();
}

/* ENHANCED LIGHTBOX */
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    lightbox.style.display = 'flex';
    playEnhancedSound();
    
    // Add scale animation
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1.05)';
    }, 100);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Add event listener for close lightbox button
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);

/* ENHANCED BACK TO TOP */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    checkScroll();
    
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
        setTimeout(() => {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        }, 50);
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (window.pageYOffset <= 300) {
                backToTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playEnhancedSound();
});

/* ENHANCED FAVORITE FUNCTIONALITY */
function toggleFavorite(button) {
    button.classList.toggle('active');
    
    // Add bounce animation
    button.style.transform = 'scale(1.3)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 300);
    
    button.textContent = button.classList.contains('active') ? '★' : '☆';
    
    const memoryId = button.getAttribute('data-memory');
    const isFavorite = button.classList.contains('active');
    
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('memoryFavorites') || '{}');
    favorites[memoryId] = isFavorite;
    localStorage.setItem('memoryFavorites', JSON.stringify(favorites));
    
    playEnhancedSound();
    
    // Add confetti effect for favorite
    if (isFavorite) {
        createConfetti(button);
    }
}

/* ENHANCED SOUND EFFECTS */
function playEnhancedSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}

// Alias for playClickSound
function playClickSound() {
    playEnhancedSound();
}

/* CONFETTI EFFECT */
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: #FFD700;
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            function animateConfetti() {
                posX += vx;
                posY += vy;
                vy += 0.1; // gravity
                opacity -= 0.02;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateConfetti);
                } else {
                    document.body.removeChild(confetti);
                }
            }
            
            animateConfetti();
        }, i * 100);
    }
}

/* ENHANCED SHARE FUNCTIONALITY */
function shareMemory(memoryTitle) {
    playEnhancedSound();
    
    // Add ripple effect to share button
    const shareBtn = event.target;
    shareBtn.style.animation = 'blueLight 0.6s ease-in-out';
    setTimeout(() => {
        shareBtn.style.animation = '';
    }, 600);
    
    if (navigator.share) {
        navigator.share({
            title: 'Kenangan Game Kita',
            text: `Lihat kenangan ${memoryTitle} di website kenangan game kita!`,
            url: window.location.href
        });
    } else {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Link berhasil disalin ke clipboard! 🎮\n\nBagikan link ini ke teman-teman: ' + shareUrl);
        });
    }
}

/* ENHANCED STATS ANIMATION */
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = isNaN(originalText) ? 0 : parseInt(originalText);
        
        if (!isNaN(target) && target > 0) {
            let current = 0;
            const increment = target / 20;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    stat.textContent = originalText;
                    // Add pulse animation when complete
                    stat.style.animation = 'blueLight 1s ease-in-out';
                    setTimeout(() => {
                        stat.style.animation = '';
                    }, 1000);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 40);
        }
    });
}

/* ENHANCED INITIALIZATION */
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
    checkScroll();
    
    // Initialize scroll animations
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check initial state
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                playEnhancedSound();
            }
        });
    });
    
    // Add hover effects to all interactive elements
    document.querySelectorAll('button, .img-card, .share-btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });
    
    // Load favorite states from localStorage
    const favorites = JSON.parse(localStorage.getItem('memoryFavorites') || '{}');
    Object.keys(favorites).forEach(memoryId => {
        const favoriteBtn = document.querySelector(`.favorite-btn[data-memory="${memoryId}"]`);
        if (favoriteBtn && favorites[memoryId]) {
            favoriteBtn.classList.add('active');
            favoriteBtn.textContent = '★';
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('memoryModal');
    const lightbox = document.getElementById('lightbox');
    
    if (event.target === modal) closeModal();
    if (event.target === lightbox) closeLightbox();
});