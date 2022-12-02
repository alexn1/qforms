import {ReactComponent} from '../../../common';

export class DocumentView extends ReactComponent {
    static createCM(textarea, value) {
        // @ts-ignore
        const cm = CodeMirror.fromTextArea(textarea, {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        cm.setOption('theme', 'cobalt');
        cm.setValue(value);
        return cm;
    }
}