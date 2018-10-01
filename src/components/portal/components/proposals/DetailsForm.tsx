import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProposalTypeSelect from 'components/portal/pages/proposals/ProposalTypeSelect';
import ResearchAreas from 'components/portal/pages/proposals/ResearchAreas.json';
import ProposalTypes from 'components/portal/pages/proposals/ProposalTypes.json';
import {DatePicker, Input, Radio} from 'antd';

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
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNsfChange = this.handleNsfChange.bind(this);
    this.handleEmslChange = this.handleEmslChange.bind(this);
    this.handlePocChange = this.handlePocChange.bind(this);
  }

  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    // let valid = false;
    // if(
    //   (this.state.researchArea === undefined) ||
    //   (this.state.researchArea === 'other' && this.state.researchAreaOther === '')
    // ) {
    //   // Research area not defined
    //   valid = false;
    // }
    // // Do the validation logic
    //
    
    const errors = this.props.Validator.doValidate(data, 'detailsForm');
    const existingErrors = this.props.proposalErrors;
    existingErrors.detailsErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
    console.log('new state', this.props, this.state);
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
    console.log(startDate);
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
    return(
      <div>
        <AntDesignSelect
          label='Primary Research Area'
          placeholder="Select primary research area..."
          optionList={ResearchAreas.ResearchAreas}
          value={data.researchArea}
          otherValue={data.researchOther}
          handleChange={this.handleAreaChange}
          handleInput={this.handleAreaOther}
          required={true}
        />
        <div>
          <label>Title</label>
          <TextArea defaultValue={data.title} onChange={this.handleTitleChange} autosize />
        </div>
        <div>
          <label>Abstract (approx 500 words)</label>
          <TextArea defaultValue={data.abstract} onChange={this.handleAbstractChange} autosize />
        </div>
        <div>
          <label>Proposed Research (pdf doc)</label>
        </div>
        <hr />
        <ProposalTypeSelect
          label='Proposal Type'
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
          required={true}
        />
        <div>
          <label>Preferred Start Date</label>
          <DatePicker defaultValue={data.startDate} format={dateFormat} onChange={this.handleDateChange}/>
        </div>
        <hr />
        <div>
          <label>Is this proposal associated with a National Science Foundation Supplemental Funding Request?</label>
          <RadioGroup defaultValue={data.nsfRequest} onChange={this.handleNsfChange}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </RadioGroup>
        </div>
        <div>
          <label>Will you desire the assistance of EMSL Staff in obtaining and interpreting results?</label>
          <RadioGroup defaultValue={data.emslStaff} onChange={this.handleEmslChange}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </RadioGroup>
        </div>
        <div>
          <label>Laboratory Staff Contact</label>
          <Input defaultValue={data.labPOC} onChange={this.handlePocChange}/>
        </div>
      </div>
    )
  }
}