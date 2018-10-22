import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';

export default class CallCriterionRow extends Component<any, any>{
  constructor(props) {
    super(props);

    this.addCriterion = this.addCriterion.bind(this);
  }

  addCriterion() {
    this.props.addCriterion(this.props.data);
  }

  renderAdd(data) {
    return(
      <tr>
        <td><b>{data.title}</b></td>
        <td>{data.text}</td>
        <td>
          <i className="fas fa-plus-circle fa-2x" onClick={this.addCriterion}/>
        </td>
      </tr>
    );
  }

  renderFull(data) {
    return(
      <tr>
        <td><b>{data.title}</b></td>
        <td>{data.text}</td>
        <td>
          <Input defaultValue={data.weight} onChange={this.props.handleWeightChange} style={{width: '60px'}}/>%
        </td>
        <td>
          <Checkbox defaultChecked={data.panel} onChange={this.props.handlePanelReviewChange} />
        </td>
        <td>
          <i className="fas fa-times-circle fa-2x" onClick={this.props.removeCriterion}/>
        </td>
      </tr>
    );
  }

  render() {
    const data = this.props.data;
    return this.props.add ? this.renderAdd(data) : this.renderFull(data);
  }
}