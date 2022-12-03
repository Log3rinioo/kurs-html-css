document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    if (!sessionStorage.getItem("username")) {
        const username = document.querySelector('input[name=username]').value
        const password = document.querySelector('input[type=password]').value

        const users = JSON.parse(sessionStorage.getItem("users"))

        if (users) {
            console.log('a')
            users.forEach(el => {
                if (el.username == username && el.password == password) {
                    sessionStorage.setItem("username", username)
                    if (sessionStorage.getItem("template")) {
                        location.href = 'generator.html'
                    } else {
                        location.href = 'index.html'
                    }
                }
            })
        }

        if (!sessionStorage.getItem("username")) {
            alert('Nie znaleziono takiego użytkownika')
            const lightning = document.querySelectorAll('div.lightning')
            lightning.forEach(el => {
                el.classList.add('wrong')
            })
        }
    }
})

if (sessionStorage.getItem("username")) {
    location.href = 'index.html'
}