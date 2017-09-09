import React, { Component } from 'react';
import './Landscape.css';
import PropTypes from 'prop-types';

class Landscape extends Component {
    static propTypes = {
        children: PropTypes.array,
    };
    state = {
        index: 0,
    }
    render() {
        const { index } = this.state;
        const last = index - 1 < 0 ? this.props.children.length - 1 : index - 1;
        const next = index + 1 >= this.props.children.length ? 0 : index + 1;
        return (
            <div className="Landscape">
                {this.props.children.map((child, id) => (
                    <div
                        onClick={id === next ? () => this.setState({ index: next }) : null}
                        className={id === last ? 'last' : id === index ? '' : id === next ? 'next' : 'hide'}
                        key={id}>{child}</div>
                ))}
            </div>
        );
    }
}

export default Landscape;
