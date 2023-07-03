import { ReactComponent } from '../../ReactComponent';
import { Button } from '../Button';
import './Box.less';

export class Box extends ReactComponent {
    constructor(props) {
        // console.debug('Box.constructor', props);
        super(props);
        this.state = {
            backgroundColor: 'purple',
        };
    }

    // componentWillMount() {
    //     console.debug('Box.componentWillMount');
    // }

    componentDidMount() {
        console.debug('Box.componentDidMount');
    }

    componentWillUnmount() {
        console.debug('Box.componentWillUnmount');
    }

    update = () => {
        console.debug('Box.update');
        this.setState({
            backgroundColor: 'green',
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.debug('Box.shouldComponentUpdate', nextProps, nextState);
        return true;
    }

    componentDidUpdate() {
        console.debug('Box.componentDidUpdate');
    }

    render() {
        console.debug('Box.render');
        return (
            <div className="Box">
                <Button name="one" />
                <Button name="two" />
                <Button name="three" />
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Box = Box;
}
