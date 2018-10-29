import React, {Component} from 'react';
import {Form, Input, DatePicker, Button, Select } from 'antd';
import moment from 'moment';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import CallCriterionTable from 'components/admin/components/manageCalls/CallCriterionTable';
import CallValidator from 'components/shared/components/validator/CallValidator';
import FormError from 'components/shared/components/FormError';
import { buttonMargin } from 'styles/base';

import CallTypes from 'components/admin/components/manageCalls/CallTypes.json';
import CallThemes from 'components/admin/components/manageCalls/CallThemes.json';

const FormItem = Form.Item;
const Option = Select.Option;
// const dateFormat = 'MMMM DD, YYYY';
const textDateFormat = 'MM-DD-YYYY';

export default class ManageCallsNew extends Component<any, any> {
  static VALIDATOR = new CallValidator();

  constructor(props) {
    super(props);

    this.state = {
      call: this.props.callInfo,
      errors: []
    };

    this.handleCallTypeChange = this.handleCallTypeChange.bind(this);
    this.handleCallTypeOther = this.handleCallTypeOther.bind(this);
    this.handleCallThemeChange = this.handleCallThemeChange.bind(this);
    this.handleCallThemeOther = this.handleCallThemeOther.bind(this);
    this.handleScienceThemeChange = this.handleScienceThemeChange.bind(this);
    this.handleProposalIdChange = this.handleProposalIdChange.bind(this);
    this.handleProposalStartChange = this.handleProposalStartChange.bind(this);
    this.handleProposalDurationChange = this.handleProposalDurationChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleCriteriaAdd = this.handleCriteriaAdd.bind(this);
    this.handleCriteriaRemove = this.handleCriteriaRemove.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    
    this.addCall = this.addCall.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if ((nextProps.callInfo.id !== this.state.call.id) && (nextProps.callInfo.id !== undefined)) {
      this.setState({ call: nextProps.callInfo });
    }
  }

  handleCallTypeChange(callType) {
    const call = this.state.call;
    call.callType = callType;
    call.callTheme = undefined;
    call.callThemeOther = undefined;
    this.setState({call});
  }

  handleCallTypeOther(e) {
    const call = this.state.call;
    call.callTypeOther = e.target.value;
    this.setState({call});
  }

  handleCallThemeChange(callTheme) {
    const call = this.state.call;
    call.callTheme = callTheme;
    this.setState({call});
  }

  handleCallThemeOther(e) {
    const call = this.state.call;
    call.callThemeOther = e.target.value;
    this.setState({call});
  }

  handleScienceThemeChange(scienceTheme) {
    const call = this.state.call;
    call.scienceTheme = scienceTheme;
    this.setState({call})
  }

  handleProposalIdChange(e) {
    const call = this.state.call;
    call.proposalId = e.target.value;
    this.setState({call});
  }

  handleProposalDurationChange(e) {
    const call = this.state.call;
    call.proposalDuration = e.target.value;
    this.setState({call});
  }

  handleProposalDurTypeChange(e) {
    const call = this.state.call;
    call.proposalDurType = e;
    this.setState({call});
  }

  handleProposalStartChange(e) {
    const call = this.state.call;
    if(e) {
      call.proposalStart = e.format(textDateFormat);
    } else {
      call.proposalStart = undefined;
    }
    this.setState({call});
  }

  handleStartDateChange(e) {
    const call = this.state.call;
    if(e) {
      call.callStartDate = e.format(textDateFormat);
    } else {
      call.callStartDate = undefined;
    }
    this.setState({call});
  }

  handleEndDateChange(e) {
    const call = this.state.call;
    if(e) {
      call.callEndDate = e.format(textDateFormat);
    } else {
      call.callEndDate = undefined;
    }
    this.setState({call});
  }

  handleCriteriaAdd(data) {
    const call = this.state.call;
    const criteria = call.criteria;
    criteria.push(JSON.parse(JSON.stringify(data)));
    this.setState({call});
  }

  handleCriteriaRemove(data) {
    const call = this.state.call;
    const criteria = call.criteria;
    criteria.splice(criteria.findIndex((item) => (data.title === item.title)), 1);
    this.setState({call});
  }

  handleCriteriaChange(data) {
    const call = this.state.call;
    const criteria = call.criteria;
    criteria.splice(criteria.findIndex((item) => (data.id === item.id)), 1, data);
    this.setState({call});
  }
  
  addCall() {
    const errors = this.validateCall(this.state.call);
    if(errors.length === 0) {
      this.state.call.proposalDuration = this.convertFromMonths(this.state.call.proposalDuration, this.state.call.proposalDurType);
      this.props.addCall(this.state.call);
      this.clearState();
    }
    this.displayErrors(errors);
  }

  validateCall(call) {
    return ManageCallsNew.VALIDATOR.doValidate(call, 'callForm');
  }

  displayErrors(errors) {
    const errorArray:string[] = [];
    errors.forEach((error) => {
      errorArray[error.field] = error.tooltip;
    });
    this.setState({errors: errorArray});
  }

