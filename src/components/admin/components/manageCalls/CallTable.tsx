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
        <CallRow key={index++} call={call} onCopy={this.props.onCopy}/>
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
              <th style={{minWidth: '100px', maxWidth: '100px'}} >Proposal ID</th>
              <th style={{minWidth: '100px', maxWidth: '100px'}} ># of Extensions</th>
              <th style={{minWidth: '105px', maxWidth: '105px'}}  />
              <th style={{minWidth: '105px', maxWidth: '105px'}}  />
              <th style={{minWidth: '105px', maxWidth: '105px'}}  />
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