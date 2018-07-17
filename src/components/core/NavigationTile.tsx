import React, { Component } from 'react';
import { css } from 'emotion';


const faContainer: string = css`
  text-align: center;
  width: 100px;
  height: 100px;
  border-style: solid;
  margin: 5px;
  padding-top: 5px;
`;

export default class NavigationTile extends Component<any, any> {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    console.log('Clicking on ' + this.props.text);
    console.log('Will navigate to ' + this.props.path);
    window.location.assign(this.props.path);
  }

  render() {
    return (
      <span onClick={this.clickHandler}>
        <div className={faContainer}>
          <i className={this.props.img}/>
          <p>{this.props.text}</p>
        </div>
      </span>
    )
  }
}