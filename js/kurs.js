const levels = document.querySelectorAll('#levels div:not(.icon, .right)');
const levelsWrapper = document.getElementById('levels');
const lines = document.querySelectorAll('#levels svg');

// Wczytanie odblokowanych poziomów
var storage = localStorage.getItem('Piotr Winiarczyk');
var levelsData = JSON.parse(storage);
if (levelsData) {
    if (location.href.includes('Kurs%20HTML')) {
        var unlocked = levelsData.unlockedLevelsHTML;
    } else if (location.href.includes('Kurs%20CSS')) {
        var unlocked = levelsData.unlockedLevelsCSS;
    }
}
else {
    levelsData = {};
}

if (!unlocked) {
    if (location.href.includes('Kurs%20HTML')) {
        levelsData.unlockedLevelsHTML = 0;
    } else if (location.href.includes('Kurs%20CSS')) {
        levelsData.unlockedLevelsCSS = 0;
    }
    unlocked = 0;
}

const tasks = document.getElementById('tasks');
var currentLevel = undefined;
const sections = document.querySelectorAll('section[id^=level]');
levels.forEach((level, index) => {
    // Odblokowanie poziomów 
    levelUpdate();

    // Wczytanie poziomu po kliknięciu
    level.addEventListener('click', (el) => {
        tasks.classList.toggle('hide');
        document.getElementById('levels').classList.toggle('hide');
        document.getElementById('title').classList.toggle('hide');
        tasks.querySelector('div.back').classList.remove('hide')
        if (index > 0) {
            tasks.querySelector('h3').innerText = levels[index-1].querySelector('h4').innerText;
        } else {
            tasks.querySelector('div.back').classList.add('hide');
        }
        tasks.querySelector('h2').innerText = level.querySelector('h4').innerText;
        currentLevel = index;
        sections[index].classList.remove('hide');
        window.scrollTo(0,0);
    });
})

// Zaktualizowanie emotki przy poziomie
function levelUpdate() {
    levels.forEach((level, index) => {
        let icon = level.querySelector('i');
        if (index < unlocked) {
            icon.classList = 'fa-regular fa-circle-check fa-xl';
            icon.style.color = 'green';
        } else if (index > unlocked) {
            icon.classList = 'fa-solid fa-lock fa-xl';
            icon.style.color = 'grey';
        } else {
            icon.classList = 'fa-regular fa-circle-play fa-xl';
            icon.removeAttribute('color');
        }
    }); 
}

// Rysowanie kresek między poziomami
window.onresize = moveLines;
function moveLines() {
    lines.forEach((svg,index) => {
        if (index < lines.length) {
            if (index % 2) {
                var x1 = levels[index].offsetLeft;
                var x2 = levels[index+1].offsetLeft + levels[index+1].offsetWidth;
            } else {
                var x1 = levels[index].offsetLeft + levels[index].offsetWidth;
                var x2 = levels[index+1].offsetLeft;
            }
            var y1 = levels[index].offsetTop + levels[index].offsetHeight / 2;
            var y2 = levels[index+1].offsetTop + levels[index+1].offsetHeight / 2;

            let line = svg.querySelector('line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            if (index < unlocked - 1) {
                if (document.body.classList.contains('dark')) {
                    line.setAttribute('stroke', '#008000');
                } else {
                    line.setAttribute('stroke', 'rgb(0, 255, 0)');
                }
            } else if (index == unlocked - 1) {
                if (document.body.classList.contains('dark')) {
                    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.33');
                } else {
                    line.setAttribute('stroke', 'rgba(0, 0, 0, 0.4)');
                }
            } else {
                if (document.body.classList.contains('dark')) {
                    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.06');
                } else {
                    line.setAttribute('stroke', 'rgba(0, 0, 0, 0.12)');
                }
            }
        }
        svg.setAttribute('height', Number(document.body.scrollHeight * 1.1)  + "px");
    });
}
moveLines();

// Progress bar
window.onscroll = myFunction;
function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progress").style.width = scrolled + "%";
}

// Powrót do poprzedniego rozdziału
var back = tasks.querySelector('div.back');
back.addEventListener('click', (el) => {
    back.classList.remove('hide');
    if (currentLevel >= 2) {
        tasks.querySelector('h3').innerText = levels[currentLevel-2].querySelector('h4').innerText;
    } else {
        back.classList.add('hide');
    }
    tasks.querySelector('h2').innerText = levels[currentLevel-1].querySelector('h4').innerText;
    sections[currentLevel].classList.add('hide');
    currentLevel -= 1;
    sections[currentLevel].classList.remove('hide');
});

// Zamknięcie rozdziału
tasks.querySelector('i.close').addEventListener('click', () => {
    tasks.classList.toggle('hide');
    document.getElementById('levels').classList.toggle('hide');
    document.getElementById('title').classList.toggle('hide');
    sections[currentLevel].classList.add('hide');
    levelUpdate();
    moveLines();
});

