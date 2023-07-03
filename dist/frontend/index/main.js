"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IndexFrontHostApp_1 = require("./IndexFrontHostApp");
document.addEventListener('DOMContentLoaded', () => {
    console.debug('DOMContentLoaded');
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    new IndexFrontHostApp_1.IndexFrontHostApp(data).init();
});
