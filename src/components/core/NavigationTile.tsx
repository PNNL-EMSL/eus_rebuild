import React, { Component } from 'react';
import { css } from 'emotion';

const tile: string = css`
  width: 100px;
  height: 100px;
`;

const faContainer: string = css`
  text-align: center;
  width: 100px;
`;

export default class NavigationTile extends Component<any, any> {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log('Clicking on ' + this.props.text);
    console.log('Will navigate to ' + this.props.path);

  }

  render() {
    return (
      <span className={tile} onClick={this.clickHandler}>
        <div className={faContainer}>
          <i className={this.props.img}/>
          <p>{this.props.text}</p>
        </div>
      </span>
    )
  }
}