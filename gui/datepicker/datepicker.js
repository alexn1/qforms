document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const datePicker = new DatePicker(document.getElementById('datepicker1'));
    datePicker.setYearMonth();
});


function onClick(event) {
    const dropdownContent = event.target.parentElement.querySelector('.dropdown-content');
    if (dropdownContent) {
        dropdownContent.classList.toggle("show");
    }
}

function onBlur(event) {
    console.log('onBlur', event);
    const dropdownContent = event.target.parentElement.querySelector('.dropdown-content');
    if (dropdownContent && dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
    }
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
