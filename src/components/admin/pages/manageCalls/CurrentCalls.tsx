import React, {Component} from 'react';

export default class CurrentCalls extends Component<any, any> {
  constructor(props) {
    super(props);

    this.getCurrentCalls = this.getCurrentCalls.bind(this);
  }

  getCurrentCalls() {

    return [];
  }

  render() {
    const currentCallContent = this.getCurrentCalls();

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