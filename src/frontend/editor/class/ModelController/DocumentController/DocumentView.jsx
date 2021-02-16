class DocumentView extends ReactComponent {
    static createCM(textarea, value) {
        const cm = CodeMirror.fromTextArea(textarea, {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        cm.setOption('theme', 'cobalt');
        cm.setValue(value);
        return cm;
    }
}