document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const username = document.querySelector('input[name=username]').value
    const password = document.querySelectorAll('input[type=password]')[0].value
    const repeatPassword = document.querySelectorAll('input[type=password')[1].value

    if (password == repeatPassword) {
        var users = JSON.parse(sessionStorage.getItem("users"))
        
        if (!users) {
            users = []
        }
        var user = {}
        
        repeat = false
        users.forEach(el => {
            if (el.username == username) {
                alert('Nazwa użytkownika jest już zajęta')
                repeat = true
            }
        })

        if (users.length < 1 || repeat == false) {
            user.username = username
            user.password = password

            users.push(user)
            sessionStorage.setItem("users", JSON.stringify(users))
            location.href = 'login.html'
        }

    } else {
        alert('Hasła nie są takie same')
    }
})