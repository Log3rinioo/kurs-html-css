if (document.body.classList.contains('dark')) {
    document.querySelector('div#html img').src = 'img/html5-dark.svg';
    document.querySelector('div#css img').src = 'img/css3-dark.svg';
}

let audio = new Audio('../assets/notification.mp3');
const prace = document.querySelector('#gridWrapper h2')
const animated = document.querySelectorAll('div.grid div.text, div.grid img, video, div.card, video + span, alert');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.parentElement.id == 'grid' && !prace.classList.contains('seen')) {
                // Strona główna - moje prace
                // sessionStorage.setItem('notifications', 'prace');
                audio.play();
                alert('Aby dowiedzieć się więcej na temat moich prac najedź kursorem na wybrane zdjęcie. Jeżeli chcesz zobaczyć pełną wersję pracy, kliknij w\xA0obrazek.');
                prace.classList.add('seen');
            }
            entry.target.classList.add('visible');
        }
        // entry.target.classList.toggle('visible', entry.isIntersecting);
    })
}, {
    threshold: 0.8
});

animated.forEach(anim => {
    observer.observe(anim);
});