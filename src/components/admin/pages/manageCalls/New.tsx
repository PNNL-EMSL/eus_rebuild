import React, {Component} from 'react';
import {Form, Input, DatePicker} from 'antd';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import CallTypes from 'components/admin/pages/manageCalls/CallTypes.json';
import CallThemes from 'components/admin/pages/manageCalls/CallThemes.json';

const FormItem = Form.Item;

export default class ManageCallsNew extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      callType: undefined,
      callTypeOther: undefined,
      callTheme: undefined,
      callThemeOther: undefined,
      scienceTheme: undefined,
      proposalId: undefined,
    };

    this.handleCallTypeChange = this.handleCallTypeChange.bind(this);
    this.handleCallTypeOther = this.handleCallTypeOther.bind(this);
    this.handleCallThemeChange = this.handleCallThemeChange.bind(this);
    this.handleCallThemeOther = this.handleCallThemeOther.bind(this);
    this.handleScienceThemeChange = this.handleScienceThemeChange.bind(this);
    this.handleProposalIdChange = this.handleProposalIdChange.bind(this);
    this.handleProposalDurationChange = this.handleProposalDurationChange.bind(this);
    this.handleCallStartDateChange = this.handleCallStartDateChange.bind(this);
    this.handleCallEndDateChange = this.handleCallEndDateChange.bind(this);

  }

  handleCallTypeChange(callType) {
    this.setState({callType, callTheme: undefined, callThemeOther: undefined});
  }

  handleCallTypeOther(e) {
    const callTypeOther = e.target.value;
    this.setState({callTypeOther});
  }

  handleCallThemeChange(callTheme) {
    this.setState({callTheme});
  }

  handleCallThemeOther(e) {
    const callThemeOther = e.target.value;
    this.setState({callThemeOther});
  }

  handleScienceThemeChange(scienceTheme) {
    this.setState({scienceTheme})
  }

  handleProposalIdChange(e) {
    const proposalId = e.target.value;
    this.setState({proposalId});
  }

  handleProposalDurationChange(e) {
    const proposalDuration = e.target.value;
    this.setState({proposalDuration});
  }

  handleCallStartDateChange(e) {
    const callStartDate = e.target.value;
    this.setState({callStartDate});
  }

  handleCallEndDateChange(e) {
    const callEndDate = e.target.value;
    this.setState({callEndDate});
  }

  render() {
    const data = this.state;
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    return (
      <Form>
        <AntDesignSelect
          label="Call Type"
          placeholder="Select call type..."
          value={data.callType}
          otherValue={data.callTypeOther}
          handleChange={this.handleCallTypeChange}
          handleInput={this.handleCallTypeOther}
          optionList={CallTypes.CallTypes}
        />
        <FormItem {...formItemLayout} label="Proposal ID" >
          <Input defaultValue={data.proposalId} onChange={this.handleProposalIdChange}/>
        </FormItem>
        {data.callType && (
          <AntDesignSelect
            label="Call Theme"
            placeholder="Select call theme..."
            value={data.callTheme}
            otherValue={data.callThemeOther}
            handleChange={this.handleCallThemeChange}
            handleInput={this.handleCallThemeOther}
            optionList={CallThemes[data.callType]}
          />
        )}
        <AntDesignSelect
          label="Science Theme"
          placeholder="Select Science theme..."
          value={data.scienceTheme}
          handleChange={this.handleScienceThemeChange}
          optionList={
            [
              {value: 'biological', label: 'Biological Sciences'},
              {value: 'environmental', label: 'Environmental Sciences'},
              {value: 'other', label: 'Other'}
            ]
          }
        />
        <FormItem {...formItemLayout} label="Maximum Proposal Duration for Call">
          <Input defaultValue={data.proposalDuration} onChange={this.handleProposalDurationChange}/>
        </FormItem>
        <FormItem {...formItemLayout} label="Call Start Date">
          <DatePicker defaultValue={data.callStartDate} onChange={this.handleCallStartDateChange}/>
        </FormItem>
        <FormItem {...formItemLayout} label="Call End Data">
          <DatePicker defaultValue={data.callEndDate} onChange={this.handleCallEndDateChange}/>
        </FormItem>
      </Form>
    )
  }
}