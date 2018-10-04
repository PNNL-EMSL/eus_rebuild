import React from 'react';
import { css } from 'emotion';
import PortalHeader from 'components/portal/components/PortalHeader';
import PortalFooter from 'components/portal/components/PortalFooter';
import PageBase from 'components/shared/pages/PageBase';

const contentStyle: string = css`
  margin: 20px 20px 15px 40px;
  max-width: 1024px;
`;

export default abstract class PortalPageBase extends PageBase {
  abstract renderContent();

  renderPage() {
    const content = this.renderContent();
    return (
      <div>
        <PortalHeader {...this.props} logoutHandler={this.logoutHandler} />
        <div className={contentStyle} >
          {content}
        </div>
        <PortalFooter {...this.props} />
      </div>
    )
  }
}