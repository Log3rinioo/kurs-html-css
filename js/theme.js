// Zmiana motywu strony
var data = localStorage.getItem('Piotr Winiarczyk');

if (data) {
    if (data.includes('\\')) {
        localStorage.removeItem('Piotr Winiarczyk');
    }
    theme = JSON.parse(data).theme;
    if (theme == 'dark') {
        document.documentElement.setAttribute('color-mode', 'dark');
        document.body.classList.add('dark');
    } else {
        document.documentElement.setAttribute('color-mode', 'light');
    }
} else {
    document.documentElement.setAttribute('color-mode', 'light');
}