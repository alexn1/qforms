import { pConsole } from '../../pConsole';

export class ClipboardHelper {
    static async copyTextToClipboard(text: string) {
        pConsole.debug('Helper.copyTextToClipboard', text);
        if (!navigator.clipboard) {
            ClipboardHelper.fallbackCopyTextToClipboard(text);
            return;
        }
        await navigator.clipboard.writeText(text);
    }

    static fallbackCopyTextToClipboard(text: string) {
        // debug('ClipboardHelper.fallbackCopyTextToClipboard', text);
        const activeElement = document.activeElement;
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0'; // Avoid scrolling to bottom
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // @ts-ignore
        activeElement.focus();
    }
}
