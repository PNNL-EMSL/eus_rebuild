import React, {Component} from 'react';
import {Select, Input} from 'antd';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class AntDesignSelect extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { displayOther: props.value === "other" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    if(value === 'other') {
      this.setState({displayOther: true});
    } else {
      this.setState({displayOther: false});
    }
    this.props.handleChange(value);
  }

  renderSubGroup(subGroup) {
    const content:JSX.Element[] = [];
    subGroup.forEach((subItem) => {
      content.push(<Option key={subItem.value} value={subItem.value}>{subItem.label}</Option>)
    })
    return content;
  }

  renderOptions() {
    const options:JSX.Element[] = [];
    this.props.optionList.forEach((item) => {
      if(item.subGroup !== undefined) {
        const content = this.renderSubGroup(item.subGroup);
        options.push(<OptGroup key={item.value} label={item.label}>{content}</OptGroup>);
      } else {
        options.push(<Option key={item.value} value={item.value}>{item.label}</Option>)
      }
    });
    return options;
  }

  render() {
    const options = this.renderOptions();
    const displayOther = this.state.displayOther;
    return(
      <div>
        <label>{this.props.label}</label>
        <Select
          style={{width: "75%", float: "right"}}
          placeholder = {this.props.placeholder}
          onChange={this.handleChange}
          defaultValue={this.props.value}
        >
          {options}
        </Select>
        {displayOther === true ? (
          <Input
            style={{width: "50%", float: "right", margin:"0 25%"}}
            placeholder="Please Specify..."
            onChange={this.props.handleInput}
          />
        ) : (<div />)}
      </div>
    )
  }

}