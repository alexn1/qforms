class LoginView extends View {
    render() {
        return <div className={this.getCssClassNames()}>
            <form className={'login__form'} method={'post'}>
                <input type={'hidden'} name={'tzOffset'}/>
                <input type={'hidden'} name={'action'} value={'login'}/>
                <input type={'text'} name={'username'} placeholder={this.getCtrl().getText().login.username}/>
            </form>
        </div>;
    }
}
