import TileContainer from 'components/shared/components/TileContainer';

export default class PortalTileContainer extends TileContainer {
  
  tileData = [{id: 0, size:"x-large", visibleBy:1, text: 'Publications', img: "far fa-file-alt fa-3x", path: '/publications'},
    {id: 2, size:"large", visibleBy:1, text: 'Proposals', img: "far fa-lightbulb fa-3x", path: '/proposals'},
    {id: 5, size:"large", visibleBy:1, text: 'Get Data', img: "fas fa-database fa-3x", path: '/getData'},
    {id: 1, size:"small", visibleBy:1, text: 'Training', img: "far fa-list-alt fa-3x", path: '/training'},
    {id: 3, size:"small", visibleBy:10, text: 'Schedule Experiments', img: "far fa-calendar-alt fa-3x", path: '/scheduleExperiments'},
    {id: 4, size:"small", visibleBy:1, text: 'User Information', img: "fas fa-user-tie fa-3x", path: '/userInfo'},
  ];
  
}