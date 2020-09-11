document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const dropdownDatePicker1 = new DropdownDatePicker(document.getElementById('dropdownDatePicker1'));
    dropdownDatePicker1.init();

    const dropdownDatePicker2 = new DropdownDatePicker(document.getElementById('dropdownDatePicker2'));
    dropdownDatePicker2.init();
});



