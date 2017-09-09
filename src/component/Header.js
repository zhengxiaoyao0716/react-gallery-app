import React, { Component } from 'react';
import './Header.css';

import { bgi, menuBgs } from './../resource/resource';
import Mesh from './Mesh';

class Header extends Component {
  state = {
    bgi,
    fold: true,
  }
  handlerFold = () => {
    this.setState({ bgi: null, fold: !this.state.fold });
  }
  grids = new Array(5 * 4).fill().map(() => (Math.random() * 2 + 7) / 10);
  render() {
    const { fold } = this.state;
    return (
      <div className={`Header fold-${fold}`}>
        <div style={{ backgroundImage: `url(${bgi})` }} className="bg" />
        <div style={{ backgroundImage: `url(${this.state.bgi})` }} className={`bg-menu ${this.state.bgi != null}`} />
        <Mesh grids={fold ? undefined : this.grids} />
        <div className="nav">
          <a onClick={this.handlerFold} className="fold">
            <span>
              <i className="fa fa-align-left scale" aria-hidden="true" />
              <i className="fa fa-close rotate" aria-hidden="true" />
            </span>
            <span>MENU</span>
          </a>
          <a>TITLE</a>
          <span>
            <a>B1</a>
            <a>B2</a>
          </span>
        </div>
        <div className="page">
          {
            [
              '哆啦A梦',
              'A bc defg',
              '此生无悔入东方',
              'あいうえお',
            ].map((text, id) => (
              <a onMouseOver={() => {
                this.timeout && window.clearTimeout(this.timeout);
                this.setState({ bgi: null });
                this.timeout = window.setTimeout(() => this.setState({ bgi: menuBgs[id] }), 100);
              }} style={{
                transform: `translate(${fold ? 12 : 6}%)`,
                transitionDelay: `${0.3 + id * 0.1}s`,
              }} key={id}>
                {Array.from(text).map((ch, id) => (
                  <span style={{ transitionDelay: `${Math.random() * 0.5}s` }} key={id}>{ch}</span>
                ))}
              </a>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Header;
