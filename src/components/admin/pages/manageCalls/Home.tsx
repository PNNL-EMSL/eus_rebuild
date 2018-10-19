import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CurrentCalls from 'components/admin/pages/manageCalls/CurrentCalls';
import ManageCallsNew from 'components/admin/pages/manageCalls/New';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class ManageCallsHome extends AdminPageBase {
  constructor(props) {
    super(props);
  }

  renderContent() {


    // Tabbed view: 2 tabs,
    //    first with current/new calls,
    //    second with a list of all calls
    // get list of current calls
    // show the form for adding a new call
    console.log('rendering manageCallsHome');

    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Active Calls">
            <div>
              List of all active calls
              <CurrentCalls />
              
            </div>
            <div>
              Form for adding a new call
              <ManageCallsNew />
            </div>
          </TabPane>
          <TabPane tab="All Calls">
            <div>
              List of ALL calls, not just active
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
