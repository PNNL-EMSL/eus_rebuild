import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProposalTypeSelect from 'components/portal/components/proposals/ProposalTypeSelect';
import ResearchAreas from 'components/portal/components/proposals/ResearchAreas.json';
import ProposalTypes from 'components/portal/components/proposals/ProposalTypes.json';
import moment from 'moment';
import {DatePicker, Input, Radio, Form} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

export default class DetailsForm extends WizardPage {
  static defaultProps = {
    title: "Proposal Information",
    description: "Provide some basic information about your proposal"
  };

  constructor(props) {
    super(props);

    this.state = this.props.detailsData;
    props.wizardInstance.beforeNext = this.beforeNext;
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleAreaOther = this.handleAreaOther.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAbstractChange = this.handleAbstractChange.bind(this);
    this.handleProposalPayChange = this.handleProposalPayChange.bind(this);
    this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
    this.handleProposalThemeChange = this.handleProposalThemeChange.bind(this);
    this.handleProposalReasonChange = this.handleProposalReasonChange.bind(this);
    this.handleProposalRestrictedChange = this.handleProposalRestrictedChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNsfChange = this.handleNsfChange.bind(this);
    this.handleEmslChange = this.handleEmslChange.bind(this);
    this.handlePocChange = this.handlePocChange.bind(this);
  }

  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    const errors = this.props.Validator.doValidate(data, 'detailsForm');
    const existingErrors = this.props.proposalErrors;
    existingErrors.detailsErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
    this.validatePage(this.state);
    this.props.updateData('detailsData', this.state);
  };
  
  handleAreaChange(researchArea) {
    this.setState({researchArea});
  }
  handleAreaOther(e) {
    const researchAreaOther = e.target.value;
    this.setState({researchAreaOther});
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({title});
  }

  handleAbstractChange(e) {
    const abstract = e.target.value;
    this.setState({abstract});
  }

  handleProposalTypeChange(proposalType) {
    this.setState({proposalType});
  }

  handleProposalPayChange(proposalPay) {
    this.setState({proposalPay});
  }

  handleProposalRestrictedChange(proposalRestricted) {
    this.setState({proposalRestricted});
  }

  handleProposalThemeChange(proposalTheme) {
    this.setState({proposalTheme});
  }

  handleProposalReasonChange(proposalReason) {
    this.setState({proposalReason});
  }

  handleDateChange(startDate) {
    startDate = startDate.format('MMMM DD, YYYY');
    this.setState({startDate});
  }

  handleNsfChange(e) {
    const nsfRequest = e.target.value;
    this.setState({nsfRequest});
  }

  handleEmslChange(e) {
    const emslStaff = e.target.value;
    this.setState({emslStaff});
  }

  handlePocChange(labPOC) {
    this.setState({labPOC});
  }

  renderForm() {
    const data = this.props.data;
    console.log('renderForm detailsForm');
    return (
      <div>
        <DetailsForm data={data}/>
      </div>
    )
  }

  render() {
    const data = this.state;
    const dateFormat = 'MMMM DD, YYYY';
    const startDate = data.startDate !== undefined ? moment(data.startDate, dateFormat) : undefined;
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    const radioItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const errors = this.props.proposalErrors.detailsErrors;
    return(
      <div>
        <Form>
            <AntDesignSelect
              label='Primary Research Area'
              placeholder="Select primary research area..."
              optionList={ResearchAreas.ResearchAreas}
              value={data.researchArea}
              otherValue={data.researchOther}
              handleChange={this.handleAreaChange}
              handleInput={this.handleAreaOther}
              validateSelect={errors && errors.some((error) => (error.field === 'researchArea'))}
              validateSelectOther={errors && errors.some((error) => (error.field === 'researchOther'))}
              required={true}
            />
          <FormItem 
            {...formItemLayout} 
            label="Title" 
            required={true}
            validateStatus={errors && errors.some((error) => (error.field === 'title')) === true ? 'error' : undefined}
          >
            <TextArea defaultValue={data.title} onChange={this.handleTitleChange} autosize />
          </FormItem>
          <FormItem 
            {...formItemLayout} 
            label="Abstract (approx 500 words)" 
            required={true}
            validateStatus={errors && errors.some((error) => (error.field === 'abstract')) === true ? 'error' : undefined}
          >
            <TextArea defaultValue={data.abstract} onChange={this.handleAbstractChange} autosize />
          </FormItem>
          <FormItem 
            {...formItemLayout} 
            label="Proposed Research (pdf doc)" 
            required={true}
          >
            TO BE IMPLEMENTED
          </FormItem>
          <hr />
            <ProposalTypeSelect
              label='Proposal Type '
              placeholder="Select proposal type..."
              optionList={ProposalTypes.ProposalTypes}
              value={data.proposalType}
              pay={data.proposalPay}
              theme={data.proposalTheme}
              reason={data.proposalReason}
              restricted={data.proposalRestricted}
              handleProposalTypeChange={this.handleProposalTypeChange}
              handleProposalRestrictedChange={this.handleProposalRestrictedChange}
              handleProposalPayChange={this.handleProposalPayChange}
              handleProposalThemeChange={this.handleProposalThemeChange}
              handleProposalReasonChange={this.handleProposalReasonChange}
              validateSelect={errors && errors.some((error) => (error.field === 'proposalType'))}
              validatePay={errors && errors.some((error) => (error.field === 'proposalPay'))}
              validateTheme={errors && errors.some((error) => (error.field === 'proposalTheme'))}
              validateReason={errors && errors.some((error) => (error.field === 'proposalReason'))}
              validateRestricted={errors && errors.some((error) => (error.field === 'proposalRestricted'))}
              required={true}
            />
          <FormItem 
            {...formItemLayout} 
            validateStatus={errors && errors.some((error) => (error.field === 'startDate')) === true ? 'error' : undefined} 
            style={{whiteSpace: 'normal'}} 
            label="Preferred Start Date" 
            required={true}
          >
            <DatePicker defaultValue={startDate} format={dateFormat} onChange={this.handleDateChange}/>
          </FormItem>
          <hr />
          <FormItem 
            {...radioItemLayout} 
            validateStatus={errors && errors.some((error) => (error.field === 'nsfRequest')) === true ? 'error' : undefined} 
            className={'two-rows-label'} 
            label="Is this proposal associated with a National Science Foundation Supplemental Funding Request?" 
            required={true}
          >
            <RadioGroup defaultValue={data.nsfRequest} onChange={this.handleNsfChange}>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem 
            {...radioItemLayout} 
            validateStatus={errors && errors.some((error) => (error.field === 'emslStaff')) === true ? 'error' : undefined} 
            className={'two-rows-label'} 
            label="Will you desire the assistance of EMSL Staff in obtaining and interpreting results?" 
            required={true}
          >
            <RadioGroup defaultValue={data.emslStaff} onChange={this.handleEmslChange}>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem 
            {...formItemLayout} 
            label="Laboratory Staff Contact">
            <Input defaultValue={data.labPOC} onChange={this.handlePocChange}/>
          </FormItem>
        </Form>
      </div>
    )
  }
}