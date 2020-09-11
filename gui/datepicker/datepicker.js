document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const datePicker = new DatePicker(document.getElementById('datepicker1'));
    datePicker.setYearMonth(/*2020, 10*/);
    datePicker.onDateSelected = (date) => {
        console.log('selected date:', date);
    };
});


function onClick(event) {
    const dropdownContent = event.target.parentElement.querySelector('table.DatePicker');
    console.log('dropdownContent:', dropdownContent);
    if (dropdownContent) {
        dropdownContent.classList.toggle("show");
    }
}

function onBlur(event) {
    console.log('onBlur', event);
    const dropdownContent = event.target.parentElement.querySelector('.DatePicker');
    if (dropdownContent && dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
    }
}

