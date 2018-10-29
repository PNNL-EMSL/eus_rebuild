import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
// import ReviewsLoad from 'components/portal/pages/reviews/Load';
// import ReviewsNew from 'components/portal/pages/reviews/New';
// import { Button } from 'antd'

import {portalContentStyle} from 'styles/base';

export default class ReviewsHome extends PortalPageBase {
  constructor(props) {
    super(props);

  }

  renderContent() {
    return (<div className={portalContentStyle} />)
  }
}