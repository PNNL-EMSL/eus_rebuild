import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CallTable from 'components/admin/components/manageCalls/CallTable';
import ManageCallsNew from 'components/admin/pages/manageCalls/New';
import moment from 'moment';
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
    data.id = allCalls.length + 1;
    data.callExtensions = [];
    data.reviewsOpen = false;
    allCalls.push(data);
    this.setState({allCalls});
  }

  renderContent() {
    const today = moment();
    const currentCalls = this.state.allCalls.filter((item) => (moment(item.callStartDate, 'MMMM DD, YYYY') < today && moment(item.callEndDate, 'MMMM DD, YYYY') > today));
    return (
      <div className={adminFormContentStyle}>
        <Tabs defaultActiveKey="1">
          <TabPane key="1" tab="Active Calls">
            <h3>Active Calls</h3>
            <CallTable calls={currentCalls} />
            <hr />
            <h3>Create New Call</h3>
            <ManageCallsNew addCall={this.addCall}/>
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
