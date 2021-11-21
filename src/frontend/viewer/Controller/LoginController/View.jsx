class LoginView extends View {
    render() {
        return <div className={this.getCssClassNames()}>
            <form className={'login__form'} method={'post'}>
                <input type={'hidden'} name={'tzOffset'}/>
                <input type={'hidden'} name={'action'} value={'login'}/>
                <div className={'login__title'}>{this.getCtrl().getFrontHostApp().getData().title}</div>
                <input className={'login__field'} type={'text'} name={'username'} placeholder={this.getCtrl().getText().login.username}
                       required={true}
                       autoFocus={true}
                       spellCheck={false}/>
                <input className={'login__field'} type={'password'} name={'password'} placeholder={this.getCtrl().getText().login.password}/>
                <p className={'login__err-msg'}>err msg</p>
                <button className={'login__button'} type={'submit'}>{this.getCtrl().getText().login.signIn}</button>
            </form>
        </div>;
    }
}
