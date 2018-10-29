import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CallTable from 'components/admin/components/manageCalls/CallTable';
import ManageCallsNew from 'components/admin/pages/manageCalls/New';
import moment from 'moment';
import { Tabs, Button, Modal } from 'antd';
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
  proposalStart: undefined,
  proposalDuration: undefined,
  proposalDurType: 'month',
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
      currentTab: '1',
      createNewVisible: false
    };

    this.openNewCall = this.openNewCall.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addCall = this.addCall.bind(this);
    this.copyCall = this.copyCall.bind(this);
    this.updateTab = this.updateTab.bind(this);
  }

  openNewCall() {
    this.setState({createNewVisible: true});
  }

  closeModal() {
    this.setState({createNewVisible: false});
  }

  addCall(data) {
    const allCalls = this.state.allCalls;
    data.id = allCalls.length + 1;
    data.callExtensions = [];
    data.numProposals = 0;
    data.reviewsOpen = false;
    allCalls.push(data);
    this.setState({allCalls, newCall, createNewVisible: false});
  }

  copyCall(id) {
    const copyCall = JSON.parse(JSON.stringify(this.state.allCalls[this.state.allCalls.findIndex((item) => item.id === id)]));
    // We need to remove the old dates for the new call creation.
    copyCall.callStartDate = undefined;
    copyCall.callEndDate = undefined;
    copyCall.proposalStart = undefined;
    this.setState({newCall: copyCall, createNewVisible: true});
  }
  
  updateTab(currentTab) {
    this.setState({currentTab});
  }

  renderContent() {
    const today = moment();
    const call = JSON.parse(JSON.stringify(this.state.newCall));
    const currentCalls = this.state.allCalls.filter((item) => (moment(item.callStartDate).isSameOrBefore(today) && moment(item.callEndDate).isSameOrAfter(today)));
    return (
      <div className={adminFormContentStyle}>
        <Button type='primary' onClick={this.openNewCall}>Create New Call</Button>
        <Modal
          title="Create New Call"
          visible={this.state.createNewVisible}
          footer={null}
          onCancel={this.closeModal}
          width={900}
        >
          <ManageCallsNew addCall={this.addCall} callInfo={call}/>
        </Modal>
        <Tabs activeKey={this.state.currentTab} onChange={this.updateTab}>
          <TabPane key="1" tab="Active Calls">
            {currentCalls.length ? (
              <CallTable calls={currentCalls} onCopy={this.copyCall}/>
            ) : (
              <h4>No Currently Active Calls</h4>
            )}
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
