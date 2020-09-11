document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const datePicker = new DatePicker(document.getElementById('datepicker1'));
    datePicker.setYearMonth();
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
