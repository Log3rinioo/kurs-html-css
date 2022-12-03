const nextButton = document.getElementById('rightButton');
const prevButton = document.getElementById('leftButton');
var ciekawostki = document.querySelectorAll('ul li.hidden');
const count = ciekawostki.length;

ciekawostki = Array.from(ciekawostki);
var losCiekawostki = new Array;

for (let i = 0; i < count; i++) {
    var number = random(0, ciekawostki.length);
    losCiekawostki.push(ciekawostki[number]);
    ciekawostki.splice(number, 1);
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

var slide = 0;
losCiekawostki[slide].classList.remove('hidden');

nextButton.addEventListener('click', () => {
    if (slide < count-1) {
        losCiekawostki[slide].classList.add('hiddenLeft');
        slide++;
        losCiekawostki[slide].classList.remove('hidden');
    }
});

prevButton.addEventListener('click', () => {
    if (slide > 0) {
        losCiekawostki[slide].classList.add('hidden');
        slide--;
        losCiekawostki[slide].classList.remove('hiddenLeft');
    }
})


const animated = document.querySelectorAll('table span, table img');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
        // entry.target.classList.toggle('visible', entry.isIntersecting);
    })
}, {
    threshold: 0.9
});

animated.forEach(anim => {
    observer.observe(anim);
});

