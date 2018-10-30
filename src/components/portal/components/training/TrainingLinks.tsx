import TileContainer from 'components/shared/components/TileContainer';

import {colorWhite} from 'styles/base';
import pnnlLogo from 'images/PNNL_Logo_grey_transparent.png';
import iops from 'images/iops_logo.png';

const normal = colorWhite;

const pnnlText = 'Training ID: <strong>8706363</strong><br>Temporary Password: <strong>87TRN_km</strong>';
const iopsText = 'Hanford ID: <strong>H8706363</strong><br>Temporary Password: <strong>8706363</strong>';

export default  class TrainingLinks extends TileContainer {

    tileData = [
      {id: 0, span: 16, height: 200, width: 400, background: normal, visibleBy:1, text: 'Formal Training is Due!', innerText: pnnlText, img: pnnlLogo, path: 'https://psportal.pnl.gov/psp/paprod/EMPLOYEE/ELM/c/PNL_LM_SS_LEARNING.PNL_MY_LEARNING.GBL'},
      {id: 1, span: 8, endRow: true, height: 200, background: normal, width: 400, visibleBy:1, text: 'Lab Specific Training is Due!', innerText: iopsText, img: iops, path: 'https://iops.pnl.gov/'},
    ];

}
