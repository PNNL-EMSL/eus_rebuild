import React, {Component} from 'react';

import CallTypes from 'components/admin/components/manageCalls/CallTypes.json';
import CallThemes from 'components/admin/components/manageCalls/CallThemes.json';

export default class CallTable extends Component<any, any> {
  constructor(props) {
    super(props);

    this.renderCalls = this.renderCalls.bind(this);
  }

  createCallTitle(call) {
    let title = '';
    const CALL_TYPES = CallTypes.CallTypes;
    const CALL_THEMES = CallThemes[call.callType];
    if(call.callType === 'other') {
      title += call.callTypeOther;
    } else {
      title += CALL_TYPES[CALL_TYPES.findIndex((callType) => (callType.value === call.callType))].label;
    }
    title += ':';
    if(call.callTheme === 'other') {
      title += call.callThemeOther;
    } else {
      title += CALL_THEMES[CALL_THEMES.findIndex((callTheme) => (callTheme.value === call.callTheme))].label;
    }
    return title;
  }

  renderCalls() {
    const rows:JSX.Element[] = [];
    let index = 0;
    this.props.calls.forEach((call) => {
      const callTitle = this.createCallTitle(call);
      rows.push(
        <tr key={index++}>
          <td>{call.id}</td>
          <td>{callTitle}</td>
          <td>{call.proposalDuration}</td>
          <td>{call.callStartDate}</td>
          <td>{call.callEndDate}</td>
          <td>{call.proposalId}</td>
          <td>{call.callExtensions}</td>
          <td>Manage Criterion</td>
          <td>Manage Extensions</td>
          <td>Close Reviews</td>
        </tr>
      )
    });
    return rows;
  }

  render() {
    const currentCallContent = this.renderCalls();

    return(
      <div>
        {currentCallContent.length > 0 ? (
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Call Name</th>
              <th>Duration (yr.)</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Proposal ID</th>
            </tr>
            </thead>
            <tbody>
              {currentCallContent}
            </tbody>
          </table>
        ) : (
          <div/>
        )}
      </div>
    )
  }
}