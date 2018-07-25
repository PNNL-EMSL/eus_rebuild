import React, { Component } from 'react';
import { css } from 'emotion';


const faContainer: string = css`
  text-align: center;
  border-style: solid;
  margin: 5px;
  padding-top: 5px;
  display: inline-grid;
  min-height: 100px
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
    this.props.history.push(this.props.path);
  }

  render() {
    let size;
    if(this.props.size === 'large') {
      size = 200;
    } else if(this.props.size === 'x-large') {
      size = 300;
    } else {
      size = 100;
    }
    return (
      <div className={faContainer} style={{height: size*0.67, width: size}} onClick={this.clickHandler}>
        <i className={this.props.img}/>
        <p>{this.props.text}</p>
      </div>
    )
  }
}