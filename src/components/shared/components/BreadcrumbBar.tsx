import React, {Component} from 'react';

import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import {css} from 'emotion';
import {colorLightOrange, colorDisabled} from 'styles/base';

const breadcrumb:string = css`
  position: relative;
  font-size: 16px;
`;

const breadcrumbLink:string = css`
  color: ${colorLightOrange} !important;
`;

const breadcrumbEnd:string = css`
  color: ${colorDisabled};
`;

export default class BreadcrumbBar extends Component<any, any> {

  render() {
    let myRoutes:any[] = []
    if(this.props.myRoutes) {
      // myRoutes should be object of {path, breadcrumbName} per accepted route of Ant Design Breadcrumb
      myRoutes = this.props.myRoutes;
    } else {
      this.props.location.pathname.split('/').filter((pathPiece) => (pathPiece.length > 0)).forEach((path) => (
        myRoutes.push(
          {
            path,
            breadcrumbName: path.split('_').map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')
          }
        )
      ));
    }
    console.log(myRoutes);

    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ?
        <span className={breadcrumbEnd}>{route.breadcrumbName}</span> :
        <Link to={'/'+paths.join('/')} className={breadcrumbLink}>{route.breadcrumbName}</Link>
    }
    return (
      <div>
        {myRoutes.length > 1 && (
          <Breadcrumb className={breadcrumb} itemRender={itemRender} routes={myRoutes} />
        )}
      </div>
    )
  }
}
