import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Perspective extends Component {
    static propTypes = {
        children: PropTypes.any,
        maxRotate: PropTypes.number,
    };
    static defaultProps = {
        maxRotate: 20,
    }
    state = {
        rotateY: 0,
    }
    handlerMove = (e) => {
        this.setState({ rotateY: (e.screenX / window.outerWidth - 0.5) * this.props.maxRotate });
    }
    componentDidMount() {
        window.addEventListener('mousemove', this.handlerMove);
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handlerMove);
    }
    render() {
        return (
            <div style={{
                transform: `perspective(100px) rotateY(${this.state.rotateY}deg)`,
                display: 'inline-block',
            }} className="Perspective">
                {this.props.children}
            </div>
        );
    }
}

export default Perspective;
