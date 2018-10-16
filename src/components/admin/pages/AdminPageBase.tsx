import React from 'react';
import AdminHeader from 'components/admin/components/AdminHeader';
import AdminNav from 'components/admin/components/AdminNav';
import PageBase from 'components/shared/pages/PageBase';
import BreadcrumbBar from 'components/shared/components/BreadcrumbBar';
import {adminContentStyle} from 'styles/base';


export default abstract class AdminPageBase extends PageBase {
  abstract renderContent();
  
  renderPage() {
    console.log('admin page base', this.props, this);
    const content = this.renderContent();
    return (
      <div>
        <AdminHeader {...this.props} logoutHandler={this.logoutHandler}/>
        <div >
          <AdminNav {...this.props} pathname={this.props.location.pathname} direction="horizontal"/>
          <div className={adminContentStyle} >
            <BreadcrumbBar {...this.props} />
            {content}
          </div>
        </div>
      </div>
    )
  }
}