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
              <th style={{minWidth: '42px', maxWidth: '42px'}} >ID</th>
              <th>Call Name</th>
              <th style={{minWidth: '80px', maxWidth: '80px'}} >Duration (yr.)</th>
              <th style={{minWidth: '150px', maxWidth: '175px'}} >Start Date</th>
              <th style={{minWidth: '150px', maxWidth: '175px'}} >End Date</th>
              <th style={{minWidth: '100px', maxWidth: '100px'}} >Proposal ID</th>
              <th style={{minWidth: '100px', maxWidth: '100px'}} ># of Extensions</th>
              <th style={{minWidth: '105px', maxWidth: '105px'}}  />
              <th style={{minWidth: '105px', maxWidth: '105px'}}  />
              <th style={{minWidth: '105px', maxWidth: '105px'}}  />
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