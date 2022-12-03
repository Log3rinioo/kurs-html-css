const selected = sessionStorage.getItem("template")
const szablon = szablony[selected]
const form = document.querySelector('form')
const submit = document.querySelector('input[type=submit]')
const availableFonts = ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Nunito', 'Times New Roman', 'Trebuchet MS', 'Verdana']
const username = sessionStorage.getItem("username")

var styles = []

form.addEventListener('submit', (e) => {
    e.preventDefault() // Zablokowanie wysyłania formularza

    const textareas = document.querySelectorAll('textarea')
    const spans = document.querySelectorAll('span.memeText')
    const fonts = document.querySelectorAll('select[id^=font]')
    const textSize = document.querySelectorAll('input[id^=textSize]')
    const alignItems = document.querySelectorAll('select[id^=alignItems]')
    const justifyContent = document.querySelectorAll('select[id^=justifyContent]')
    const uppercase = document.querySelectorAll('input[id^=caps]')
    const bold = document.querySelectorAll('input[id^=bold]')
    const italic = document.querySelectorAll('input[id^=italic]')
    const color = document.querySelectorAll('input[id^=textColor]')

    spans.forEach((el, index) => {
        var style = styles[index]

        el.innerText = textareas[index].value // Wypisanie tekstu na memie
        
        availableFonts.forEach((font) => { // Usunięcie poprzednich czcionek
            el.classList.remove(font.split(" ").join(""))
        })

        el.classList.add(fonts[index].value) // Wybór czcionki dla danego tekstu

        style += ` font-size: ${textSize[index].value}px;` // Wybór wielkości tekstu
        
        if (username) {
            style += ` align-items: ${alignItems[index].value};` // Wyrównanie w pionie

            style += ` justify-content: ${justifyContent[index].value};` // Wyrównanie w poziomie

            if (uppercase[index].checked) {
                style += ` text-transform: uppercase;`
            }

            if (bold[index].checked) {
                style += ` font-weight: bold;`
            }

            if (italic[index].checked) {
                style += ` font-style: italic;`
            }

            if (justifyContent[index].value == 'flex-end') { style += ` text-align: right;`; }
            else if (justifyContent[index].value == 'center') { style += ` text-align: center;`; }
            else if (justifyContent[index].value == 'flex-start') { style += ` text-align: left;`; }


            style += ` color: ${color[index].value};`
        }
        el.setAttribute('style', style)
    })
})

document.querySelector('div.left h2').innerText = szablon.title // Pokazanie tytułu mema

for (var i = 0; i < szablon.text.length / 4; i++) {
    var textarea = document.createElement('textarea') // Utworzenie pól textarea do mema
    textarea.setAttribute('placeholder', 'Tekst #' + Number(i+1))
    textarea.setAttribute('id', 'memeTextArea' + i)
    textarea.setAttribute('class', 'memeTextArea')
    submit.before(textarea)

    var effects = document.createElement('button') // Utworzenie guzika Efekty
    effects.setAttribute('class', 'buttonEffects')
    effects.setAttribute('type', 'button')
    var effectsText = document.createElement('span')
    effectsText.innerText = 'Efekty dla tekstu ' + Number(i+1)
    effects.appendChild(effectsText)
    submit.before(effects)

    var effectsArea = document.createElement('div') // Utworzenie efektów dla danego tekstu
    effectsArea.setAttribute('id', 'textEffects' + i)
    effectsArea.setAttribute('class', 'effectsArea')
    submit.before(effectsArea)
    inputs(effectsArea, i)

    var hr = document.createElement('hr') // Utworzenie kreski oddzielającej teksty
    submit.before(hr)

    var span = document.createElement('span') // Utworzenie pól span na memie
    span.setAttribute('class', 'memeText')
    var style = `left: ${szablon.text[i*4]}%; top: ${szablon.text[i*4+1]}%; height: ${szablon.text[i*4+2]}%; width: ${szablon.text[i*4+3]}%;`
    if (szablon.rotate) {
        style += ` transform: rotate(${szablon.rotate[i]}deg);`
    }
    span.setAttribute('style', style)
    span.setAttribute('id', 'memeText' + i)
    document.querySelector('div.right div.meme').appendChild(span)

    styles.push(span.getAttribute('style')) // Zapisanie początkowych styli każdego spana
}

