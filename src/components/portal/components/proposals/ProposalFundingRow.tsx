import React, { Component } from 'react';

export default class ProposalFundingRow extends Component<any, any>{
  constructor(props) {
    super(props);

    this.updateHandler = this.updateHandler.bind(this);
  }

  updateHandler(e) {
    this.props.updateHandler(this.props.item.name, e.target.value);
  }

  render() {
    const item = this.props.item;
    return (
      <tr key={item.name}>
        <td>
          <div style={{margin: '5px'}}>
            {item.label}
          </div>
        </td>
        <td style={{width: '300px'}}>
          Grant Number #:
          <input style={{margin:'5px'}} defaultValue={item.grant} onChange={this.updateHandler}/>
        </td>
      </tr>
    )
  }
}