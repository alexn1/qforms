const months = [
    'Январь', 'Февраль',
    'Март', 'Апрель', 'Май',
    'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь',
    'Декабрь'
];

function fillDatePicker(datepicker1, date) {
    console.log('fillDatePicker', date);
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const month = date.getMonth();
    const year = date.getFullYear();
    date.setDate(1);                     // first day of month
    date.setDate(2 - date.getDay());     // first day of table

    // caption
    const caption = datepicker1.querySelector('caption > div > span');
    caption.innerText = `${months[month]}, ${year}`;

    // tds
    const tds = datepicker1.querySelectorAll('td');
    for (let i = 0; i < 42; i++) {
        tds[i].innerText = date.getDate().toString();
        if (date.getMonth() !== month) {
            tds[i].classList.add('out');

        } else {
            tds[i].classList.remove('out');
        }
        if (date >= today) {
            tds[i].classList.add('selectable');
        } else {
            tds[i].classList.remove('selectable');
        }
        if (date.getTime() === today.getTime()) {
            tds[i].classList.add('today');
        } else {
            tds[i].classList.remove('today');
        }
        date.setDate(date.getDate() + 1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const datepicker1 = document.getElementById('datepicker1');
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    fillDatePicker(datepicker1, date);
});


function onClick() {
    document.getElementById("datepicker1").classList.toggle("show");
}

/*
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropinput')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}*/

function next() {
    console.log('next');
}

function prev() {
    console.log('next');
}

function onDatepickerClick(e) {
    console.log('onDatepickerClick', e);
}
