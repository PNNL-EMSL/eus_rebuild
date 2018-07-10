import React, { Component } from 'react';
import TableRow from 'components/core/TableRow';
import { css } from 'emotion';

const table: string = css`
  width: 48%;
  text-align: center;
`;

export default class TableContainer extends Component<any, any> {

  tableData = {
    1: [{title: "Test Title", propNumber: 50421, status: "Pending Approval", lastSaved: "Jul 09, 2018"}],
    2: [{title: "Untitled", propNumber: null, status: "unsaved", lastSaved: "Jul 09, 2018"}],
  };

  tableCells = {
    1: ['title', 'status'],
    2: ['title', 'lastSaved']
  };

  constructor(props) {
    super(props);

  }

  render() {
    const data = this.tableData[this.props.dataKey];
    const headers = this.props.headers;
    const tableCells = this.tableCells[this.props.dataKey];
    console.log('tableData', this.tableData, this.props.key);
    return (
      <table className={table}>
        <thead>
        <tr>
          {Object.keys(headers).map((hKey) => {
            console.log('headers: ', headers[hKey]);
            return(
              <th key={hKey}>{headers[hKey]}</th>
            );
          })}
        </tr>
        </thead>
        {Object.keys(data).map((key) => {
          console.log('data: ', data);
          return (
            <TableRow key={key} rowData={data[key]} tableCells={tableCells} />
          );
        })}
      </table>
    );
  }
}