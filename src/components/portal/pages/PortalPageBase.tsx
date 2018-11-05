import React from 'react';
import PortalHeader from 'components/portal/components/PortalHeader';
import PortalFooter from 'components/portal/components/PortalFooter';
import PageBase from 'components/shared/pages/PageBase';
import BreadcrumbBar from 'components/shared/components/BreadcrumbBar';
import {css} from 'emotion';

import {contentStyle} from 'styles/base';

const breadcrumb:string = css`
    top: 95px !important;
    position: relative;
    left: 20px !important;
  `;

export default abstract class PortalPageBase extends PageBase {
  abstract renderContent();

  renderBreadcrumb() {
    return(
      <BreadcrumbBar {...this.props} />
    )
  }

  renderPage() {
    const content = this.renderContent();

    return (
      <div>
        <PortalHeader {...this.props} logoutHandler={this.logoutHandler} />
        <div className={breadcrumb}>
          {this.renderBreadcrumb()}
        </div>
        <div className={contentStyle} >
          {content}
        </div>
        <PortalFooter {...this.props} />
      </div>
    )
  }
}
