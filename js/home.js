const navBar = document.getElementById('navWrapper');

// Zapisanie dostępnych stron do listy
const pages = [];
const navSpans = navBar.querySelectorAll('li.navbar span');
navSpans.forEach(el => {
    pages.push(el.innerText);
});

// Wyświetlenie wyszukiwarki
const searchButton = document.querySelectorAll('div.icon.search, div.icon.close');
searchButton.forEach(el => {
    el.addEventListener('click', () => {
        if (el.classList.contains('close')) { searchClose(); }
        document.getElementById('topLeft').classList.toggle('hide');
        document.getElementById('topRight').classList.toggle('hide');
        document.getElementById('searchBar').classList.toggle('hide');
        document.querySelector('input#search').focus();
    })
});

// Działanie wyszukiwarki
document.getElementById('search').addEventListener('keyup', (el) => {
    pages.forEach((page, index) => {
        const isVisible = page.toLowerCase().includes(el.target.value.toLowerCase());
        document.querySelectorAll('div#searchList ul li')[index].classList.toggle('hide', !isVisible);
        if (!el.target.value) {
            document.querySelectorAll('div#searchList ul li')[index].classList.add('hide');
        }
    });
});

// Zmiana podstrony
const iframe = document.querySelector('iframe');
const icon = document.querySelector('link[rel=icon]');
navSpans.forEach(el => {
    el.parentElement.addEventListener('click', () => {
        let Text = el.innerText
        if (Text == 'Formularze') {
            const expand = navBar.querySelector('div.expand');
            expand.classList.toggle('hidden');
            navBar.querySelector('li.navbar.expand button i').classList.toggle('rotated');
            expand.nextElementSibling.classList.toggle('after-expand');
            return;
        }

        document.title = Text + ' | Piotr Winiarczyk 3K';

        if (Text == 'Ankieta') { Text = 'Formularze'; }
        if (Text == 'Generator memów') { Text = 'Formularze 2'; }
        if (Text == 'Tabele, listy, łącza' ) { Text = 'Tabele, listy, lacza'; }
        if (Text == 'Strona główna') { Text = 'Strona glowna'; }
        iframe.src = Text + '/index.html';
        
        // Zmiana ikony strony
        icon.href = Text + '/favicon.ico';
    });
});

// Przełączenie na pełny ekran
const fullScreenButton = document.querySelector('div.icon.fullscreen');
fullScreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

// Otwieranie w nowym oknie
const popupButton = document.querySelector('div.icon.popup');
popupButton.addEventListener('click', () => {
    window.open(iframe.src, '_blank', 'status=yes,titlebar=yes,menubar=yes');
})

// Zmiana motywu strony
const colorSwitcher = document.querySelector('div.colorMode input');
var data = localStorage.getItem('Piotr Winiarczyk');

if (!data) {
    data = {};
} else {
    data = JSON.parse(data);
}
    
if (data.theme) {
    if (data.theme == 'dark') {
        document.documentElement.setAttribute('color-mode', 'dark');
        document.body.classList.add('dark');
        colorSwitcher.checked = true;
    } else {
        document.documentElement.setAttribute('color-mode', 'light');
    }
} else {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('color-mode', 'dark');
        data.theme = 'dark';
        colorSwitcher.checked = true;
    } else {
        document.documentElement.setAttribute('color-mode', 'light');
        data.theme = 'light';
    }
    localStorage.setItem('Piotr Winiarczyk', JSON.stringify(data));
}

colorSwitcher.addEventListener('click', () => {
    data = JSON.parse(localStorage.getItem('Piotr Winiarczyk'));
    if (colorSwitcher.checked) {
        document.documentElement.setAttribute('color-mode', 'dark');
        data.theme = 'dark';
    } else {
        document.documentElement.setAttribute('color-mode', 'light');
        data.theme = 'light';
    }
    localStorage.setItem('Piotr Winiarczyk', JSON.stringify(data));
    iframe.src = iframe.src;
});

// Działanie wyszukiwarki
const searchList = document.querySelector('#searchList ul');
pages.forEach(el => {
    let li = document.createElement('li');
    li.innerText = el;
    li.classList.add('hide');
    li.onclick = () => {
        text = el;

        if (text == 'Ankieta') { text = 'Formularze'; }
        if (text == 'Generator memów') { text = 'Formularze 2'; }
        if (text == 'Tabele, listy, łącza' ) { text = 'Tabele, listy, lacza'; }
        if (text == 'Strona główna') { text = 'Strona glowna'; }

        iframe.src = text + '/index.html';
        searchClose();
        document.querySelector('div.icon.close').click();
    };
    searchList.appendChild(li);
});

// Zresetowanie wyszukiwarki po zamknięciu
function searchClose() {
    document.querySelectorAll('#searchList ul li').forEach(el => {
        el.classList.add('hide');
    })
    document.getElementById('search').value = '';
}

let audio = new Audio('assets/notification.mp3');
let alertShown = false;
document.getElementById('topWrapper').addEventListener('mouseover', () => {
    if (!alertShown) {
        audio.play();
        alert('Jeżeli chcesz szybko coś znaleźć na stronie możesz skorzystać z wyszukiwarki. Oprócz tego dla swojej wygody możesz zmienić motyw strony na ciemny, a domyślnie został wybrany motyw systemowy.');
        alertShown = true;
    }
});

let navAlert = false;
navBar.addEventListener('mouseover', () => {
    if (!navAlert) {
        audio.play();
        alert('W każdej chwili możesz zmienić szerokość paska nawigacyjnego z lewej strony ekranu. Aby to uczynić najedź kursorem na szarą pionową kreskę między paskiem nawigacyjnym, a resztą strony, a następnie trzymając lewy przycisk myszy przeciągnij ją na bok.');
        navAlert = true;
    }
});