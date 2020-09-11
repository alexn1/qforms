document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const datePicker = new DatePicker(document.getElementById('datepicker1'));
    const now = new Date();
    datePicker.setYearMonth(now.getFullYear(), now.getMonth());
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
