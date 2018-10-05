import React, { Component } from 'react';
import { css } from 'emotion';
import {Badge} from 'antd';


const faContainer: string = css`
  text-align: center;
  border-style: solid;
  margin: 5px;
  padding-top: 5px;
  display: inline-grid;
  min-height: 100px
`;

// const notification: string = css`
//   right: -5px;
//   margin-top: 15px;
// `

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
    console.log('background', background);
    console.log('count, text', this.props.count, this.props.text);
    return (
      <div>
        {this.props.count !== undefined ? (
          <Badge style={{transform: "none", margin:"10px 0px 0px -20px"}} count={this.props.count}>
          <div className={faContainer} style={{height, width, background}} onClick={this.clickHandler}>
            <i className={this.props.img}/>
            <p>{this.props.text}</p>
            <br />
            <p>{this.props.innerText}</p>
          </div>
          </Badge>
        ) : (
          <div className={faContainer} style={{height, width, background}} onClick={this.clickHandler}>
            <i className={this.props.img}/>
            <p>{this.props.text}</p>
            <br />
            <p>{this.props.innerText}</p>
          </div>
        )}
      </div>
    )
  }
}