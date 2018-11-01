import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';

export default class CallCriterionRow extends Component<any, any>{
  constructor(props) {
    super(props);

    this.addCriterion = this.addCriterion.bind(this);
    this.handlePanelChange = this.handlePanelChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.moveCriterionUp = this.moveCriterionUp.bind(this);
    this.moveCriterionDown = this.moveCriterionDown.bind(this);
  }

  addCriterion() {
    this.props.addCriterion(this.props.data);
  }

  handleWeightChange(e) {
    const data = this.props.data;
    data.weight = e.target.value;
    this.props.handleCriteriaChange(data);
  }

  handlePanelChange(e) {
    const data = this.props.data;
    data.panelReview = e.target.checked;
    this.props.handleCriteriaChange(data);
  }

  moveCriterionUp() {
    this.props.moveUp(this.props.itemIndex-1, this.props.itemIndex);
  }

  moveCriterionDown() {
    this.props.moveDown(this.props.itemIndex+1, this.props.itemIndex);
  }

  render() {
    const data = this.props.data;
    return(
      <tr>
        <td><b>{data.title}</b></td>
        <td>{data.text}</td>
        <td>
          <Input value={data.weight} disabled={this.props.add} onChange={this.handleWeightChange} style={{width: '60px'}}/>%
        </td>
        <td>
          <Checkbox checked={data.panel} disabled={this.props.add} onChange={this.handlePanelChange} />
        </td>
        <td>
          {this.props.add ?
            (<i className="fas fa-plus-circle fa-2x" onClick={this.addCriterion}/>)
            :
            (<i className="fas fa-times-circle fa-2x" onClick={this.props.removeCriterion}/>
            )}
        </td>
        {!this.props.add &&
          (<td>
            {!this.props.first && (<i className="fas fa-arrow-circle-up" onClick={this.moveCriterionUp}/>)}
            {!this.props.last && (<i className="fas fa-arrow-circle-down" onClick={this.moveCriterionDown}/>)}
          </td>)
        }
      </tr>
    );
  }
}