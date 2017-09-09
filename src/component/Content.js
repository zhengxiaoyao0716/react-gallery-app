import React, { Component } from 'react';
import './Content.css';

import { opv, bgi } from './../resource/resource';
import Mesh from './Mesh';
import Perspective from './Perspective';
import Landscape from './Landscape';

class Content extends Component {
    state = {
        pages: [],
    };
    pageId = 0;
    handlerWheel = (e) => {
        if (this.animationFrame) {
            return;
        }
        if (e instanceof Event) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        let id = this.pageId + e.deltaY / 100;
        if (id < 0) {
            id = 0;
        } else if (id > this.content.children.length - 1) {
            id = this.content.children.length - 1;
        }
        this.pageId = id;

        if (this.state.pages[id]) {
            return;
        }

        const scrollTop = Math.min(id * window.innerHeight, this.content.scrollHeight - window.innerHeight);
        const scroll = (freq) => {
            this.content.scrollTop += freq;
            if (
                (freq > 0 && this.content.scrollTop >= scrollTop)
                || (freq < 0 && this.content.scrollTop <= scrollTop)
            ) {
                this.content.scrollTop = scrollTop;
                this.animationFrame = null;
            } else {
                this.animationFrame = requestAnimationFrame(() => scroll(freq));
            }
        };
        scroll(this.content.scrollTop > scrollTop ? -30 : 30);
        const pages = [];
        pages[id] = new Array(5 * 4).fill().map(() => (Math.random() * 3 + 5) / 10);
        this.setState({ pages });
    }
    handlerKeyDown = (e) => {
        switch (e.keyCode) {
            case 32: // space
                this.handlerWheel({ deltaY: 100 });
                break;
            case 40: // down
                this.handlerWheel({ deltaY: 100 });
                break;
            case 38: // up
                this.handlerWheel({ deltaY: -100 });
                break;
            default:
                return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    componentDidMount() {
        ['mousewheel', 'resize'].forEach(key => this.content.addEventListener(key, this.handlerWheel));
        window.addEventListener('keydown', this.handlerKeyDown);
        this.handlerWheel({ deltaY: 0 });
    }
    componentWillUnmount() {
        ['mousewheel', 'resize'].forEach(key => this.content.removeEventListener(key, this.handlerWheel));
        window.removeEventListener('keydown', this.handlerKeyDown);
    }
    render() {
        const { pages } = this.state;
        return (
            <div ref={(content) => this.content = content} className="Content">
                <div className="page">
                    <video className="bg" autoPlay playsInline loop preload="auto" muted type="video/mp4">
                        <source src={opv} />
                    </video>
                    <Mesh grids={pages[0]} />
                    <div className="title cover">
                        <Perspective>ERTYUI</Perspective>
                        <span>
                            <Perspective>ASDF</Perspective>
                            <Perspective>HJKL</Perspective>
                        </span>
                        <Perspective>CVBNM</Perspective>
                    </div>
                </div>
                <div className="page">
                    <div className="bg" style={{ backgroundImage: `url(${bgi})` }} />
                    <Mesh grids={pages[1]} />
                    <div className="cover">
                        <Landscape>
                            <div className="card">
                                <i className="fa fa-paperclip fa-5x" aria-hidden="true" />
                                <div>
                                    <h1>Page 01</h1>
                                    <p>
                                        <span className="text underline">国破山河在，城春草木深；感时花溅泪，恨别鸟惊心。</span>
                                        <small className="text secondary">—— 杜甫</small>
                                        <small>《春望》</small>
                                    </p>
                                </div>
                            </div>
                            <div className="card">
                                <i className="fa fa-paperclip fa-5x" aria-hidden="true" />
                                <div>
                                    <h1>Page 02</h1>
                                    <p>
                                        <span className="text underline">国破山河在，城春草木深；感时花溅泪，恨别鸟惊心。</span>
                                        <small className="text secondary">—— 杜甫</small>
                                        <small>《春望》</small>
                                    </p>
                                </div>
                            </div>
                            <div className="card">
                                <i className="fa fa-paperclip fa-5x" aria-hidden="true" />
                                <div>
                                    <h1>Page 03</h1>
                                    <p>
                                        <span className="text underline">国破山河在，城春草木深；感时花溅泪，恨别鸟惊心。</span>
                                        <small className="text secondary">—— 杜甫</small>
                                        <small>《春望》</small>
                                    </p>
                                </div>
                            </div>
                            <div className="card">
                                <i className="fa fa-paperclip fa-5x" aria-hidden="true" />
                                <div>
                                    <h1>Page 04</h1>
                                    <p>
                                        <span className="text underline">国破山河在，城春草木深；感时花溅泪，恨别鸟惊心。</span>
                                        <small className="text secondary">—— 杜甫</small>
                                        <small>《春望》</small>
                                    </p>
                                </div>
                            </div>
                        </Landscape>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;
