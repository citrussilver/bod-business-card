const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.querySelector('.nav-btn--prev');
const nextBtn = document.querySelector('.nav-btn--next');

let current = 0;
let animating = false;
const DURATION_MS = 750;

function mod(n, m) {
    return ((n % m) + m) % m;
}

function clearMotionClasses(slide) {
    slide.classList.remove(
        'is-exiting',
        'is-entering-next',
        'is-entering-prev',
        'is-exit-next',
        'is-exit-prev'
    );
}

function goTo(index, direction) {
    if (animating || index === current) return;

    animating = true;
    const outgoing = slides[current];
    const incoming = slides[index];
    const goingNext = direction === 'next';

    clearMotionClasses(outgoing);
    clearMotionClasses(incoming);

    incoming.classList.add(goingNext ? 'is-entering-next' : 'is-entering-prev');
    incoming.classList.add('is-active');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            outgoing.classList.add('is-exiting', goingNext ? 'is-exit-next' : 'is-exit-prev');
            incoming.classList.remove('is-entering-next', 'is-entering-prev');
        });
    });

    window.setTimeout(() => {
        outgoing.classList.remove('is-active', 'is-exiting', 'is-exit-next', 'is-exit-prev');
        clearMotionClasses(incoming);
        current = index;
        animating = false;
    }, DURATION_MS);
}

function next() {
    goTo(mod(current + 1, slides.length), 'next');
}

function prev() {
    goTo(mod(current - 1, slides.length), 'prev');
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
});

let autoplay = window.setInterval(next, 5000);

function resetAutoplay() {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(next, 5000);
}

prevBtn.addEventListener('click', resetAutoplay);
nextBtn.addEventListener('click', resetAutoplay);
