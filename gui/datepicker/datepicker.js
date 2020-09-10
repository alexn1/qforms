document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const date = new Date(2020, 9, 23);
    date.setDate(1);                     // first day of month
    date.setDate(2 - date.getDay());     // first day of table
    const tds = document.querySelectorAll('td');
    for (let i = 0; i < 42; i++) {
        tds[i].innerText = date.getDate().toString();
        date.setDate(date.getDate() + 1);
    }
});
