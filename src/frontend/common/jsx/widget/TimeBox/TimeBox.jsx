class TimeBox extends TextBox {
    onKeyPress = event => {
        console.log('TimeBox.onKeyPress', event.which);
        var mask = '99:99';
        //with (event) {
        event.stopPropagation()
        event.preventDefault()
        event.target.value = '12:'
        event.target.selectionStart = 0;
        event.target.selectionEnd = 0;
        /*
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
                onKeyDown={this.onKeyPress}
                style={{backgroundColor: 'rgba(0,0,0,0)'}}
            />
        );
    }
}
