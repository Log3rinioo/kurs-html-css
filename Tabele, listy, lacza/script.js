// Skrypt do przenoszenia z rozwijanej listy
function redirect() {
    var selected = document.getElementById('select-id2').value;
    // window.location.href = selected;
    if (selected !== "") {
        window.open(selected, "_blank");
    }
}



// Skrypt odpowiadający za sortowanie tabeli
// Niestety nie udało mi się sprawić, żeby działał ze względu na scalanie komórek
// Źródło: https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
// const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

// const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
//     v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
//     )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// document.querySelectorAll('.sort').forEach(th => th.addEventListener('click', (() => {
//     const table = th.closest('table');
//     Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
//         .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
//         .forEach(tr => table.appendChild(tr) );
// })));