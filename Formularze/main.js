const loginText = document.querySelector('#login span span')
const signupText = document.querySelector('#signup span span')

const loginField = document.querySelector('#login')
const signupField = document.querySelector('#signup')

const loginRequired = document.querySelectorAll('#login input[required]')
const signupRequired = document.querySelectorAll('#signup input[required]')

// Przełączanie między logowaniem a rejestracją
signupField.style.display = 'none'
signupRequired.forEach((e) => {
    e.removeAttribute('required')
})

loginText.addEventListener('click', () => {
    loginField.style.display = 'none'
    signupField.style.display = 'grid'
    loginRequired.forEach((e) => {
        e.removeAttribute('required')
    })
    signupRequired.forEach((e) => {
        e.required = true
    })
    const inputs = document.querySelectorAll('input[name=one-time-code]')
    inputs.forEach(el => {
        el.required = false
    })
})

signupText.addEventListener('click', () => {
    loginField.style.display = 'grid'
    signupField.style.display = 'none'
    loginRequired.forEach((e) => {
        e.required = true
    })
    signupRequired.forEach((e) => {
        e.removeAttribute('required')
    })
    const inputs = document.querySelectorAll('input[name=one-time-code]')
    inputs.forEach(el => {
        el.required = false
    })
})

// Sprawdzanie danych przy rejestracji
function checkPassword(form) {
    if (loginField.style.display != 'none') {
        const loginCaptcha = form.loginCaptcha.value.toLowerCase()
        if (loginCaptcha == 'gpc147b5') {
            return true
        } else {
            alert('Wprowadź poprawnie tekst z obrazka')
        }
    } else {
        // Otwarte jest menu rejestracji
        const password1 = form.password1.value
        const password2 = form.password2.value

        if (password1 == password2) {
            const signupCaptcha = form.signupCaptcha.value.toLowerCase()
            if (signupCaptcha == 'gpc147b5') {
                return true
            } else {
                alert('Wprowadź poprawnie tekst z obrazka')
            }
        } else {
            alert('Hasła nie są takie same')
        }
    }
    return false
}

// Ustawianie daty w formularzu na dzisiejszą
const dataUrodzenia = document.querySelector('input[type=date]')
var today = new Date()
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
dataUrodzenia.value = today

// Ograniczenie długości numeru PESEL
document.getElementById('pesel').oninput = function() {
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11)
    }
}

// Ograniczenie długości numeru domu
document.getElementById('numerdomu').oninput = function() {
    if (this.value.length > 4) {
        this.value = this.value.slice(0,4)
    }
}

// Ograniczenie długości numeru lokalu
document.getElementById('numerlokalu').oninput = function() {
    if (this.value.length > 4) {
        this.value = this.value.slice(0,4)
    }
}

// Ograniczenie długości kodu pocztowego
document.getElementById('kod').oninput = function() {
    if (this.value.length > 6) {
        this.value = this.value.slice(0, 6)
    }
}

const forgotText = document.querySelector('p.forgot')
const forgot = document.querySelector('fieldset.forgot')
forgot.classList.replace('forgot', 'hide')
forgotText.addEventListener('click', () => {
    forgot.classList.toggle('hide')
    forgot.classList.toggle('forgot')
})


// Wybieranie koloru tekstu
// https://stackoverflow.com/a/35970186
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

// Wybieranie koloru tła
const backgroundColor = document.getElementById('backgroundColor')
const blue = '#708DFD'
const fieldsets = document.querySelectorAll('fieldset')
const footer = document.querySelector('footer')
const buttonsWrapper = document.querySelectorAll('.buttons-wrapper input, .buttons-wrapper button')

backgroundColor.addEventListener('input', () => {
    if (backgroundColor.value == '#ffffff') {
        document.body.removeAttribute('style')
        fieldsets.forEach(el => {
            el.style.borderColor = blue
        })
        footer.style.borderColor = blue
        document.querySelector('input[type=reset]').style.borderColor = blue
        document.querySelector('.buttons-wrapper button').style.borderColor = blue
        document.querySelector('input[type=submit]').style.color = '#ffffff'
        return
    }

    const invertedColor = invertColor(backgroundColor.value, ' ')
    const boxShadow = `${invertedColor}13 0px 10px 20px, ${invertedColor}17 0px 6px 6px`

    document.body.style.background = backgroundColor.value
    document.body.style.color = invertedColor
    fieldsets.forEach(el => {
        el.style.background = backgroundColor.value
        el.style.borderColor = invertedColor
        el.style.boxShadow = boxShadow
    })

    footer.style.background = backgroundColor.value
    footer.style.borderColor = invertedColor
    footer.style.color = invertedColor
    footer.style.boxShadow = boxShadow
    buttonsWrapper.forEach(el => {
        el.style.color = invertedColor
        el.style.boxShadow = boxShadow
        el.style.borderColor = invertedColor
    })

    document.querySelector('input[type=reset]').style.background = backgroundColor.value
    document.querySelector('.buttons-wrapper button').style.background = backgroundColor.value
})


