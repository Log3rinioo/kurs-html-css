const logos = document.querySelectorAll('td img');
logos.forEach(el => {
    var alt = el.alt;
    var link = alt.substring(alt.lastIndexOf(' ') + 1, alt.length);
    
    el.parentElement.addEventListener('click', () => {
        window.open('https://' + link);
    })

    el.parentElement.nextElementSibling.addEventListener('click', () => {
        window.open('https://' + link);
    })
});

const tableRows = document.querySelectorAll('tbody tr');
const rowsCountEl = document.getElementById('entries');
const pages = document.querySelector('nav ul');
const pageChange = pages.querySelectorAll('li');
var currentPage = 1;
var data = localStorage.getItem('Piotr Winiarczyk');

if (!data) {
    data = {};
} else {
    data = JSON.parse(data);
}

rowsCountEl.addEventListener('change', () => {
    const rowsCount = rowsCountEl.value;
    data.rowsCount = rowsCount;
    localStorage.setItem('Piotr Winiarczyk', JSON.stringify(data));
    currentPage = 1;
    hideRows(rowsCount, currentPage);
});

if (data.rowsCount) {
    let rowsCount = data.rowsCount;
    rowsCountEl.value = rowsCount;
    hideRows(rowsCount, currentPage);
}

function hideRows(rowsCount, page) {
    if (rowsCount == 'all') {
        pages.classList.add('hide');
        rowsCount = tableRows.length;
    } else {
        pages.classList.remove('hide');
    }
    
    tableRows.forEach((el, index) => {
        if(index < rowsCount * page && index >= rowsCount * page - rowsCount) {
            tableRows[index].classList.remove('hide');
        } else {
            tableRows[index].classList.add('hide');
        }
    })

    changePage(page);
}

function changePage(index) {
    
    if (index == 1) {
        index = 2;
        pageChange[1].classList.add('selected');
        pageChange[2].classList.remove('selected');
    } else {
        pageChange[2].classList.add('selected');
        pageChange[1].classList.remove('selected');
    }
    pageChange[1].innerText = index - 1;
    pageChange[2].innerText = index;
    pageChange[3].innerText = index + 1;
    
    if (index + 1 >= tableRows.length / rowsCountEl.value + 1 || rowsCountEl.value == "10") {
        pageChange[3].classList.add('hide');
    } else {
        pageChange[3].classList.remove('hide');
    }
}

function clickRows(el) {
    let page = Number(el.innerText);
    if (page >= 1 && page < tableRows.length / rowsCountEl.value + 1) {
        currentPage = page;
        hideRows(rowsCountEl.value, currentPage);
    }
}

function clickRows2(el) {
    if (el == 'back' && currentPage > 1) {
        currentPage--;
    }
    if (el == 'next' && currentPage < tableRows.length / rowsCountEl.value) {
        currentPage++;
    }
    hideRows(rowsCountEl.value, currentPage);
}

if (document.body.classList.contains('dark')) {
    document.getElementById('wikipedia').src = 'img/wikipedia-dark.png';
}