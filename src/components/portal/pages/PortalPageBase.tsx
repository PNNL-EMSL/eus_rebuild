import React from 'react';
import PortalHeader from 'components/portal/components/PortalHeader';
import PortalFooter from 'components/portal/components/PortalFooter';
import PageBase from 'components/shared/pages/PageBase';
import {contentStyle} from 'styles/base';

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