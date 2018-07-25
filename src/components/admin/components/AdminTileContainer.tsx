import TileContainer from "components/shared/components/TileContainer";

export default class AdminTileContainer extends TileContainer {

  tileData = [
    {id: 6, size:"small", visibleBy:999, text: 'Messaging System', img: "far fa-comment-alt fa-3x", path: '/messageSystem'},
    {id: 7, size:"small", visibleBy:999, text: 'Messaging System', img: "fas fa-users-cog fa-3x", path: '/userAdmin'},
  ];

}