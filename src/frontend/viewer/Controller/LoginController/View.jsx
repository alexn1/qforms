class LoginView extends View {
    onLoginFormSubmit = e => {
        // console.log('LoginView.onLoginFormSubmit');
        document.querySelector('.LoginView__button').disabled = true;
        // e.preventDefault();
    }
    renderLogo() {
    }
    renderTitle() {
        return this.getCtrl().getFrontHostApp().getData().title;
    }
    render() {
        return <div className={`${this.getCssBlockName()}__container`}>
            <form className={`${this.getCssBlockName()}__form`}
                  method={'post'}
                  onSubmit={this.onLoginFormSubmit}
            >
                <input type={'hidden'} name={'tzOffset'} value={JSON.stringify(new Date().getTimezoneOffset())}/>
                <input type={'hidden'} name={'action'} value={'login'}/>
                <div className={`${this.getCssBlockName()}__logo-title`}>
                    <div className={`${this.getCssBlockName()}__logo`}>
                        {this.renderLogo()}
                    </div>
                    <div className={`${this.getCssBlockName()}__title`}>
                        {this.renderTitle()}
                    </div>
                </div>
                <input className={`${this.getCssBlockName()}__field`}
                       type={'text'}
                       name={'username'}
                       placeholder={this.getCtrl().getText().login.username}
                       required={true}
                       autoFocus={true}
                       spellCheck={false}
                />
                <Password classList={[`${this.getCssBlockName()}__field2`]}
                          name={'password'}
                          placeholder={this.getCtrl().getText().login.password}
                />
                <p className={`${this.getCssBlockName()}__err-msg`}>
                    {this.getCtrl().getFrontHostApp().getData().errMsg}
                </p>
                <button className={`${this.getCssBlockName()}__button`} type={'submit'}>
                    {this.getCtrl().getText().login.signIn}
                </button>
            </form>
        </div>;
    }
}
