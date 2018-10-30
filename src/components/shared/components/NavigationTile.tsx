import React, { Component } from 'react';
import { css } from 'emotion';
import {Badge} from 'antd';
import {fontAwesomeContainerStyle} from 'styles/base';

const navigationTile: string = css`
    &:hover {
        cursor: pointer;
    }
`;

const tileImage: string = css`
    height: 4em;
    margin: auto;
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
    const height = this.props.height;
    const width = this.props.width;
    const background = this.props.background;
    return (
      <div className={navigationTile}>
        {this.props.count !== undefined ? (
          <Badge style={{transform: "none", margin:"10px 0px 0px -20px"}} count={this.props.count}>
          <div className={fontAwesomeContainerStyle} style={{height, width, background}} onClick={this.clickHandler}>
            <img className={tileImage} src={this.props.img}/>
            <p>{this.props.text}</p>
            <br />
            <p>{this.props.innerText}</p>
          </div>
          </Badge>
        ) : (
          <div className={fontAwesomeContainerStyle} style={{height, width, background}} onClick={this.clickHandler}>
            <img className={tileImage} src={this.props.img}/>
            <p>{this.props.text}</p>
            <br />
            <p>{this.props.innerText}</p>
          </div>
        )}
      </div>
    )
  }
}
