import React, { Component } from 'react';
import NavigationTile from 'components/shared/components/NavigationTile';
import { css } from 'emotion';
import {Row, Col} from 'antd';

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
    const tiles = this.tileData.sort((a, b) => a.id - b.id);
    const content: JSX.Element[] = [];
    let rowContent: JSX.Element[] = [];
   let innerRowContent: JSX.Element[] = [];
    Object.keys(tiles).map((key) => {
      const item = tiles[key];
      if(this.props.role >= item.visibleBy) {
        if (item.startInnerRow || innerRowContent.length !== 0) {
          // push tile to inner row array
        innerRowContent.push(
          <NavigationTile
            id={item.id}
            key={item.id}
            text={item.text}
            img={item.img}
            path={item.path}
            height={item.height}
            width={item.width}
            {...this.props}
          />
        );
        } else {
        rowContent.push(
          <NavigationTile
            id={item.id}
            key={item.id}
            text={item.text}
            img={item.img}
            path={item.path}
            height={item.height}
            width={item.width}
            {...this.props}
          />
        );
      }
        if(item.endInnerRow) {
          // push inner row content to row content
          // clear inner row content
          rowContent.push(<Row><Col span={24}>{innerRowContent}</Col></Row>);
          innerRowContent = [];
        }
        if(item.endRow) {
          content.push(<Row><Col style={{display: 'flex'}}>{rowContent}</Col></Row>);
          rowContent = [];
        }
      }
    });
    content.push(<Row><Col>{rowContent}</Col></Row>);
    console.log('tile content', content);
    return (
      <div className={tileContainer}>
        {content}
      </div>
    )
  }
}