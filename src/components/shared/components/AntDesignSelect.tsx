import React, {Component} from 'react';
import {Select, Input} from 'antd';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class AntDesignSelect extends Component<any, any> {

  static defaultProps = {
    multiple: false
  };

  constructor(props) {
    super(props);

    this.state = { displayOther: ((!props.multiple && props.value === "other") || (props.multiple && props.value.includes("other"))) };
    this.handleChange = this.handleChange.bind(this);
    console.log('reconstructed');
  }

  handleChange(value) {
    if((!this.props.multiple && value === "other") || (this.props.multiple && value.includes("other"))) {
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
    console.log('rerendered');
    return(
      <div>
        <label>{this.props.label}</label>
        <Select
          style={{width: "75%", float: "right"}}
          placeholder = {this.props.placeholder}
          onChange={this.handleChange}
          mode={this.props.multiple ? 'multiple' : 'default'}
          defaultValue={this.props.value}
        >
          {options}
        </Select>
        {displayOther === true ? (
          <Input
            style={{width: "50%", float: "right", margin:"0 25%"}}
            placeholder="Please Specify..."
            onChange={this.props.handleInput}
            defaultValue={this.props.otherValue}
          />
        ) : (<div />)}
      </div>
    )
  }

}