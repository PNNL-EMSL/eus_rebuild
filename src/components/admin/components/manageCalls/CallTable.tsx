import React, {Component} from 'react';
import CallRow from 'components/admin/components/manageCalls/CallRow';

export default class CallTable extends Component<any, any> {
  constructor(props) {
    super(props);
    this.renderCalls = this.renderCalls.bind(this);
  }

  renderCalls() {
    const rows:JSX.Element[] = [];
    let index = 0;
    this.props.calls.forEach((call) => {
      rows.push(
        <CallRow key={index++} call={call}/>
      )
    });
    return rows;
  }

  render() {
    const currentCallContent = this.renderCalls();

    return(
      <div>
        {currentCallContent.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead>
            <tr>
              <th>ID</th>
              <th>Call Name</th>
              <th>Duration (yr.)</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Proposal ID</th>
              <th># of Extensions</th>
              <th />
              <th />
              <th />
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