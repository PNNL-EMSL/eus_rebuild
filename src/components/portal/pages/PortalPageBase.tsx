import React from 'react';
import PortalHeader from 'components/portal/components/PortalHeader';
import PortalFooter from 'components/portal/components/PortalFooter';
import PageBase from 'components/shared/pages/PageBase';
import BreadcrumbBar from 'components/shared/components/BreadcrumbBar';
import {css} from 'emotion';

// import {portalPageContentStyle} from 'styles/base';

import {contentStyle} from 'styles/base';
// Was attached to the div which displays "Content";

const breadcrumb:string = css`
    top: 95px !important;
    position: relative;
    left: 20px !important; 
  `;

export default abstract class PortalPageBase extends PageBase {
  abstract renderContent();

  renderPage() {
    const content = this.renderContent();

    return (
      <div>
        <PortalHeader {...this.props} logoutHandler={this.logoutHandler} />
        <div className={breadcrumb}>
          <BreadcrumbBar {...this.props} />
        </div>
        <div className={contentStyle} >
          {content}
        </div>
        <PortalFooter {...this.props} />
      </div>
    )
  }
}