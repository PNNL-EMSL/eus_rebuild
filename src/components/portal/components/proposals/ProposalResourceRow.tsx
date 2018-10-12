import React, { Component } from 'react';
import {colorRed} from 'styles/base';

export default class ProposalResourceRow extends Component<any, any>{
  constructor(props) {
    super(props);

    this.removeHandler = this.removeHandler.bind(this);
  }

  removeHandler() {
    console.log('removeHandler');
    this.props.removeHandler(this.props.item.name);
  }

  render() {
    const item = this.props.item;
    return (
      <tr key={item.name}>
        <td><div style={{margin: '5px'}}>{item.name}</div></td>
        <td style={{width: '270px'}}><input style={{margin:'5px'}} defaultValue={item.usage}/>hours</td>
        <td style={{width: '50px'}}><i className="fas fa-minus-circle fa-2x" style={{color: colorRed, margin: '5px'}} onClick={this.removeHandler}/></td>
      </tr>
    )
  }
}