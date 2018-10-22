import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CurrentCalls from 'components/admin/pages/manageCalls/CurrentCalls';
import ManageCallsNew from 'components/admin/pages/manageCalls/New';
import { Tabs } from 'antd';
import { adminFormContentStyle } from 'styles/base';

const TabPane = Tabs.TabPane;

export default class ManageCallsHome extends AdminPageBase {
  constructor(props) {
    super(props);

    this.state = {
      allCalls: []
    }
  }



  renderContent() {
    // const currentCalls = this.state.allCalls.filter((item) => (item.callStartDate > 'today' && item.callEndDate < 'today'))
    return (
      <div className={adminFormContentStyle}>
        <Tabs defaultActiveKey="1">
          <TabPane key="1" tab="Active Calls">
            <div>
              List of all active calls
              <CurrentCalls />
              
            </div>
            <div>
              Form for adding a new call
              <ManageCallsNew />
            </div>
          </TabPane>
          <TabPane key="2" tab="All Calls">
            <div>
              List of ALL calls, not just active
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
