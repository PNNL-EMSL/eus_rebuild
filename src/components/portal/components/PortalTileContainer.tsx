import TileContainer from 'components/shared/components/TileContainer';

export default class PortalTileContainer extends TileContainer {
  
  tileData = [
    {id: 0, span: 16, height: 200, width: 400, visibleBy:1, text: 'Proposals / Projects', img: "fas fa-book-open fa-3x", path: '/Portal/proposals'},
    {id: 1, span: 8, endRow: true, height: 200, width: 200, visibleBy:1, text: 'Publications', img: "far fa-file-alt fa-3x", path: '/Portal/publications'},
    {id: 2, span: 9, startInnerRow: true, height: 100, width: 150, visibleBy:1, text: 'Training', img: "fas fa-chalkboard-teacher fa-3x", path: '/Portal/training'},
    {id: 3, span: 14, endInnerRow: true, height: 100, width: 240, visibleBy:1, text: 'Get Data', img: "fas fa-chart-bar fa-3x", path: '/Portal/getData'},
    {id: 4, span: 9, startInnerRow: true, height: 100, width: 150, visibleBy:10, text: 'Schedule Experiments', img: "far fa-calendar-alt fa-3x", path: '/Portal/scheduleExperiments'},
    {id: 5, span: 14, endInnerRow: true, height: 100, width: 240, visibleBy:1, text: 'Sample Status', img: "fas fa-flask fa-3x", path: '/Portal/sampleStatus'},
    {id: 6, span: 8, height: 210, width: 200, visibleBy:1, text: 'Reviews', img: "far fa-thumbs-up fa-3x", path: '/Portal/userInfo'},
  ];
  
}

// tileData = [
//   {id: 0, span: 16, height: 150, width: 400, visibleBy:1, text: 'Proposals / Projects', img: "fas fa-book-open fa-3x", path: '/Portal/proposals'},
//   {id: 1, span: 8, endRow: true, height: 200, width: 200, visibleBy:1, text: 'Publications', img: "far fa-file-alt fa-3x", path: '/Portal/publications'},
//   {id: 2, span: 9, startInnerRow: true, height: 100, width: 150, visibleBy:1, text: 'Training', img: "fas fa-chalkboard-teacher fa-3x", path: '/Portal/training'},
//   {id: 3, span: 14, endInnerRow: true, height: 100, width: 240, visibleBy:1, text: 'Get Data', img: "fas fa-chart-bar fa-3x", path: '/Portal/getData'},
//   {id: 4, span: 9, startInnerRow: true, height: 100, width: 150, visibleBy:10, text: 'Schedule Experiments', img: "far fa-calendar-alt fa-3x", path: '/Portal/scheduleExperiments'},
//   {id: 5, span: 14, endInnerRow: true, height: 100, width: 240, visibleBy:1, text: 'Sample Status', img: "fas fa-flask fa-3x", path: '/Portal/sampleStatus'},
//   {id: 6, span: 8, height: 210, width: 200, visibleBy:1, text: 'Reviews', img: "far fa-thumbs-up fa-3x", path: '/Portal/userInfo'},
// ];