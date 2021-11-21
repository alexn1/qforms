class LoginView extends View {
    render() {
        return <div className={this.getCssClassNames()}>
            <form className={'login__form'} method={'post'}>
                <input type={'hidden'} name={'tzOffset'}/>
                <input type={'hidden'} name={'action'} value={'login'}/>
                <div className={'login__title'}>{this.getCtrl().getFrontHostApp().getData().domain}</div>

                <input className={'login__field'} name={'username'} placeholder={this.getCtrl().getText().login.username}
                       required={true}
                       autoFocus={true}
                       spellCheck={false}/>

            </form>
        </div>;
    }
}