// Ramki z kodem
const codeFrames = document.querySelectorAll('div.codeWrapper');
codeFrames.forEach((codeWrapper, index) => {
    let button = document.createElement('button');
    // button.innerText = 'Wypróbuj';
    button.innerHTML = '<span></span>\n<span></span>\n<span></span>\n<span></span> Wypróbuj';
    codeWrapper.appendChild(button);
    let code = codeWrapper.querySelector('div.code');

    button.onclick = function() {
        let iframe = codeWrapper.querySelector('iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
        }
        // iframe.innerHTML = codeWrapper.querySelector('span').innerText;
        
        code.appendChild(iframe);
        code.classList.add('grid');

        let codeSpan = codeWrapper.querySelector('span');
        let codeText = codeSpan.innerText.replace(/ /gi, '');

        iframe.contentDocument.head.innerHTML = codeText.substring(codeText.indexOf('<head>') + 6, codeText.indexOf('</head>'));
        iframe.contentDocument.body.innerHTML = codeText.substring(codeText.indexOf('<body>') + 6, codeText.indexOf('</body>'));
    }
});

// Działanie rodziałów
sections.forEach((section, index) => {
    let questionsNode = section.querySelectorAll('div.question');
    let questions = [].slice.call(questionsNode);
    let quizWrapper = section.querySelector('div.quiz');
    let questionCount = Number(quizWrapper.getAttribute('questions'));
    let quizVisible = section.querySelector('div.quizVisible');
    let completedWrapper = section.querySelector('div.completed');
    let buttonsWrapper = section.querySelector('div.buttons');
    let submit = buttonsWrapper.querySelector('button[type=submit]');
    let reset = section.querySelector('button[type=reset]');
    let nextButton = section.querySelector('div.completed button');

    for (let i = 0; i < questionCount; i++) {
        let random = Math.floor(Math.random() * questions.length);
        let randomQuestion = questions[random];
        quizVisible.insertBefore(randomQuestion, completedWrapper);
        questions.splice(random, 1);
    }

    questions = [].slice.call(quizVisible.querySelectorAll('div.question'));
    for (let i = 0; i < questions.length; i++) {
        let answers = [].slice.call(questions[i].querySelectorAll('input'));
        let labels = [].slice.call(questions[i].querySelectorAll('label'));
        let answersLength = answers.length
        for (let j = 0; j < answersLength; j++) {
            let wrapper = document.createElement('div');
            questions[i].appendChild(wrapper);

            let random = Math.floor(Math.random() * answers.length);
            wrapper.appendChild(answers[random]);
            wrapper.appendChild(labels[random]);
            answers.splice(random, 1);
            labels.splice(random, 1);

            let check = document.createElement('div');
            check.classList = 'check';
            wrapper.appendChild(check);
            
            let checkInside = document.createElement('div');
            checkInside.classList = 'checkInside';
            check.appendChild(checkInside);

            let icon = document.createElement('i');
            wrapper.appendChild(icon);
        }
    }

    reset.onclick = function () {
        let inputs = section.querySelectorAll('input');
        inputs.forEach(input => {
            input.checked = false;
        });
        section.querySelectorAll('i').forEach(icon => {
            if (icon.classList.contains('fa-check') || icon.classList.contains('fa-xmark')) {
                icon.classList = '';
            }
        });
    }

    submit.onclick = function () {
        let inputs = section.querySelectorAll('input');
        let score = 0;
        section.querySelectorAll('i').forEach(icon => {
            if (icon.classList.contains('fa-check') || icon.classList.contains('fa-xmark')) {
                icon.classList = '';
            }
        });
        inputs.forEach(input => {
            if (input.checked) {
                if (input.id.includes('Correct')) {
                    // Poprawna odpowiedź
                    input.parentElement.querySelector('i').classList = 'correct fa-solid fa-check fa-xl';
                    score++;
                } else {
                    // Błędna odpowiedź
                    input.parentElement.querySelector('i').classList = 'incorrect fa-solid fa-xmark fa-xl';
                }
            }
        })

        if (score == questionCount) {
            // Wszystkie odpowiedzi są poprawne
            section.querySelector('div.completed').classList.add('visible');
            buttonsWrapper.classList.remove('visible');
            if (currentLevel >= unlocked) {
                unlocked = currentLevel + 1;
                if (location.href.includes('Kurs%20HTML')) {
                    levelsData.unlockedLevelsHTML = unlocked;
                } else if (location.href.includes('Kurs%20CSS')) {
                    levelsData.unlockedLevelsCSS = unlocked;
                }
                localStorage.setItem('Piotr Winiarczyk', JSON.stringify(levelsData));
            }
        }
    }

    if (index == sections.length-1) {
        return;
    }

    nextButton.onclick = function () {
        tasks.querySelector('h3').innerText = levels[currentLevel].querySelector('h4').innerText;
        
        back.classList.remove('hide');
        sections[currentLevel].classList.add('hide');
        currentLevel++;
        tasks.querySelector('h2').innerText = levels[currentLevel].querySelector('h4').innerText;
        sections[currentLevel].classList.remove('hide');
        window.scrollTo(0, 0);
    }
});