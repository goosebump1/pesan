// main.js - dipindahkan dari <script> di index.html
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code from <script> tag in index.html...
    /* --- 1. CUSTOM CURSOR LOGIC --- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorCircle.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });
        const interactiveElements = document.querySelectorAll('a, button, .gallery-item, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorCircle.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorCircle.style.backgroundColor = 'transparent';
            });
        });
    }
    /* --- 2. SCROLL PROGRESS BAR --- */
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });
    /* --- 3. SCROLL REVEAL ANIMATION (Observer) --- */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach(el => revealObserver.observe(el));
    /* --- 4. NAVIGATION LOGIC --- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger-btn');
    const hamburgerIcon = hamburger.querySelector('i');
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if(sidebar.classList.contains('active')){
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    });
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    /* --- 5. PORTFOLIO FILTER --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                item.classList.remove('show');
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        void item.offsetWidth;
                        item.classList.add('show');
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
    galleryItems.forEach(item => item.classList.add('show'));
    /* --- 6. HERO PARALLAX --- */
    const heroGlass = document.getElementById('hero-glass');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if(scrollValue < window.innerHeight) {
            heroGlass.style.transform = `translateY(${scrollValue * 0.3}px)`;
        }
    });
    /* --- 7. ANIMATED STATS (About Section) --- */
    const statsSection = document.querySelector('#about');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;
    const statObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !started) {
            statNumbers.forEach(num => startCount(num));
            started = true;
        }
    });
    statObserver.observe(statsSection);
    function startCount(el) {
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCount = () => {
            current += increment;
            if(current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target + "+";
            }
        };
        updateCount();
    }
    /* --- 8. CONTACT FORM HANDLING --- */
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('notification');
    const submitBtn = contactForm.querySelector('button');
    const originalBtnText = submitBtn.innerHTML;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            toast.classList.add('active');
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
            console.log("Form submitted:", {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            });
        }, 2000);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Pilih elemen video dan container
    const video = document.querySelector('.video-bg');
    const heroContainer = document.querySelector('.hero-container');

    // Pastikan elemen ada sebelum menjalankan logika
    if (video && heroContainer) {
        
        // 1. Buat Elemen Kontrol secara dinamis
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'video-controls glass';
        
        controlsDiv.innerHTML = `
            <div class="control-btn" id="playPauseBtn" title="Play/Pause">
                <i class="fas fa-pause"></i>
            </div>
            
            <div class="divider"></div>
            
            <div class="volume-wrapper">
                <div class="control-btn" id="muteBtn" title="Mute/Unmute">
                    <i class="fas fa-volume-mute"></i>
                </div>
                <!-- Slider Volume -->
                <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0" aria-label="Volume">
            </div>
        `;

        // Masukkan kontrol ke dalam Hero Container (Posisi floating)
        heroContainer.appendChild(controlsDiv);

        // 2. Ambil Referensi Elemen Kontrol
        const playPauseBtn = document.getElementById('playPauseBtn');
        const muteBtn = document.getElementById('muteBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const iconPlayPause = playPauseBtn.querySelector('i');
        const iconMute = muteBtn.querySelector('i');

        // 3. Fungsi Helper untuk Update Icon
        const updatePlayIcon = () => {
            if (video.paused) {
                iconPlayPause.className = 'fas fa-play';
            } else {
                iconPlayPause.className = 'fas fa-pause';
            }
        };

        const updateMuteIcon = () => {
            if (video.muted || video.volume === 0) {
                iconMute.className = 'fas fa-volume-mute';
            } else {
                iconMute.className = 'fas fa-volume-up';
            }
        };

        // 4. Event Listeners

        // Tombol Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayIcon();
        });

        // Tombol Mute/Unmute
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            
            // Sinkronisasi slider jika di-mute manual
            volumeSlider.value = video.muted ? 0 : video.volume;
            updateMuteIcon();
        });

        // Slider Volume
        volumeSlider.addEventListener('input', (e) => {
            const vol = e.target.value;
            video.volume = vol;
            video.muted = (vol === 0); // Auto mute jika volume 0
            updateMuteIcon();
        });

        // Reset tombol saat video selesai
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play(); // Auto loop biasanya ada di HTML, tapi jika tidak, ini handle reset
            updatePlayIcon();
        });

        // Sinkronisasi awal (Video biasanya autoplay muted)
        if (video.muted) {
            volumeSlider.value = 0;
        } else {
            volumeSlider.value = video.volume;
        }
        updateMuteIcon();
    }
});
    // ... kode JS sebelumnya ...

    // 1. Navbar Parallax & Sticky Logic
    const navbar = document.getElementById('navbar');
    const appContainer = document.querySelector('.app-container');
    const body = document.body;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Tambahkan class ke container agar padding main-content menyesuaikan
            if(appContainer) appContainer.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            if(appContainer) appContainer.classList.remove('scrolled');
        }
    });

    // 2. Animasi Klik Kursor (Ripple/Shrink)
    const cursorCircle = document.querySelector('.cursor-circle');
    
    document.addEventListener('mousedown', () => {
        cursorCircle.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursorCircle.classList.remove('cursor-click');
    });

    // ... kode JS lainnya ...