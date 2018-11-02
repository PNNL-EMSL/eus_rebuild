import React, {Component} from 'react';
import FormError from 'components/shared/components/FormError';
import {Form, Button, DatePicker} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const textDateFormat = 'MM-DD-YYYY';

export default class CallExtensionForm extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      startDate: undefined,
      endDate: undefined,
      errorText: ''
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.addExtension = this.addExtension.bind(this);
    this.viewPriorExtensions = this.viewPriorExtensions.bind(this);
  }

  handleStartDateChange(e) {
    let date;
    if(e) {
      date = e.format(textDateFormat);
    } else {
      date = undefined;
    }
    this.setState({startDate: date});
  }

  handleEndDateChange(e) {
    let date;
    if(e) {
      date = e.format(textDateFormat);
    } else {
      date = undefined;
    }
    this.setState({endDate: date});
  }

  isUniqueExtensionRange(startDate, endDate) {
    let isValid = true;
    this.props.callExtensions.forEach((extension) => {
      // If the start date or end date are covered by another extension, not valid.
      if(moment(extension.startDate).isBetween(startDate, endDate) ||
         moment(extension.endDate).isBetween(startDate, endDate)) {
        isValid = false;
      }
    });
    return isValid;
  }

  addExtension() {
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    if(moment(startDate).isBefore(endDate) &&
       this.isUniqueExtensionRange(startDate, endDate) &&
       moment(startDate).isAfter(this.props.endDate)) {
      this.props.onAdd({startDate, endDate});
      this.setState({startDate: undefined, endDate: undefined, errorText: ''});
    } else if(!moment(startDate).isBefore(endDate)) {
      this.setState({errorText: "Start date for the extension must be before the end date"});
    } else if(!this.isUniqueExtensionRange(startDate, endDate)) {
      this.setState({errorText: "Extension date range already at least partially covered. Please correct to be a unique date range"});
    } else {
      this.setState({errorText: "Start date for the extension must be after the end date of the original call duration ("+this.props.endDate+")"});
    }
  }
  
  viewPriorExtensions() {
    const content:JSX.Element[] = [];
    this.props.callExtensions.forEach((extension) => {
      content.push(
        <div>
          {extension.startDate} ~ {extension.endDate}
        </div>
      );
    });
    return content;
  }

  render() {
    const content = this.viewPriorExtensions();
    const formItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const startDate = this.state.startDate !== undefined ? moment(this.state.startDate, textDateFormat) : undefined;
    const endDate = this.state.endDate !== undefined ? moment(this.state.endDate, textDateFormat) : undefined;
    return (
      <div>
        <div>
          Previous Extensions
          {content}
        </div>
        <hr />
        <Form layout="inline">
          <FormItem
            {...formItemLayout}
            required={true}
            colon={true}
            label="Extension Start">
            <DatePicker onChange={this.handleStartDateChange} value={startDate} placeholder={textDateFormat} format={textDateFormat}/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            required={true}
            colon={true}
            label="Extension End">
            <DatePicker onChange={this.handleEndDateChange} value={endDate} placeholder={textDateFormat} format={textDateFormat}/>
          </FormItem>
        </Form>
        <hr />
        {this.state.errorText !== '' && (
          <FormError error={this.state.errorText} />
        )}
        <Button type="primary" onClick={this.addExtension}>
          Submit
        </Button>
      </div>
    )
  }

}