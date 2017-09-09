import React, { Component } from 'react';
import './Mesh.css';
import PropTypes from 'prop-types';

class Mesh extends Component {
    static propTypes = {
        grids: PropTypes.array,
    };
    static defaultProps = {
        grids: new Array(5 * 4).fill().map(() => (Math.random() * 3 + 5) / 10),
    }
    state = {
        grids: [],
    }
    gradation(grids = this.props.grids, freq = 100) {
        const sorted = this.props.grids.map((_, i) => [grids[i], i]).sort((l, r) => l[0] - r[0])
            .map(([, i]) => i);
        const gradation = (sorted, num) => {
            if (!sorted.length) {
                return;
            }
            this.timeout = setTimeout(() => {
                const frame = [...this.state.grids];
                sorted.slice(0, num).forEach(i => frame[i] = grids[i]);
                this.setState({ grids: frame });
                gradation(sorted.slice(num), num + 1);
            }, freq);
        };
        gradation(sorted, 1);
    }
    componentWillReceiveProps({ grids }) {
        grids && this.gradation(grids);
    }
    componentDidMount() {
        // this.gradation();
    }
    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout);
    }
    render() {
        window.gradation = this.gradation.bind(this);
        const { grids } = this.state;
        return (
            <div className="Mesh">
                {this.props.grids.map((_, id) => (
                    <div style={{ opacity: grids[id] || 0.8 }} key={id} />
                ))}
            </div>
        );
    }
}

export default Mesh;
