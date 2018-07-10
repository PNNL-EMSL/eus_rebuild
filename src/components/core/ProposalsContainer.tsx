import React, {Component} from 'react';
import TableContainer from 'components/core/TableContainer';

export default class ProposalsContainer extends Component<any, any> {

  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        <br />
        <div>
          <button >
            <i className="fa fa-plus-circle" /> Create New
          </button>
        </div>
        <TableContainer headers={["Pending & Open", "Status"]} key="1" dataKey="1"/>
        <br />
        <br />
        <TableContainer headers={["Saved", "Last Saved"]} key="2" dataKey="2"/>
      </div>
    );
  }
}