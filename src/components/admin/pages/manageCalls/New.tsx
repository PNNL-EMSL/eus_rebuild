import React, {Component} from 'react';
import {Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import CallCriterionTable from 'components/admin/components/manageCalls/CallCriterionTable';
import CallValidator from 'components/shared/components/validator/CallValidator';
import FormError from 'components/shared/components/FormError';
import { buttonMargin } from 'styles/base';

import CallTypes from 'components/admin/components/manageCalls/CallTypes.json';
import CallThemes from 'components/admin/components/manageCalls/CallThemes.json';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'MMMM DD, YYYY';

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
    this.handleProposalDurationChange = this.handleProposalDurationChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleDateChange(e) {
    const call = this.state.call;
    if(e.length) {
      call.callStartDate = e[0].format(dateFormat);
      call.callEndDate = e[1].format(dateFormat);
    } else {
      call.callStartDate = undefined;
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
  }
  
  addCall() {
    const errors = this.validateCall(this.state.call);
    if(errors.length === 0) {
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
        proposalDuration: undefined,
        callStartDate: undefined,
        callEndDate: undefined,
        criteria: []
      },
      errors: []
    });
  }

  render() {
    const data = this.state.call;
    const errors = this.state.errors;
    const moments:any[] = [];
    moments.push(data.callStartDate !== undefined ? moment(data.callStartDate, dateFormat) : undefined);
    moments.push(data.callEndDate !== undefined ? moment(data.callEndDate, dateFormat) : undefined);
    const criteriaError = errors.criteria;
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
          label="Maximum Proposal Duration for Call (years)"
          required={true}
          validateStatus={errors && errors.proposalDuration ? 'error' : undefined}
        >
          <Input value={data.proposalDuration} onChange={this.handleProposalDurationChange}/>
          {errors.proposalDuration && (<FormError error={errors.proposalDuration} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          required={true}
          label="Dates for the Call"
          validateStatus={errors && errors.callStartDate ? 'error' : undefined}
        >
          <RangePicker value={moments} onChange={this.handleDateChange} />
          {((errors.callStartDate || errors.callEndDate) && errors.callStartDate) ?
            (<FormError error={errors.callStartDate}/>) :
            (<FormError error={errors.callEndDate} />)
          }
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