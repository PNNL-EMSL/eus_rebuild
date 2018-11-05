import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import {portalContentStyle} from 'styles/base';

export default class GetData extends PortalPageBase {
  renderContent() {
    return (
      <div className={portalContentStyle}>
        <h3>Get Data</h3>
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
      </div>
    );
  }
}
