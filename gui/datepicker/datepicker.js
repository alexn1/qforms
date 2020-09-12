document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const now = new Date();

    // dropdownDatePicker1
    const dropdownDatePicker1 = new DropdownDatePicker(document.getElementById('dropdownDatePicker1'));
    dropdownDatePicker1.init();
    dropdownDatePicker1.datePicker.setMinDate([now.getFullYear(), now.getMonth(), now.getDate()]);

    // dropdownDatePicker2
    const dropdownDatePicker2 = new DropdownDatePicker(document.getElementById('dropdownDatePicker2'));
    dropdownDatePicker2.init();
    dropdownDatePicker2.datePicker.setMinDate([now.getFullYear(), now.getMonth(), now.getDate() + 1]);

    dropdownDatePicker1.onChange = (date) => {
        console.log('dropdownDatePicker1.onChange', date);
        dropdownDatePicker2.datePicker.setMinDate([date.getFullYear(), date.getMonth(), date.getDate() + 1]);
        if (dropdownDatePicker2.datePicker.isDateSelected()) {
            const secondDate = dropdownDatePicker2.datePicker.createSelectedDate();
            if (secondDate.getTime() < date.getTime()) {
                dropdownDatePicker2.clear();
            }
        }
    };


});



