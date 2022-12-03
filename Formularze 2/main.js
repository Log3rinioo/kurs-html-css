window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

const arrowWrapper = document.querySelector('div.arrow')
arrowWrapper.addEventListener('click', () => { // Przesunięcie strony po kliknięciu w strzałkę
    window.scrollTo({top: window.innerHeight, left: 0, behavior: 'smooth'})
})

// Ominięcie animacji
var url = window.location.pathname;
url = url.substring(url.lastIndexOf('/') + 1, url.length);
if(sessionStorage.getItem('oobe') == 'false') {
    if (url == 'index.html') {
        window.location.href = 'index2.html';
    } else if (url == 'index2.html') {
        document.querySelector('.loader-wrapper').style.display = 'none';
        document.body.style.overflowY = 'scroll';
    }
}
sessionStorage.setItem('oobe', false);

const loader = document.querySelector('.loader-wrapper')
setTimeout(() => { // Ukrycie animacji ładowania po 2,5 sekundy
    loader.style.display = 'none'
    document.body.style.overflowY = 'scroll'
}, 2500)

var username = sessionStorage.getItem("username") // sprawdzenie czy użytkownik jest zalogowany
if (username) {
    const profileEl = document.querySelector('a.logged')
        profileEl.style.display = 'flex'
        profileEl.children[0].innerText = `Witaj ${username}!`
        document.querySelector('a.login').style.display = 'none'
}

document.querySelector('div.dropdown span').addEventListener('click', (e) => { // Wylogowanie użytkownika
    sessionStorage.removeItem("username")
    location.href = 'index.html'
})


const templatesEl = document.querySelector('div.templates') // Wyświetlenie wszystkich szablonów
szablony.forEach((el, index) => {
    var div = document.createElement('div')

    var title = document.createElement('span')
    title.innerText = szablony[index].title
    div.appendChild(title)

    var img = document.createElement('img')
    img.setAttribute("src", szablony[index].img)
    div.appendChild(img)

    templatesEl.appendChild(div)

    div.addEventListener('click', () => {
        sessionStorage.setItem("template", index)
        location.href = 'generator.html'
    })
})

const searchBar = document.getElementById('searchBar')
searchBar.addEventListener('keyup', (e) => {
    szablony.forEach((szablon, index) => {
        const isVisible = szablon.title.toLowerCase().includes(e.target.value)
        document.querySelectorAll('div.templates div')[index].classList.toggle('hide', !isVisible)
    })
})