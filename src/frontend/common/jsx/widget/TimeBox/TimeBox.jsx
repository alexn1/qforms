class TimeBox extends TextBox {
    onKeyPress = event => {
        // console.log('TimeBox.onKeyPress', event.key, event.target.value);
        if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
            console.log('cancel', event.key);
            event.preventDefault();
        }
        /*if (event.target.value.length + 1 > 5) {
            event.preventDefault();
        }*/
    }
    formatValue(value) {
        let min = '';
        let sec = '';
        const pure = value.replace(':', '');
        switch (pure.length) {
            case 0: break;
            case 1:
                min = pure;
                break;
            case 2:
                min = pure;
                break;
            case 3:
                min = pure.substr(0, 2);
                sec = pure.substr(2, 1);
                break;
            case 4:
                min = pure.substr(0, 2);
                sec = pure.substr(2, 2);
                break;
        }
        return [
            min,
            ...(sec ? [sec] : [])
        ].join(':');
    }
    onChange = e => {
        // console.log('TimeBox.onChange', e.target.value);
        // const value = e.target.value.substr(0, 4);
        const target = e.target;
        const start = target.selectionStart;
        const end   = target.selectionEnd;

        if (target.value.length > 5) {
            return;
        }

        const inEnd = start === end && start === target.value.length;
        const value = this.formatValue(target.value);
        console.log('value:', value);

        // console.log('before:', target.selectionStart, target.selectionEnd);
        this.setState({value}, () => {
            // console.log('after:', target.selectionStart, target.selectionEnd);
            // console.log('inEnd:', inEnd);
            if (!inEnd) {
                target.selectionStart = start;
                target.selectionEnd = end;
            }
        });
        //this.setState({value: e.target.value});
    }
    onKeyDown = event => {
        console.log('TimeBox.onKeyDown', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.key);
        const mask = '00:00';
        if ([8, 46, 37, 39, 36, 35].includes(event.which)) return;
        if (event.which < 96 || event.which > 105) {
            console.log('cancel');
            event.stopPropagation();
            event.preventDefault();
        }

        if (event.target.value.length + 1 > mask.length) {
            event.stopPropagation();
            event.preventDefault();
        }

        /*event.target.value = '12:'
        event.target.selectionStart = 0;
        event.target.selectionEnd = 0;*/
        /*
        var mask = '99:99';
        with (event) {
        if (!event.charCode) return
        var c = String.fromCharCode(event.charCode)
        if (c.match(/\D/)) return
        // with (event.target) {
        var val = event.target.value.substring(0, event.target.selectionStart) + c + event.target.value.substr(event.target.selectionEnd)
        var pos = event.target.selectionStart + 1
        // }
        //}
        var nan = count(val, /\D/, pos) // nan va calcolato prima di eliminare i separatori
        val = val.replace(/\D/g,'')

        var mask = mask.match(/^(\D*)(.+9)(\D*)$/)
        if (!mask) return // meglio exception?
        if (val.length > count(mask[2], /9/)) return

        for (var txt='', im=0, iv=0; im<mask[2].length && iv<val.length; im+=1) {
            var c = mask[2].charAt(im)
            txt += c.match(/\D/) ? c : val.charAt(iv++)
        }

        // with (event.target) {
        event.target.value = mask[1] + txt + mask[3]
        event.target.selectionStart = event.target.selectionEnd = pos + (pos==1 ? mask[1].length : count(event.target.value, /\D/, pos) - nan)
        // }

        function count(str, c, e) {
            e = e || str.length
            for (var n=0, i=0; i<e; i+=1) if (str.charAt(i).match(c)) n+=1
            return n
        }*/
    }
    onKeyUp = event => {
        console.log('TimeBox.onKeyUp', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.target.value);
        event.stopPropagation();
        event.preventDefault();
    }
    render() {
        // console.log('TimeBox.render');
        return (
            <input
                ref={this.input}
                id={this.props.id}
                className={this.getClassName()}
                type="text"
                value={this.state.value}
                readOnly={this.props.readOnly}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                // onKeyDown={this.onKeyDown}
                // onKeyUp={this.onKeyUp}
                onKeyPress={this.onKeyPress}
            />
        );
    }
}
