import React, { Component } from 'react';
import NavigationTile from 'components/core/NavigationTile';
import { css } from 'emotion';

const tileContainer: string = css`
  display: flex;
  width: 40%
`;


export default class TileContainer extends Component<any, any> {

  tileData = [
    {id: 0, text: 'Publications', img: "far fa-file-alt fa-3x", path: '/homeTile'},
    {id: 1, text: 'Training', img: "far fa-list-alt fa-3x", path: '/homeTile'},
    {id: 2, text: 'Proposals', img: "far fa-lightbulb fa-3x", path: '/homeTile'},
    {id: 3, text: 'Schedule Experiments', img: "far fa-calendar-alt fa-3x", path: '/homeTile'},
    {id: 4, text: 'User Information', img: "fas fa-user-tie fa-3x", path: '/homeTile'},
    {id: 5, text: 'Get Data', img: "fas fa-database fa-3x", path: '/homeTile'}
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      selected: 'None'
    };
  }

  render() {
    const tiles = this.tileData;
    const content: JSX.Element[] = [];
    let rowContent: JSX.Element[] = [];
    Object.keys(tiles).map((key) => {
      const item = tiles[key];
      rowContent.push(<NavigationTile id={item.id} key={key} text={item.text} img={item.img} path={item.path}/>);
      console.log(Number(item.id+1) % 2);
      if((Number(item.id+1) % 2) === 0) {
        console.log(rowContent);
        content.push(<div><span>{rowContent}</span></div>);
        rowContent = [];
      }
    });
    console.log(rowContent);
    content.push(<div><span>{rowContent}</span></div>);

    return (
      <div>
        <span className={tileContainer}>
          {content}
        </span>
      </div>
    )
  }
}