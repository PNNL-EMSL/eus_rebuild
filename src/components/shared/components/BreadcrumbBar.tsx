import React, {Component} from 'react';

import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import {css} from 'emotion';
import {colorLightOrange, colorDisabled} from 'styles/base';

const breadcrumb:string = css`
  position: relative;
  top: 95px;
  left: 20px;
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
    const myRoutes:any[] = []
    this.props.location.pathname.split('/').filter((pathPiece) => (pathPiece.length > 0)).forEach((path) => (myRoutes.push({path})));

    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      const labelPieces:any[] = [];
      route.path.split('_').forEach((word) => (labelPieces.push(word.charAt(0).toUpperCase() + word.slice(1))));
      const label = labelPieces.join(' ');
      return last ?
        <span className={breadcrumbEnd}>{label}</span> :
        <Link to={'/'+paths.join('/')} className={breadcrumbLink}>{label}</Link>
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