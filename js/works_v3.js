const textTrack = document.querySelector('.text-panel .track-inner');
const tileTracks = Array.from(document.querySelectorAll('.tile .track-inner'));
const tracks = [textTrack, ...tileTracks];
const prevBtn = document.querySelector('.nav-btn--prev');
const nextBtn = document.querySelector('.nav-btn--next');

const SLIDE_COUNT = textTrack.children.length;
const DURATION_MS = 850;

let current = 0;
let animating = false;

function mod(n, m) {
    return ((n % m) + m) % m;
}

function moveTo(index) {
    const x = `translate3d(-${index * 100}%, 0, 0)`;
    tracks.forEach((track) => {
        track.style.transform = x;
    });
}

function goTo(index) {
    if (animating || index === current) return;

    animating = true;
    tracks.forEach((t) => t.classList.add('is-animating'));
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    current = mod(index, SLIDE_COUNT);
    moveTo(current);

    window.setTimeout(() => {
        tracks.forEach((t) => t.classList.remove('is-animating'));
        animating = false;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }, DURATION_MS);
}

function next() {
    goTo(current + 1);
}

function prev() {
    goTo(current - 1);
}

prevBtn.addEventListener('click', () => {
    prev();
    resetAutoplay();
});

nextBtn.addEventListener('click', () => {
    next();
    resetAutoplay();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        next();
        resetAutoplay();
    }
    if (e.key === 'ArrowLeft') {
        prev();
        resetAutoplay();
    }
});

moveTo(0);

let autoplay = window.setInterval(next, 6000);

function resetAutoplay() {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(next, 6000);
}
