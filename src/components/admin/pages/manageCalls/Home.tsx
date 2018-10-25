import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CallTable from 'components/admin/components/manageCalls/CallTable';
import ManageCallsNew from 'components/admin/pages/manageCalls/New';
import moment from 'moment';
import { Tabs } from 'antd';
import { adminFormContentStyle } from 'styles/base';

const TabPane = Tabs.TabPane;

const newCall = {
  id: undefined,
  callType: undefined,
  callTypeOther: undefined,
  callTheme: undefined,
  callThemeOther: undefined,
  scienceTheme: undefined,
  proposalId: undefined,
  proposalDuration: undefined,
  callStartDate: undefined,
  callEndDate: undefined,
  criteria: []
};

export default class ManageCallsHome extends AdminPageBase {
  constructor(props) {
    super(props);

    this.state = {
      allCalls: [],
      newCall,
      currentTab: '1'
    };

    this.addCall = this.addCall.bind(this);
    this.copyCall = this.copyCall.bind(this);
    this.updateTab = this.updateTab.bind(this);
  }

  addCall(data) {
    const allCalls = this.state.allCalls;
    data.id = allCalls.length + 1;
    data.callExtensions = [];
    data.reviewsOpen = false;
    allCalls.push(data);
    this.setState({allCalls, newCall});
  }

  copyCall(id) {
    const copyCall = JSON.parse(JSON.stringify(this.state.allCalls[this.state.allCalls.findIndex((item) => item.id === id)]));
    this.setState({newCall: copyCall, currentTab: '1'});
  }
  
  updateTab(currentTab) {
    this.setState({currentTab});
  }

  renderContent() {
    const today = moment();
    const call = JSON.parse(JSON.stringify(this.state.newCall));
    const currentCalls = this.state.allCalls.filter((item) => (moment(item.callStartDate, 'MMMM DD, YYYY') < today && moment(item.callEndDate, 'MMMM DD, YYYY') > today));
    return (
      <div className={adminFormContentStyle}>
        <Tabs activeKey={this.state.currentTab} onChange={this.updateTab}>
          <TabPane key="1" tab="Active Calls">
            <h3>Active Calls</h3>
            {currentCalls.length ? (
              <CallTable calls={currentCalls} onCopy={this.copyCall}/>
            ) : (
              <h4>No Currently Active Calls</h4>
            )}
            <hr />
            <h3>Create New Call</h3>
            <ManageCallsNew addCall={this.addCall} callInfo={call}/>
          </TabPane>
          <TabPane key="2" tab="All Calls">
            <div>
              {this.state.allCalls.length ? (
                <CallTable calls={this.state.allCalls} onCopy={this.copyCall}/>
              ) : (
                <h4>No Calls have been created. Please create one to proceed</h4>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
