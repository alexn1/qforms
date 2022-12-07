import { IndexFrontHostApp } from './IndexFrontHostApp';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    new IndexFrontHostApp(data).init();
});
