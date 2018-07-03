import React, { Component } from 'react';
import NavigationTile from 'components/core/NavigationTile';

export default class TileContainer extends Component<any, any> {

  tileData = [
    {id: 1, text: 'first tile', img: 'logo', path: '/homeTile'},
    {id: 2, text: 'next tile', img: 'microbes', path: '/homeTile'}
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selected: 'None'
    };
  }

  render() {
    const tiles = this.tileData;
    return (
      <div>
        Temp Tile Container
        {Object.keys(tiles).map((key) => {
          console.log(tiles[key]);
          const item = tiles[key];
          return (
            <NavigationTile id={item.id} key={key} text={item.text} img={item.img} path={item.path}/>
          );
        })}
      </div>
    )
  }
}