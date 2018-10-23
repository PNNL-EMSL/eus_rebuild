import React, {Component} from 'react';
import {Select, Input, Form} from 'antd';
import FormError from 'components/shared/components/FormError';

const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class AntDesignSelect extends Component<any, any> {

  static defaultProps = {
    multiple: false,
    layout: {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = { displayOther: ((!props.multiple && props.value === "other") || (props.multiple && props.value.includes("other"))) };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, option) {
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
    });
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
      <FormItem {...this.props.layout} label={this.props.label} required={true} validateStatus={this.props.validateSelect ? 'error' : undefined} >
        <Select
          placeholder = {this.props.placeholder}
          onChange={this.handleChange}
          mode={this.props.multiple ? 'multiple' : 'default'}
          defaultValue={this.props.value}
        >
          {options}
        </Select>
        {this.props.selectError && (<FormError error={this.props.selectError} />)}
        {displayOther === true && (
          <FormItem validateStatus={this.props.validateSelectOther ? 'error' : undefined}>
            <Input
              placeholder="Please Specify..."
              onChange={this.props.handleInput}
              defaultValue={this.props.otherValue}
            />
            {this.props.selectOtherError && (<FormError error={this.props.selectOtherError} />)}
          </FormItem>
        )}
      </FormItem>
    )
  }

}