function inputs(effectsArea, number) {
    var fontsDiv = document.createElement('div') // Utworzenie div'a dla czcionek
    effectsArea.appendChild(fontsDiv)

    var fontsLabel = document.createElement('label') // Utworzenie labela dla czcionek
    fontsLabel.innerText = 'Wybierz czcionkę: '
    fontsLabel.setAttribute('for', 'font' + number)
    fontsDiv.appendChild(fontsLabel)

    var fonts = document.createElement('select')
    fonts.setAttribute('id', 'font' + number)
    fontsDiv.appendChild(fonts)
    selectOptions(fonts, availableFonts) // Wypisanie możliwych czcionek

    var textSizeDiv = document.createElement('div') // Utworzenie diva do wyboru rozmiaru czcionki
    effectsArea.appendChild(textSizeDiv)

    var textSizeLabel = document.createElement('label') // Label dla rozmiaru czcionki
    textSizeLabel.innerText = 'Rozmiar tekstu: '
    textSizeLabel.setAttribute('for', 'textSize' + number)
    textSizeDiv.appendChild(textSizeLabel)

    var textSize = document.createElement('input') // Utworzenie inputa dla rozmiaru czcionki
    textSize.setAttribute('type', 'number')
    textSize.setAttribute('id', 'textSize' + number)
    textSize.setAttribute('value', 16)
    textSize.oninput = function() {
        if (this.value > 100) { // Ograniczenie wielkości czcionki do 80
            this.value = 100
        }
        if (this.value < 0) {
            this.value = 0
        }
    }
    textSizeDiv.appendChild(textSize)
    
    if (!sessionStorage.getItem("username")) { // Zablokowanie następnych opcji na niezalogowanego użytkownika
        var login = document.createElement('div')
        login.classList.add('login')
        effectsArea.appendChild(login)

        var loginA = document.createElement('a')
        loginA.innerText = 'Zaloguj się, aby wyświetlić więcej efektów'
        loginA.setAttribute('href', 'login.html')
        login.appendChild(loginA)
        return
    }
    
    var alignItemsDiv = document.createElement('div') // Wyrównywanie tekstu pionowo
    effectsArea.appendChild(alignItemsDiv)

    var alignItemsLabel = document.createElement('label')
    alignItemsLabel.innerText = 'Wyrównanie tekstu w pionie:'
    alignItemsLabel.setAttribute('for', 'alignItems' + number)
    alignItemsDiv.appendChild(alignItemsLabel)

    var alignItems = document.createElement('select')
    alignItems.setAttribute('id', 'alignItems' + number)
    alignItemsDiv.appendChild(alignItems)

    const align = ['flex-start', 'center', 'flex-end']
    align.forEach((el, index) => {
        var option = document.createElement('option')
        option.setAttribute('value', el)
        if (index == 0) { option.innerText = 'do góry'}
        if (index == 1) { option.innerText = 'do środka'}
        if (index == 2) { option.innerText = 'do dołu'}
        alignItems.appendChild(option)
    })

    var justifyContentDiv = document.createElement('div') // Wyrównywanie tekstu poziomo
    effectsArea.appendChild(justifyContentDiv)

    var justifyContentLabel = document.createElement('label')
    justifyContentLabel.innerText = 'Wyrównanie tekstu w poziomie:'
    justifyContentLabel.setAttribute('for', 'justifyContent' + number)
    justifyContentDiv.appendChild(justifyContentLabel)

    var justifyContent = document.createElement('select')
    justifyContent.setAttribute('id', 'justifyContent' + number)
    justifyContentDiv.appendChild(justifyContent)

    const justify = ['flex-start', 'center', 'flex-end']
    justify.forEach((el, index) => {
        var option = document.createElement('option')
        option.setAttribute('value', el)
        if (index == 0) { option.innerText = 'do lewej'}
        if (index == 1) { option.innerText = 'do środka'}
        if (index == 2) { option.innerText = 'do prawej'}
        justifyContent.appendChild(option)
    })

    var effectsDiv = document.createElement('div') // Efekty Pogrubienie, kursywa itp
    effectsArea.appendChild(effectsDiv)

    var capsDiv = document.createElement('div') // Wielkie litery
    effectsDiv.appendChild(capsDiv)
    capsDiv.setAttribute('style', 'justify-content: flex-start;')
    var capsInput = document.createElement('input')
    capsInput.setAttribute('type', 'checkbox')
    capsInput.id = 'caps' + number
    capsDiv.appendChild(capsInput)
    var capsLabel = document.createElement('label')
    capsLabel.setAttribute('for', 'caps' + number)
    capsLabel.innerText = 'Wielkie litery'
    capsLabel.setAttribute('style', 'text-transform: uppercase;')
    capsDiv.appendChild(capsLabel)

    var boldDiv = document.createElement('div') // Czcionka pogrubiona
    effectsDiv.appendChild(boldDiv)
    boldDiv.setAttribute('style', 'justify-content: center;')
    var boldInput = document.createElement('input') 
    boldInput.setAttribute('type', 'checkbox')
    boldInput.id = 'bold' + number
    boldDiv.appendChild(boldInput)
    var boldLabel = document.createElement('label')
    boldLabel.setAttribute('for', 'bold' + number)
    boldLabel.innerText = 'Pogrubienie'
    boldLabel.setAttribute('style', 'font-weight: bold;')
    boldDiv.appendChild(boldLabel)

    var italicDiv = document.createElement('div') // Czcionka kursywa
    effectsDiv.appendChild(italicDiv)
    italicDiv.setAttribute('style', 'justify-content: flex-end;')
    var italicInput = document.createElement('input') 
    italicInput.setAttribute('type', 'checkbox')
    italicInput.id = 'italic' + number
    italicDiv.appendChild(italicInput)
    var italicLabel = document.createElement('label')
    italicLabel.setAttribute('for', 'italic' + number)
    italicLabel.innerText = 'Kursywa'
    italicLabel.setAttribute('style', 'font-style: italic;')
    italicDiv.appendChild(italicLabel)

    var colorDiv = document.createElement('div') // Kolor tekstu
    effectsArea.appendChild(colorDiv)

    var colorLabel = document.createElement('label')
    colorLabel.setAttribute('for', 'textColor' + number)
    colorLabel.innerText = 'Kolor tekstu'
    colorDiv.appendChild(colorLabel)
    
    var colorInput = document.createElement('input')
    colorInput.setAttribute('type', 'color')
    colorInput.id = 'textColor' + number
    colorDiv.appendChild(colorInput)
}

