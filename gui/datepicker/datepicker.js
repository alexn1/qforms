document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');

    const now = new Date();
    now.setDate(1);
    now.setDate(2 - now.getDay());

    for (let i = 0; i < 42; i++) {
        console.log(now);
        now.setDate(now.getDate() + 1);
    }


});