import React from 'react';
import AdminTileContainer from 'components/admin/components/AdminTileContainer';
import PageBase from 'components/shared/pages/PageBase';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class AdminHome extends PageBase {

  constructor(props) {
    super(props);

    this.renderPage = this.renderPage.bind(this);
  }

  renderPage() {
    const query = this.GET_USER_ROLE;
    const role = this.props.client.readQuery({query}).CurrentUser[0].roleLevel;
    return (
      <div>
        <AdminTileContainer role={role} {...this.props}/>
      </div>
    );
  }
}