
// thumbnail gallery: swap main image
(function () {
    const thumbs = document.querySelectorAll('.thumb');
    const mainMedia = document.querySelector('.main-media');

    thumbs.forEach(t => {
        t.addEventListener('click', () => {
            const src = t.getAttribute('data-src');
            if (src && mainMedia) {
                mainMedia.innerHTML = `<img id="activeMedia" src="${src}" alt="ZENXONE view"/>`;
            }
        });
        t.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                t.click();
            }
        });
    });

    // 3D tilt for the visible main card
    const card = document.getElementById('card3d');
    let bounds = null;
    function updateBounds() {
        if (card) bounds = card.getBoundingClientRect();
    }
    updateBounds();
    window.addEventListener('resize', updateBounds);

    function applyTilt(x, y) {
        if (!bounds || !card) return;
        const px = (x - bounds.left) / bounds.width - 0.5;
        const py = (y - bounds.top) / bounds.height - 0.5;
        const rotY = px * 12;
        const rotX = -py * 8;
        card.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    }
    function resetTilt() {
        if (card) card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    }

    window.addEventListener('pointermove', (e) => {
        if (!bounds) return;
        if (e.clientX < bounds.left - 120 || e.clientX > bounds.right + 120) {
            resetTilt();
            return;
        }
        applyTilt(e.clientX, e.clientY);
    });
    window.addEventListener('pointerleave', resetTilt);
    window.addEventListener('touchstart', (e) => {
        const t = e.touches[0]; if (!t) return;
        applyTilt(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        const t = e.touches[0]; if (!t) return;
        applyTilt(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchend', resetTilt);
})();

// video play (both top + mobile) using same logic
(function () {
    const thumbs = document.querySelectorAll('.video-thumb');
    if (!thumbs.length) return;

    thumbs.forEach(thumb => {
        function loadVideo() {
            const videoUrl = thumb.getAttribute('data-video') || 'https://www.youtube.com/embed/iL_dkXYraXM';
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.paddingTop = '56.25%';
            wrapper.style.borderRadius = '12px';
            wrapper.style.overflow = 'hidden';
            wrapper.style.border = '1px solid rgba(148,163,184,0.6)';

            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = videoUrl + '?autoplay=1&rel=0';
            iframe.title = 'ZenXOne demo video';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.position = 'absolute';
            iframe.style.inset = '0';

            wrapper.appendChild(iframe);
            thumb.replaceWith(wrapper);
        }

        thumb.addEventListener('click', loadVideo);
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); loadVideo();
            }
        });
    });
})();

// testimonial slider
(function () {
    const track = document.getElementById('testiTrack');
    const cards = track ? Array.from(track.children) : [];
    const dotsContainer = document.getElementById('testiDots');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');
    if (!track || cards.length === 0 || !dotsContainer) return;

    let index = 0;

    // create dots
    cards.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.type = 'button';
        d.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
    });

    const dots = Array.from(dotsContainer.children);

    function update() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
        index = (i + cards.length) % cards.length;
        update();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

    // simple auto-rotate
    let auto = setInterval(() => goTo(index + 1), 8000);
    [track, prevBtn, nextBtn, dotsContainer].forEach(el => {
        if (!el) return;
        el.addEventListener('pointerdown', () => { clearInterval(auto); auto = null; }, { once: true });
    });

    window.addEventListener('resize', update);
    update();
})();

function scrollToDetails() {
    const el = document.getElementById('details');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}