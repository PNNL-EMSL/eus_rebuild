import React from 'react';
import {css} from 'emotion';
import PortalPageBase from 'components/portal/pages/PortalPageBase';

import info from 'images/info.png';
import {portalContentStyle, colorWhite, colorDarkGreen, colorLightOrange, colorBurntOrange} from 'styles/base';

const infoButton: string = css`
  height: 17px;
  margin-bottom: 3px;
`;

const dataTable: string = css`
  width: 97%;
  margin: 3px auto 7px auto;
  thead>tr>td {
    background-color: ${colorDarkGreen};
    color: ${colorLightOrange};
    font-size: 110%;
    font-weight: bold;
    padding: 4px;
    border: 2px solid ${colorWhite};
  }
  tbody>tr>td {;
    padding: 4px;
    background-color: #ddd;
    border: 2px solid ${colorWhite};
    a, a:hover {
      color: ${colorBurntOrange}
    }
  }
`;

const sampleData = [
  {
    id: '00001',
    title: 'Sample Project 1',
    data: [
      {
        instrument: 'Sample Instrument',
        link: '#'
      }
    ],
  },
  {
    id: '00002',
    title: 'Sample Project 2',
    data: [
      {
        instrument: 'Sample Instrument',
        link: '#'
      },
      {
        instrument: 'Sample Instrument',
        link: '#'
      }
    ],
  },
  {
    id: '00003',
    title: 'Sample Project 3',
    data: [
      {
        instrument: 'Sample Instrument',
        link: '#'
      }
    ],
  }
];

export default class GetData extends PortalPageBase {

  renderData() {
    const data = sampleData.map((project, index) =>
      <div key={index}>
        <strong>{project.id} {project.title}</strong>
        <table className={dataTable}>
          <thead>
            <tr>
              <td>Instrument</td>
              <td>Data Link</td>
            </tr>
          </thead>
          <tbody>
            {this.renderInstrumentRows(project.data)}
          </tbody>
        </table>
      </div>
    );
    return (data);
  }

  renderInstrumentRows(data) {
    const rows = data.map((dataSet, index) =>
      <tr key={index}>
        <td>
          {dataSet.instrument}
        </td>
        <td>
          <a href={dataSet.link}>Get Data</a>
        </td>
      </tr>
    );
    return (rows);
  }

  renderContent() {
    return (
      <div className={portalContentStyle}>
        <h3>Get Data <a><img className={infoButton} src={info} /></a></h3>
        <p>
          This page provides a list of your projects in numerical order and the associated
          instruments that have data available to download (i.e., it will not show all instruments
          used, only those with available data). At this time, these datasets are the raw data
          files, but in the future, your analyzed datasets will be available as well. Note that
          different instruments store different parameters, and some files require proprietary
          software to open. We recommend you first contact the instrument scientist to determine
          which files to select and the appropriate program(s) you will need for each.
        </p>
        <p>
          To learn more about accessing these datasets, please refer to the Help document on this page.
        </p>
        {this.renderData()}
      </div>
    );
  }
}
