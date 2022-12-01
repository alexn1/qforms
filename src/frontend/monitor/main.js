import {MonitorView} from './MonitorView/MonitorView';

document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    console.log('data:', data);
    Helper.createReactComponent(document.querySelector('.monitor__root'), MonitorView, {data});
});
