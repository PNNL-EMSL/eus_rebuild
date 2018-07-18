import React, { Component } from 'react';
import NavigationTile from 'components/core/NavigationTile';
import { css } from 'emotion';

const tileContainer: string = css`
  display: flex;
  flex-wrap: wrap;
`;


export default class TileContainer extends Component<any, any> {

  tileData = [
    {id: 0, size:"x-large", text: 'Publications', img: "far fa-file-alt fa-3x", path: '/publications'},
    {id: 2, size:"large", text: 'Proposals', img: "far fa-lightbulb fa-3x", path: '/proposals'},
    {id: 5, size:"large", text: 'Get Data', img: "fas fa-database fa-3x", path: '/getData'},
    {id: 1, size:"small", text: 'Training', img: "far fa-list-alt fa-3x", path: '/training'},
    {id: 3, size:"small", text: 'Schedule Experiments', img: "far fa-calendar-alt fa-3x", path: '/scheduleExperiments'},
    {id: 4, size:"small", text: 'User Information', img: "fas fa-user-tie fa-3x", path: '/userInfo'},
    {id: 4, size:"small", text: 'Messaging System', img: "far fa-comment-alt fa-3x", path: '/messageSystem'},
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
      rowContent.push(
        <NavigationTile
          id={item.id}
          key={key}
          text={item.text}
          img={item.img}
          path={item.path}
          size={item.size}
          {...this.props}
        />
      );
      // console.log(Number(item.id+1) % 2);
      if(item.id === 0 || item.id === 5 ) {
        // console.log(rowContent);
        content.push(<div><span>{rowContent}</span></div>);
        rowContent = [];
      }
    });
    content.push(<div><span>{rowContent}</span></div>);

    return (
      <div className={tileContainer}>
        {content}
      </div>
    )
  }
}