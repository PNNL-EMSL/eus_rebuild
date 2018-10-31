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
    let innerRow: JSX.Element[] = [];
    let rowNum = 0;
    let colNum = 0;
    Object.keys(tiles).map((key) => {
      const item = tiles[key];
      if(this.props.role >= item.visibleBy) {
        if (item.startInnerRow || innerRowContent.length !== 0) {
          // push tile to inner row array
        innerRowContent.push(
          <Col span={item.span} key={colNum++}>
            <NavigationTile
              id={item.id}
              key={item.id}
              text={item.text}
              innerText={item.innerText}
              img={item.img}
              path={item.path}
              height={item.height}
              width={item.width}
              background={item.background}
              count={item.count}
              {...this.props}
            />
          </Col>
        );
        } else {
        rowContent.push(
          <Col span={item.span} key={colNum++}>
            <NavigationTile
              id={item.id}
              key={item.id}
              text={item.text}
              innerText={item.innerText}
              img={item.img}
              path={item.path}
              height={item.height}
              width={item.width}
              background={item.background}
              count={item.count}
              {...this.props}
            />
          </Col>
        );
      }
        if(item.endInnerRow) {
          // push inner row content to row content
          // clear inner row content
          innerRow.push(<Row key={rowNum++}>{innerRowContent}</Row>);
          innerRowContent = [];
        }
        if(item.endRow) {
          if(innerRow.length !== 0) {
            content.push(<Row key={rowNum++}><Col key={colNum++} span={16}>{innerRow}</Col>{rowContent}</Row>);
            innerRow = [];
          } else {
            content.push(<Row key={rowNum++}>{rowContent}</Row>);
          }
          rowContent = [];
        }
      }
    });
    if(innerRow.length !== 0) {
      console.log('innerRow', innerRow, 'rowContent', rowContent);
      content.push(<Row key={rowNum++}><Col key={colNum++} span={16}>{innerRow}</Col>{rowContent}</Row>);
      innerRow = [];
    } else {
      content.push(<Row key={rowNum++}>{rowContent}</Row>);
    }
    console.log('tile content', content);
    return (
      <div className={tileContainer}>
        {content}
      </div>
    )
  }
}
