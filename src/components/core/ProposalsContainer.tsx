import React, {Component} from 'react';
import TableContainer from 'components/core/TableContainer';


export default class ProposalsContainer extends Component<any, any> {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
        <div>
          <button >
            <i className="fa fa-plus-circle green" /> Create New
          </button>
        </div>
        <TableContainer />
      </div>
    );
  }
}