import React from 'react';
import { css } from 'emotion';
import AdminHeader from 'components/admin/components/AdminHeader';
import AdminFooter from 'components/admin/components/AdminFooter';
import AdminNav from 'components/admin/components/AdminNav';
import PageBase from 'components/shared/pages/PageBase';

const contentStyle: string = css`
  margin: 5px 20px 15px 30px;
  max-width: 958px;
  vertical-align: top;
`;

const navStyle: string = css`
  display: inline-block;
`

export default abstract class AdminPageBase extends PageBase {
  abstract renderContent();
  
  renderPage() {
    console.log('admin page base', this.props, this);
    const content = this.renderContent();
    return (
      <div>
        <AdminHeader {...this.props} logoutHandler={this.logoutHandler}/>
        <div>
          <span>
            <div className={navStyle}>
              <AdminNav {...this.props} pathname={this.props.location.pathname} direction="horizontal"/>
            </div>
            <div className={contentStyle} >
              {content}
            </div>
          </span>
        </div>
        <AdminFooter {...this.props} />
      </div>
    )
  }
}