const img = document.querySelector('div.right img') // Wyświetlenie szablonu
img.setAttribute('src', szablon.img)
img.setAttribute('alt', 'Szablon ' + szablon.title)

const textareas = document.querySelectorAll('textarea.memeTextArea')
textareas.forEach((el, index) => { // Oznaczanie wybranego tekstu
    el.addEventListener('mouseover', () => { 
        document.querySelector(`#memeText${index}`).classList.add('memeTextHover')
    }) 
    el.addEventListener('mouseout', () => { 
        document.querySelector(`#memeText${index}`).classList.remove('memeTextHover')
    }) 
})

const effectButtons = document.querySelectorAll('button.buttonEffects')
effectButtons.forEach((el, index) => { // Wyświetlenie menu do wyglądu tekstu
    el.addEventListener('click', () => {
        document.getElementById('textEffects' + index).classList.toggle('effectsAreaShow')
    })
})

const modal = document.getElementById('modal') // Okienko do pobrania mema
function save() { // Zapisanie mema
    const old = modal.querySelector('canvas')
    if (old) {old.remove()}
    html2canvas(document.querySelector('div.meme')).then(canvas => {
        modal.append(canvas)
    })
    modal.showModal()
}
const closeModal = document.querySelector('button.closeModal') // Zamknięcie popupa
closeModal.addEventListener('click', () => {
    console.log('A')
    modal.close()
})

function selectOptions(select, options) {
    options.forEach(el => {
        var option = document.createElement('option')
        option.innerText = el
        option.setAttribute('value', el.split(" ").join(""))
        select.appendChild(option)
    })
}

if (username) { // sprawdzenie czy użytkownik jest zalogowany
    const profileEl = document.querySelector('a.logged')
        profileEl.style.display = 'flex'
        profileEl.children[0].innerText = `Witaj ${username}!`
        document.querySelector('a.login').style.display = 'none'
}

document.querySelector('div.dropdown span').addEventListener('click', (e) => { // Wylogowanie użytkownika
    sessionStorage.removeItem("username")
    location.href = 'index.html'
})