  clearState() {
    this.setState({
      call: {
        callType: undefined,
        callTypeOther: undefined,
        callTheme: undefined,
        callThemeOther: undefined,
        scienceTheme: undefined,
        proposalId: undefined,
        proposalStart: undefined,
        proposalDuration: undefined,
        proposalDurType: 'month',
        callStartDate: undefined,
        callEndDate: undefined,
        criteria: []
      },
      errors: []
    });
  }

  convertFromMonths(duration, type) {
    if(duration === undefined) {
      return undefined;
    }
    if(type === 'month') {
      return Number(duration);
    }
    return Number(duration)/12;
  }

  convertToMonths(duration, type) {
    if(duration === undefined) {
      return undefined;
    }
    if(type === 'year') {
      return Number(duration);
    }
    return Number(duration)*12;
  }

  render() {
    const data = this.state.call;
    const errors = this.state.errors;
    const proposalStart = data.proposalStart !== undefined ? moment(data.proposalStart, textDateFormat) : undefined;
    const callStart = data.callStartDate !== undefined ? moment(data.callStartDate, textDateFormat) : undefined;
    const callEnd = data.callEndDate !== undefined ? moment(data.callEndDate, textDateFormat) : undefined;
    const criteriaError = errors.criteria;
    const proposalDuration = this.convertFromMonths(data.proposalDuration, data.proposalDurType);
    const formItemLayout = {
      labelCol: {
        sm: { span: 11 },
      },
      wrapperCol: {
        sm: { span: 11 },
      },
    };
    return (
      <Form>
        <AntDesignSelect
          layout={formItemLayout}
          label="Call Type"
          placeholder="Select call type..."
          value={data.callType}
          otherValue={data.callTypeOther}
          handleChange={this.handleCallTypeChange}
          handleInput={this.handleCallTypeOther}
          optionList={CallTypes.CallTypes}
          validateSelect={errors && errors.callType}
          selectError={errors.callType}
          validateSelectOther={errors && errors.callTypeOther}
          selectOtherError={errors.callTypeOther}
        />
        <FormItem
          {...formItemLayout}
          label="Proposal ID"
        >
          <Input defaultValue={data.proposalId} onChange={this.handleProposalIdChange}/>
        </FormItem>
        {data.callType && (
          <AntDesignSelect
            layout={formItemLayout}
            label="Call Theme"
            placeholder="Select call theme..."
            value={data.callTheme}
            otherValue={data.callThemeOther}
            handleChange={this.handleCallThemeChange}
            handleInput={this.handleCallThemeOther}
            optionList={CallThemes[data.callType]}
            validateSelect={errors && errors.callTheme}
            selectError={errors.callTheme}
            validateSelectOther={errors && errors.callThemeOther}
            selectOtherError={errors.callThemeOther}
          />
        )}
        <AntDesignSelect
          layout={formItemLayout}
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
          validateSelect={errors && errors.scienceTheme}
          selectError={errors.scienceTheme}
        />
        <FormItem
          {...formItemLayout}
          label="Earliest Proposal Start Date"
          required={true}
          validateStatus={errors && errors.proposalStart ? 'error' : undefined}
        >
          <DatePicker format={textDateFormat} placeholder={textDateFormat} value={proposalStart} onChange={this.handleProposalStartChange} />
          {errors.proposalStart && (<FormError error={errors.proposalStart} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Maximum Proposal Duration for Call"
          required={true}
          validateStatus={errors && errors.proposalDuration ? 'error' : undefined}
        >
          <FormItem
            {...formItemLayout}
            label={<Input {...formItemLayout} value={proposalDuration} onChange={this.handleProposalDurationChange}/>}
          >
            <Select
              {...formItemLayout}
              value={data.proposalDurType}
              onChange={this.handleProposalDurTypeChange}
            >
              <Option value="month">Months</Option>
              <Option value="year">Years</Option>
            </Select>
          </FormItem>
          {errors.proposalDuration && (<FormError error={errors.proposalDuration} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          required={true}
          label="Start Date for the Call"
          validateStatus={errors && errors.callStartDate ? 'error' : undefined}
        >
          <DatePicker format={textDateFormat} placeholder={textDateFormat} value={callStart} onChange={this.handleStartDateChange} />
          {errors.callStartDate && (<FormError error={errors.callStartDate}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          required={true}
          label="End Date for the Call"
          validateStatus={errors && errors.callEndDate ? 'error' : undefined}
        >
          <DatePicker format={textDateFormat} placeholder={textDateFormat} value={callEnd} onChange={this.handleEndDateChange} />
          {errors.callEndDate && (<FormError error={errors.callEndDate}/>)}
        </FormItem>

        <h4>Call Criteria</h4>
        {criteriaError !== undefined && (
          <FormError error={criteriaError}/>
        )}
        <CallCriterionTable
          criteria={data.criteria}
          handleCriteriaChange={this.handleCriteriaChange}
          onAdd={this.handleCriteriaAdd}
          onRemove={this.handleCriteriaRemove}
        />
        <Button type="primary" className={buttonMargin} onClick={this.addCall}>Add Call</Button>
      </Form>
    )
  }
}