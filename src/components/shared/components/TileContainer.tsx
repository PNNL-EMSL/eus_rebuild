import React, { Component } from 'react';
import NavigationTile from 'components/shared/components/NavigationTile';
import { css } from 'emotion';

const tileContainer: string = css`
  display: flex;
  flex-wrap: wrap;
`;

export default class TileContainer extends Component<any, any> {

  tileData:any = [];

  constructor(props: any) {
    super(props);
  }

  render() {
    const tiles = this.tileData;
    const content: JSX.Element[] = [];
    let rowContent: JSX.Element[] = [];
    let previousSize = '';
    Object.keys(tiles).map((key) => {
      const item = tiles[key];
      if(previousSize && item.size !== previousSize) {
        content.push(<div><span>{rowContent}</span></div>);
        rowContent = [];
      }
      if(this.props.role >= item.visibleBy) {
        rowContent.push(
          <NavigationTile
            id={item.id}
            key={item.id}
            text={item.text}
            img={item.img}
            path={item.path}
            size={item.size}
            {...this.props}
          />
        );
      }
      previousSize = item.size;
    });
    content.push(<div><span>{rowContent}</span></div>);
    console.log('tile content', content);
    return (
      <div className={tileContainer}>
        {content}
      </div>
    )
  }
}