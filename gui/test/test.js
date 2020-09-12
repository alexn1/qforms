document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');

    // Аналог $(document).ready(function(){
    // Если должен быть найден один элемент
    // if ((e = document.querySelector("#form_error_message_frontend + div > div:last-child label")) !== null) {
    //     e.classList.add('last'); // Аналог выборки и присвоения класса
    // }

    // Если элементов будет много
    // "#form_error_message_frontend + div > div:last-child label"

    const elements = document.querySelectorAll('.checkmark');
    console.log('elements:', elements);
    elements.forEach(e => {
        e.classList.add('last');
        /*e.onmouseover = () => {
            console.log('onmouseover');
        };*/
    });

    const box = document.querySelector('.box');
    box.onclick = () => {
        console.log('click');
    }
    box.onmousedown = () => {
        console.log('down');
    }
    box.onmouseup = () => {
        console.log('up');
    }

    const isoString = '2020-09-04T17:00:00.000Z';
    const date = new Date(isoString);
    console.log('date:', date);

    console.log('date.toString():', date.toString());
    console.log('JSON.stringify(date):', JSON.stringify(date));

});
