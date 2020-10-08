class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        if (props.cb) props.cb(this, this.props.name);
    }
}