// Drag and drop
// https://codepen.io/dcode-software/pen/xxwpLQo
const dropZone = document.querySelector('div.drop-zone')
const dropZoneInput = document.querySelector('div.drop-zone input[type=file]')

dropZone.addEventListener('click', () => {
    dropZoneInput.click()
})

dropZoneInput.addEventListener('change', el => {
    if (dropZoneInput.files.length) {
        updateThumbnail(dropZoneInput.files[0])
    }
})

dropZone.addEventListener('dragover', (el) => {
    el.preventDefault()
    dropZone.classList.add('drop-zone-drag')
})

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drop-zone-drag')
})

dropZone.addEventListener('dragend', () => {
    dropZone.classList.remove('drop-zone-drag')
})

dropZone.addEventListener('drop', (el) => {
    el.preventDefault()

    if (el.dataTransfer.files.length) {
        dropZoneInput.files = el.dataTransfer.files
        updateThumbnail(el.dataTransfer.files[0])
    }
    dropZone.classList.remove('drop-zone-drag')
})

function updateThumbnail(file) {
    let thumbnail = dropZone.querySelector('.drop-zone-thumb')

        if (dropZone.querySelector('span')) {
            dropZone.querySelector('span').remove()
        }

        if (!thumbnail) {
            thumbnail = document.createElement('div')
            thumbnail.classList.add('drop-zone-thumb')
            dropZone.appendChild(thumbnail)
        }

        thumbnail.dataset.label = file.name

        if (file.type.startsWith('image/')) {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                thumbnail.style.backgroundImage = `url('${reader.result}')`
            }
        } else {
            thumbnail.style.backgroundImage = null;
        }
}

// Zmiana placeholder'ów w pytaniach zabezpieczeń
const pytania = document.querySelectorAll('select[name^=pytanie]')
const odpowiedzi = document.querySelectorAll('input[name^=odpowiedz]')

pytania[0].addEventListener('change', () => {
    enable()
    const text = pytania[0].options[pytania[0].selectedIndex].text
    odpowiedzi[0].placeholder = text
    const option = pytania[1].options[pytania[0].selectedIndex]
    option.disabled = true
})

pytania[1].addEventListener('change', () => {
    enable()
    const text = pytania[1].options[pytania[1].selectedIndex].text
    odpowiedzi[1].placeholder = text
    const option = pytania[0].options[pytania[1].selectedIndex]
    option.disabled = true
})

function enable() {
    const options = pytania[0].options
    for (var i = 1; i < options.length; i++) {
        options[i].disabled = false
    }
    const options1 = pytania[1].options
    for (var i = 1; i < options1.length; i++) {
        options1[i].disabled = false
    }
}

// Wczytaj więcej zdjęć profilowych
const zdjecia = document.querySelectorAll('label[for^=zdjecie]')
const profileFieldset = document.querySelector('div.profile')
function resize() {
    zdjecia.forEach(el => {
        el.classList.remove('hide')
    })
    for (var i = 0; i < zdjecia.length; i++) {
        if (i > Math.round(profileFieldset.clientWidth / 200 - 1)) {
            zdjecia[i].classList.add('hide')
        }
    }
}

resize()
window.addEventListener('resize', () => {
    resize()
})

const load = document.querySelector('p.load')
load.addEventListener('click', () => {
    zdjecia.forEach(el => {
        el.classList.remove('hide')
    })
    load.classList.toggle('hide')
    unload.classList.toggle('hide')
})

const unload = document.querySelector('p.unload')
unload.addEventListener('click', () => {
    resize()
    load.classList.toggle('hide')
    unload.classList.toggle('hide')
})

// Załadowanie captchy
document.querySelectorAll('input[name=captcha]').forEach((el, index) => {
    el.addEventListener('click', () => {
        const captcha = document.getElementsByClassName('captcha2')[index]
        const inputs = document.querySelectorAll('input[name=one-time-code]')[index]
        captcha.classList.toggle('hide')
        if (captcha.classList.length > 1) {
            inputs.required = false
        } else {
            inputs.required = true
        }
    })
})