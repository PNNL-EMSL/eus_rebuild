import React, { Component } from 'react';

export default class TableRow extends Component <any, any>{

  constructor(props) {
    super(props);

  }
  
  render() {
    const tableCells = this.props.tableCells;
    const rowData = this.props.rowData;
    // const propNumber = rowData.propNumber;
    return (
      <tbody>
        <tr>
          {Object.keys(tableCells).map((key) => {
            return(
              <td key={key}>{rowData[tableCells[key]]}</td>
            );
          })}
        </tr>
        <tr>
          <td>Proposal #{rowData.propNumber ? rowData.propNumber : 'Pending'}</td>
        </tr>
      </tbody>
    )
  }
}