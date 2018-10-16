import React from 'react';
import PortalHeader from 'components/portal/components/PortalHeader';
import PortalFooter from 'components/portal/components/PortalFooter';
import PageBase from 'components/shared/pages/PageBase';
import {Breadcrumb} from 'antd';
import {contentStyle} from 'styles/base';
import {Link} from 'react-router-dom';
import {css} from 'emotion';
import {colorLightOrange, colorDisabled} from 'styles/base';

const breadcrumb:string = css`
  position: relative;
  top: 80px;
  left: 20px;
  font-size: 16px;
`;

const breadcrumbLink:string = css`
  color: ${colorLightOrange} !important;
`;

const breadcrumbEnd:string = css`
  color: ${colorDisabled};
`;

export default abstract class PortalPageBase extends PageBase {
  abstract renderContent();

  renderPage() {
    const content = this.renderContent();
    const path = this.props.location.pathname;
    const myRoutes:any[] = [];
    path.split('/').filter((pathPiece) => (pathPiece.length > 0)).forEach((pathPiece) => {
      myRoutes.push({path: pathPiece, breadcrumbName: pathPiece});
    });
    console.log('my routes', myRoutes, myRoutes.length);
    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? <span className={breadcrumbEnd}>{route.breadcrumbName}</span> : <Link to={'/'+paths.join('/')} className={breadcrumbLink}>{route.breadcrumbName}</Link>
    }

    return (
      <div>
        <PortalHeader {...this.props} logoutHandler={this.logoutHandler} />
        {myRoutes.length > 1 && (
          <Breadcrumb className={breadcrumb} itemRender={itemRender} routes={myRoutes} />
        )}
        <div className={contentStyle} >
          {content}
        </div>
        <PortalFooter {...this.props} />
      </div>
    )
  }
}