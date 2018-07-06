import React, { Component } from 'react';
import TableRow from 'components/core/TableRow';

export default class TableContainer extends Component<any, any> {

  constructor(props) {
    super(props);

  }

  render() {
    const data = [];
    return (
      <div>
        {Object.keys(data).map((key) => {
          console.log(key);
          return (
            <TableRow key="1" />
          );
        })}
      </div>
    )
  }
}