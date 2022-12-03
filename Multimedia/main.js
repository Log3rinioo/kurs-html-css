const cards = document.querySelectorAll("div.card");
const main = document.querySelector("main");
const navBar = document.querySelector("nav");
const contentDiv = document.getElementById("content");
const navTabs = document.querySelectorAll("nav div.tab");

var selected;

cards.forEach((el, index) => {
    el.addEventListener("click", () => {
        selected = index;
        el.classList.add("active");
        setTimeout(() => {
            document.getElementById("backdrop").classList.add("active");
            setTimeout(() => {
                el.classList.remove("active");
                document.getElementById("backdrop").classList.remove("active");
                selectSection(index);
            }, 700);
        }, 600);
    });
});

const sections = document.querySelectorAll("#content section");
const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
    main.style.opacity = 1;
    main.classList.toggle("inactive");
    navBar.classList.toggle("inactive");
    contentDiv.classList.toggle("inactive");
    contentDiv.classList.toggle("active");

    sections.forEach((el) => {
        el.classList.add("inactive");
    });

    cards[selected].classList.add("inactive");

    setTimeout(() => {
        cards[selected].classList.remove("inactive");
    }, 1000);
});

navTabs.forEach((el, index) => {
    el.addEventListener("click", () => {
        selectSection(index);
    });
});

function selectSection(index) {
    navTabs.forEach((el) => {
        el.classList.remove("selected");
    });
    sections.forEach((el) => {
        el.classList.add("inactive");
    });

    main.style.opacity = 0;
    main.classList.add("inactive");
    navBar.classList.remove("inactive");
    contentDiv.classList.remove("inactive");
    contentDiv.classList.add("active");

    const selectedEl = sections[index];
    selectedEl.classList.remove("inactive");
    navTabs[index].classList.add("selected");
}

var data = localStorage.getItem('Piotr Winiarczyk');
if (!data) {
    data = {};
} else {
    data = JSON.parse(data);
}

var visitCount = Number(data.visitCount);
if (visitCount) {
    var audio = document.querySelectorAll("div.audio div");
    if (visitCount % 2 == 0) {
        audio[0].remove();
    } else {
        audio[3].remove();
    }
    data.visitCount = visitCount + 1;
} else {
    data.visitCount = 1;
    document.querySelector("div.audio div").remove();
}
localStorage.setItem('Piotr Winiarczyk', JSON.stringify(data));

// Pokaż kod
const codeButtons = document.querySelectorAll("button.code");
const codeDivs = document.querySelectorAll("div.code");

codeButtons.forEach((el, index) => {
    el.addEventListener("click", () => {
        const codeDivs = document.querySelectorAll("div.code, div.code-error");
        if ( codeDivs[index].style.height == "0px" || codeDivs[index].style.height == 0 ) {
            codeDivs[index].style.height =
            codeDivs[index].querySelector("span").scrollHeight + 110 + "px";
            if (Number(codeDivs[index].style.height.substring(0, 3)) < 130) { codeDivs[index].style.height = '130px'; }
            codeDivs[index].style.borderWidth = "7px";
            el.innerText = "Ukryj kod";
        } else {
            codeDivs[index].style.height = 0;
            codeDivs[index].style.borderWidth = 0;
            el.innerText = "Pokaż kod";
        }
    });
});

codeDivs.forEach((el) => {
    let code = el.parentElement.innerHTML;
    let text = 'odtwarzacza, aby dopasować go';
    if (code.includes("<iframe")) {
        var output = code.substring(
            code.indexOf("<iframe"),
            code.indexOf("</iframe>") + 9
        );
    } else if (code.includes("<video")) {
        var output = code.substring(
            code.indexOf("<video"),
            code.indexOf("</video>") + 8
        );
    } else if (code.includes("<audio")) {
        var output = code.substring(
            code.indexOf("<audio"),
            code.indexOf("</audio>") + 8
        );
    } else if (code.includes("<img")) {
        var output = code.substring(code.indexOf("<img"), code.indexOf('">') + 2);
        text = 'obrazka, aby dopasować go';
    }
    if (code.includes("www.google.com/maps/")) { text = 'mapy, aby dopasować ją'; }

    if (output && !el.querySelector('span').classList.contains('map')) {
        el.querySelector("span").innerText = 'Aby uzyskać identyczny efekt na Twojej stronie, należy wkleić poniższy kod.\n\n' + output + el.querySelector("span").innerText + '\n\nMożemy zmienić rozmiar ' + text + ' do reszty strony. W tym celu zmieniamy wartości: width="rozmiar w px" oraz height="rozmiar w px", które oznaczają odpowiednio szerokość i wysokość.';
    }
});

// Skopiuj kod
const copyButtons = document.querySelectorAll("div.code button");
copyButtons.forEach((el) => {
    el.addEventListener("click", () => {
        let codeEl = el.parentElement.querySelector("span");
        let code = codeEl.innerText;
        let output = "";
        if (code.includes("<iframe")) {
            output = code.substring(
                code.indexOf("<iframe"),
                code.indexOf("</iframe>") + 9
            );
            if (code.includes("<div")) {
                output += code.substring(code.indexOf("<div"), code.indexOf("</div>") + 6);
            }
        } else if (code.includes("<video")) {
            output = code.substring(
                code.indexOf("<video"),
                code.indexOf("</video>") + 8
            );
        } else if (code.includes("<audio")) {
            output = code.substring(
                code.indexOf("<audio"),
                code.indexOf("</audio>") + 8
            );
        } else if (code.includes("<img")) {
            output = code.substring(code.indexOf("<img"), code.indexOf('">') + 2);
        }
        if (codeEl.classList.contains('map')) { output =  el.parentElement.parentElement.querySelector('iframe').outerHTML; }

        navigator.clipboard.writeText(output);
        el.innerText = "Skopiowano!";
        setTimeout(() => {
            el.innerText = "Skopiuj kod";
        }, 3000);
    });
});

if (document.URL.includes('#kasprzak')) {
    setTimeout(() => {
        cards[5].click();
        setTimeout(() => {
            const kasprzak = document.querySelector('div.kasprzak');
            kasprzak.parentNode.scrollTop = kasprzak.offsetTop;
        }, 2000);
    } ,1000);
}