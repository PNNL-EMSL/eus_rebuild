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
        <td>{item.name}</td>
        <td><input defaultValue={item.usage}/>hours</td>
        <td><i className="fas fa-times-circle fa-2x" style={{color: colorRed}} onClick={this.removeHandler}/></td>
      </tr>
    )
  }
}