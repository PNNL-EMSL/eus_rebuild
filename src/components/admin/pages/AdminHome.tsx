import React from 'react';
import AdminTileContainer from 'components/admin/components/AdminTileContainer';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class AdminHome extends AdminPageBase {

  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    const query = this.GET_USER_ROLE;
    const role = this.props.client.readQuery({query}).CurrentUser[0].roleLevel;
    return (
      <div>
        <AdminTileContainer role={role} {...this.props}/>
      </div>
    );
  }
}