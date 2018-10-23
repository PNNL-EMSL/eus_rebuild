import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CallTable from 'components/admin/components/manageCalls/CallTable';
import ManageCallsNew from 'components/admin/pages/manageCalls/New';
import { Tabs } from 'antd';
import { adminFormContentStyle } from 'styles/base';

const TabPane = Tabs.TabPane;

export default class ManageCallsHome extends AdminPageBase {
  constructor(props) {
    super(props);

    this.state = {
      allCalls: []
    };

    this.addCall = this.addCall.bind(this);
  }

  addCall(data) {
    const allCalls = this.state.allCalls;
    allCalls.push(data);
    this.setState({allCalls});
  }

  renderContent() {
    const currentCalls = this.state.allCalls.filter((item) => (item.callStartDate > 'today' && item.callEndDate < 'today'))
    return (
      <div className={adminFormContentStyle}>
        <Tabs defaultActiveKey="1">
          <TabPane key="1" tab="Active Calls">
            <div>
              List of all active calls
              <CallTable calls={currentCalls} />
              
            </div>
            <div>
              Form for adding a new call
              <ManageCallsNew addCall={this.addCall}/>
            </div>
          </TabPane>
          <TabPane key="2" tab="All Calls">
            <div>
              List of ALL calls, not just active
              <CallTable calls={this.state.allCalls} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
