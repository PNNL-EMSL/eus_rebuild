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

  // For pages where breadcrumb does not directly match location path, renderBreadcrumb should be
  // overridden.  Suggested layout:
  //
  // renderBreadcrumb() {
  //   if( <condition of custom breadbrumbs> ) {
  //     <BreadcrumbBar {...this.props}
  //       myRoutes = {[
  //         {
  //           path: <Path Text>
  //           breadcrumbName: <Custom Name>
  //         }
  //        <similiar...>
  //       ]}
  //     />
  //   } else {
  //     <BreadcrumbBar {...this.props} />
  //   }
  // }
  // (See src/components/portal/pages/reviews/Home.tsx, 83 for implemented example)
  //
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
