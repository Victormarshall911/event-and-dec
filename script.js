/* ============================================
   ELEGANCE EVENTS & DÉCOR — INTERACTIONS
   ============================================ */

// ---- Google Drive Helper ----
// Convert Google Drive share link to direct image URL
// Input: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// Output: https://lh3.googleusercontent.com/d/FILE_ID
function driveUrl(url) {
    if (!url) return '';
    // Already a direct URL
    if (url.includes('lh3.googleusercontent.com')) return url;
    // Extract file ID from various Drive URL formats
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /id=([a-zA-Z0-9_-]+)/,
        /\/d\/([a-zA-Z0-9_-]+)/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    // If it's already a normal image URL, return as-is
    return url;
}

// ---- Google Drive Video Helper ----
// Convert Google Drive share link to embeddable preview URL for videos
function driveVideoUrl(url) {
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /id=([a-zA-Z0-9_-]+)/,
        /\/d\/([a-zA-Z0-9_-]+)/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
}

// ---- Gallery Data ----
// type: 'image' (default) or 'video'
// For Google Drive images & videos: just paste the share link
const galleryItems = [
    // --- Your Google Drive media ---
    {
        src: 'https://drive.google.com/file/d/1sNocQOvXsXSOh3zwIqe_2qkJ382rFPZv/view?usp=sharing',
        category: 'wedding',
        caption: 'Elegant Event Setup',
        type: 'image'
    },
    {
        src: 'https://drive.google.com/file/d/1zdvptcY3ko5fydNm-CxKdw5CdvWw31Om/view?usp=sharing',
        category: 'decor',
        caption: 'Beautiful Decoration',
        type: 'image'
    },
    {
        src: 'https://drive.google.com/file/d/1FfhPQFVh8leXYreFgrF5lcH5v1VYPUel/view?usp=sharing',
        category: 'birthday',
        caption: 'Celebration Setup',
        type: 'image'
    },
    {
        src: 'https://drive.google.com/file/d/1DMWhdAXYFLX_EgfVXHtcnyoRe4vKrBcm/view?usp=sharing',
        category: 'wedding',
        caption: 'Stunning Venue Design',
        type: 'image'
    },
    {
        src: 'https://drive.google.com/file/d/1LJpJz98Cf7GJ9jN_32oMgy9i528aF0uE/view?usp=sharing',
        category: 'corporate',
        caption: 'Event Décor Showcase',
        type: 'image'
    },
    {
        src: 'https://drive.google.com/file/d/1iw5jSaKALYjMLYs1ndHwROuuq0NQhijd/view?usp=sharing',
        category: 'decor',
        caption: 'Creative Decoration',
        type: 'image'
    },
    {
        src: 'https://drive.google.com/file/d/1rt6luIkII0-PKZI4scKhc-1WKHjendTq/view?usp=sharing',
        category: 'birthday',
        caption: 'Party Styling',
        type: 'image'
    },
    // --- Stock images ---
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
        category: 'wedding',
        caption: 'Elegant Wedding Reception',
        type: 'image'
    },
    {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
        category: 'wedding',
        caption: 'Romantic Garden Wedding',
        type: 'image'
    },
    {
        src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
        category: 'birthday',
        caption: 'Colorful Birthday Celebration',
        type: 'image'
    },
    {
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
        category: 'corporate',
        caption: 'Corporate Gala Evening',
        type: 'image'
    },
    {
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
        category: 'decor',
        caption: 'Luxury Living Room Décor',
        type: 'image'
    },
    {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
        category: 'wedding',
        caption: 'Grand Ballroom Setup',
        type: 'image'
    },
    {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
        category: 'corporate',
        caption: 'Product Launch Event',
        type: 'image'
    }
];

// ---- DOM Elements ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentLightboxIndex = 0;
let filteredItems = [...galleryItems];

// ---- Navbar Scroll ----
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Mobile Nav Toggle ----
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ---- Scroll Reveal (Intersection Observer) ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ---- Counter Animation ----
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.dataset.target;
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target;
        }
        requestAnimationFrame(update);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ---- Build Gallery ----
function buildGallery(items) {
    galleryGrid.innerHTML = '';
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `gallery-item`;
        div.dataset.category = item.category;
        const isVideo = item.type === 'video';
        if (isVideo) {
            div.innerHTML = `
              <iframe src="${driveVideoUrl(item.src)}" allowfullscreen allow="autoplay" style="width:100%;height:100%;border:none;pointer-events:none;"></iframe>
              <div class="gallery-overlay"><span><i class="fas fa-play-circle"></i> ${item.caption}</span></div>
              <div class="video-badge"><i class="fas fa-video"></i></div>
            `;
        } else {
            div.innerHTML = `
              <img src="${driveUrl(item.src)}" alt="${item.caption}" loading="lazy" />
              <div class="gallery-overlay"><span>${item.caption}</span></div>
            `;
        }
        div.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(div);

        // Stagger fade-in
        setTimeout(() => div.style.opacity = '1', index * 80);
    });
}

// Initial gallery build
buildGallery(galleryItems);

// ---- Gallery Filters ----
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        filteredItems = filter === 'all'
            ? [...galleryItems]
            : galleryItems.filter(item => item.category === filter);

        // Animate out
        const items = galleryGrid.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
        });

        setTimeout(() => buildGallery(filteredItems), 300);
    });
});

// ---- Lightbox ----
const lightboxContent = document.querySelector('.lightbox-content');

function openLightbox(index) {
    currentLightboxIndex = index;
    showLightboxItem(filteredItems[index]);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showLightboxItem(item) {
    const isVideo = item.type === 'video';
    // Remove any existing iframe
    const oldIframe = lightboxContent.querySelector('iframe');
    if (oldIframe) oldIframe.remove();

    if (isVideo) {
        lightboxImg.style.display = 'none';
        const iframe = document.createElement('iframe');
        iframe.src = driveVideoUrl(item.src);
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.style.cssText = 'width:80vw;height:70vh;max-width:900px;border:none;border-radius:8px;';
        lightboxContent.insertBefore(iframe, lightboxCaption);
    } else {
        lightboxImg.style.display = 'block';
        lightboxImg.src = driveUrl(item.src);
    }
    lightboxCaption.textContent = item.caption;
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Clean up video iframes
    const iframe = lightboxContent.querySelector('iframe');
    if (iframe) iframe.remove();
    lightboxImg.style.display = 'block';
}

function navigateLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + filteredItems.length) % filteredItems.length;
    const item = filteredItems[currentLightboxIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        showLightboxItem(item);
        lightboxImg.style.opacity = '1';
    }, 200);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ---- Testimonial Carousel ----
const track = document.getElementById('testimonialsTrack');
const dotsContainer = document.getElementById('testimonialDots');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
let currentSlide = 0;
let autoSlideInterval;

// Build dots
cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `testimonial-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    goToSlide((currentSlide + 1) % cards.length);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + cards.length) % cards.length);
}

if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();

// Pause on hover
const wrapper = document.querySelector('.testimonials-wrapper');
if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    wrapper.addEventListener('mouseleave', startAutoSlide);
}

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ---- Newsletter Form ----
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const btn = newsletterForm.querySelector('.newsletter-btn');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';
        input.placeholder = 'Subscribed!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
            input.placeholder = 'Your email';
        }, 3000);
    });
}

// ---- Lightbox Image Transition ----
lightboxImg.style.transition = 'opacity 0.2s ease';

// ---- Gallery Item Initial Styles ----
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
