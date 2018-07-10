import React, {Component} from 'react';
import TableContainer from 'components/core/TableContainer';
import { css } from 'emotion';

const proposalsHeader: string = css`
  width: 48%
`;

export default class ProposalsContainer extends Component<any, any> {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <br />
        <div className={proposalsHeader}>
          <span>
            <div style={{float: 'left', fontSize: '18px'}}>Proposals</div>
            <button style={{float: 'right'}} >
              <i className="fa fa-plus-circle" /> Create New
            </button>
          </span>
        </div>
        <br />
        <br />
        <TableContainer headers={["Pending & Open", "Status"]} key="1" dataKey="1"/>
        <br />
        <TableContainer headers={["Saved", "Last Saved"]} key="2" dataKey="2"/>
      </div>
    );
  }
}