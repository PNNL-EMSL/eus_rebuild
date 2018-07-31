import React from 'react';
import { css } from 'emotion';
import AdminHeader from 'components/admin/components/AdminHeader';
import AdminFooter from 'components/admin/components/AdminFooter';
// import AdminNav from 'components/admin/components/AdminNav';
import PageBase from 'components/shared/pages/PageBase';

const contentStyle: string = css`
  margin: 5px 20px 15px 100px;
  max-width: 958px;
`;

export default abstract class AdminPageBase extends PageBase {
  abstract renderContent();
  
  renderPage() {
    console.log('admin page base', this.props, this);
    const content = this.renderContent();
    return (
      <div>
        <AdminHeader {...this.props} logoutHandler={this.logoutHandler}/>
        <div className={contentStyle} >
          {content}
        </div>
        <AdminFooter {...this.props} />
      </div>
    )
  }
}