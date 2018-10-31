import React, { Component } from 'react';
import {colorWhite} from 'styles/base';
import {css} from 'emotion';

import {colorDarkGrey} from 'styles/base';

const trainingButton: string = css`
    width: 99%;
    height: 180px;
    border-radius: 15px 50px;
    box-shadow: 5px 5px 15px 10px rgba(0, 0, 0, 0.4);
    background-color: ${colorWhite};
    margin: 0 auto 20px auto;
    color: ${colorDarkGrey};
    &:hover {
        width: 100%;
        height: 190px;
        cursor: pointer;
    }
`;

const trainingImg: string = css`
    width: 30%;
    float: left;
    display: inline-block;
    padding: 50px;
    img {
        display: block;
        margin: auto;
        width: 100%;
    }
`;

const trainingText: string = css`
    margin-top: 45px;
    width: 60%;
    float: right;
    h2 {
        margin: 0;
        padding-bottom: 5px;
    };
    span {
        margin: 0 5px;
    }
    p {
        margin: 0 25px;
    };
`;

export default  class TrainingLinks extends Component<any, any> {

    constructor(props) {
      super(props);
    }

    render() {
        return (
            <a href={this.props.link}>
                <div className={trainingButton}>
                    <div className={trainingImg}>
                        <img src={this.props.img} />
                    </div>
                    <div className={trainingText}>
                        <h2>{this.props.title} Training is Due!</h2>
                        <span>Get started at the <a href={this.props.link}>{this.props.linkText}</a> using:</span>
                        <p>Username: <strong>{this.props.username}</strong></p>
                        <p>Password: <strong>{this.props.password}</strong></p>
                    </div>
                </div>
            </a>
        )
    }
}
