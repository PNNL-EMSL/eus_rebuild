import React from 'react';
import { css } from 'emotion';
import PortalHeader from 'components/portal/components/PortalHeader';
import PortalFooter from 'components/portal/components/PortalFooter';
// import PortalNav from 'components/portal/components/PortalNav';
import PageBase from 'components/shared/pages/PageBase';

const contentStyle: string = css`
  margin: 5px 20px 15px 100px;
  max-width: 958px;
`;

export default abstract class PortalPageBase extends PageBase {
  abstract renderContent();

  renderPage() {
    const content = this.renderContent();
    return (
      <div>
        <PortalHeader {...this.props} />
        <div className={contentStyle} >
          {content}
        </div>
        <PortalFooter {...this.props} />
      </div>
    )
  }
}