import React, {Component} from 'react';
import {Form, Button, DatePicker} from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

export default class CallExtensionForm extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      startDate: undefined,
      endDate: undefined
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.viewPriorExtensions = this.viewPriorExtensions.bind(this);
  }

  handleStartDateChange() {
    this.setState({startDate: 'yay'});
  }

  handleEndDateChange() {
    this.setState({endDate: 'yay'});
  }

  viewPriorExtensions() {
    const content:JSX.Element[] = [];
    this.props.callExtensions.forEach((extension) => {
      content.push(
        <div>
          {extension}
        </div>
      );
    });
    return content;
  }

  render() {
    const content = this.viewPriorExtensions();
    return (
      <div>
        <div>
          Previous Extensions
          {content}
        </div>
        <hr />
        <Form>
          <FormItem label="Start Date for extension">
            <RangePicker />
          </FormItem>
          <FormItem label="End Date for extension">
            <DatePicker />
          </FormItem>
          <Button type="primary">
            Submit
          </Button>
        </Form>
      </div>
    )
  }

}