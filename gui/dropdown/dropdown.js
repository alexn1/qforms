/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function onClick() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function onInputClick() {
    console.log('onInputClick');
    const dropdown2 = document.getElementById("dropdown2");
    console.log('dropdown2:', dropdown2);
    dropdown2.classList.toggle("show");
    console.log();
}

function onBlur() {
    console.log('onBlur');
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
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