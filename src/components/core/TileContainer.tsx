import React, { Component } from 'react';
import NavigationTile from 'components/shared/components/NavigationTile';
import { css } from 'emotion';

const tileContainer: string = css`
  display: flex;
  flex-wrap: wrap;
`;

export default class TileContainer extends Component<any, any> {

  tileData = [
    {id: 0, size:"x-large", visibleBy:1, text: 'Publications', img: "far fa-file-alt fa-3x", path: '/publications'},
    {id: 2, size:"large", visibleBy:1, text: 'Proposals', img: "far fa-lightbulb fa-3x", path: '/proposals'},
    {id: 5, size:"large", visibleBy:1, text: 'Get Data', img: "fas fa-database fa-3x", path: '/getData'},
    {id: 1, size:"small", visibleBy:1, text: 'Training', img: "far fa-list-alt fa-3x", path: '/training'},
    {id: 3, size:"small", visibleBy:10, text: 'Schedule Experiments', img: "far fa-calendar-alt fa-3x", path: '/scheduleExperiments'},
    {id: 4, size:"small", visibleBy:1, text: 'User Information', img: "fas fa-user-tie fa-3x", path: '/userInfo'},
    {id: 6, size:"small", visibleBy:999, text: 'Messaging System', img: "far fa-comment-alt fa-3x", path: '/messageSystem'},
    {id: 7, size:"small", visibleBy:999, text: 'User Admin System', img: "fas fa-users-cog fa-3x", path: '/userAdmin'},
  ];

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

    return (
      <div className={tileContainer}>
        {content}
      </div>
    )
  }
}
