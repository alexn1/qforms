import { MonitorView } from './MonitorView/MonitorView';
import { ReactHelper } from '../common';
import './style/monitor.less';

document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(
        document.querySelector('script[type="application/json"]')!.textContent!,
    );
    console.debug('data:', data);
    ReactHelper.createReactComponent(document.querySelector('.monitor__root')!, MonitorView, {
        data,
    });
});
