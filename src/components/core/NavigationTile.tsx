import React, { Component } from 'react';
import assets from 'components/core/TileAssets';
import { css } from 'emotion';

const tile: string = css`
  width: 75px;
  height: 75px;
`;

const tileImage: string = css`
  width: 50px;
  height: 50px;
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
    const img = assets[this.props.img];
    return (
      <div className={tile} onClick={this.clickHandler}>
        <img className={tileImage} src={img} alt="image" />
        <p>{this.props.text}</p>
      </div>
    )
  }
}