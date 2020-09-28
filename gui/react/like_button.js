'use strict';

class LikeButton extends React.Component {
    constructor(props) {
        console.log('LikeButton.constructor');
        super(props);
        this.state = { liked: false };
    }

    render() {
        console.log('LikeButton.render');
        if (this.state.liked) {
            return 'You liked this.';
        }
        return React.createElement(
            'button',
            {
                onClick: () => {
                    this.setState({ liked: true });
                }
            },
            'Like'
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    const domContainer = document.querySelector('#like_button_container');
    ReactDOM.render(React.createElement(LikeButton), domContainer);
});
