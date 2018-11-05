import TileContainer from 'components/shared/components/TileContainer';
import {colorWhite, colorYellow, colorRed} from 'styles/base';

import proposals from 'images/portalTileIcons/proposals_projects.png';
import publications from 'images/portalTileIcons/publications.png';
import training from 'images/portalTileIcons/training.png';
import getData from 'images/portalTileIcons/get_data.png';
import scheduleExperiments from 'images/portalTileIcons/schedule_experiment.png';
import sampleStatus from 'images/portalTileIcons/sample_status.png';
import reviews from 'images/portalTileIcons/peer_review_workspace.png';

const normal = colorWhite;
const upcoming = colorYellow;
const urgent = colorRed;

export default class PortalTileContainer extends TileContainer {


  tileData = [
    {id: 0, span: 16, height: 200, width: 400, background: normal, visibleBy:1, text: 'Proposals / Projects', innerText: 'test', img: proposals, path: '/Portal/proposals'},
    {id: 1, span: 8, endRow: true, height: 200, background: upcoming, width: 200, visibleBy:1, text: 'Publications', img: publications, path: '/Portal/publications'},
    {id: 2, span: 9, startInnerRow: true, height: 100, width: 150, background: urgent, visibleBy:1, text: 'Training', img: training, path: '/Portal/training'},
    {id: 3, span: 14, endInnerRow: true, height: 100, width: 240, background: normal, visibleBy:1, text: 'Get Data', img: getData, path: '/Portal/get_Data'},
    {id: 4, span: 9, startInnerRow: true, height: 100, width: 150, background: normal, visibleBy:10, text: 'Schedule Experiments', img: scheduleExperiments, path: '/Portal/schedule_Experiments'},
    {id: 5, span: 14, endInnerRow: true, height: 100, width: 240, background: normal, visibleBy:1, text: 'Sample Status', img: sampleStatus, path: '/Portal/sampleStatus'},
    {id: 6, span: 8, height: 210, count: 6, width: 200, background: normal, visibleBy:1, text: 'Reviews', img: reviews, path: '/Portal/userInfo'},
  ];
}
