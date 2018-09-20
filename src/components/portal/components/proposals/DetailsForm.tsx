import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProposalTypeSelect from 'components/portal/pages/proposals/ProposalTypeSelect';
import ResearchAreas from 'components/portal/pages/proposals/ResearchAreas.json';
import ProposalTypes from 'components/portal/pages/proposals/ProposalTypes.json';
import ProposalValidator from 'components/shared/components/validator/ProposalValidator';
import {DatePicker, Input} from 'antd';

const TextArea = Input.TextArea;

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
    this.handleProposalPayChange = this.handleProposalPayChange.bind(this);
    this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
    this.handleProposalThemeChange = this.handleProposalThemeChange.bind(this);
    this.handleProposalReasonChange = this.handleProposalReasonChange.bind(this);
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
    const Validator = new ProposalValidator();
    const errors = Validator.doValidate(data);
    console.log('ERRORS IN DETAILS FORM', errors.length);

    // valid = true;
    return true;
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
    console.log(this.props);
    this.validatePage(this.state);
    this.props.updateDetailsData(this.state);
  };
  
  handleAreaChange(researchArea) {
    this.setState({researchArea});
  }
  handleAreaOther(e) {
    const researchAreaOther = e.target.value;
    this.setState({researchAreaOther});
  }

  handleProposalTypeChange(proposalType) {
    this.setState({proposalType})
  }

  handleProposalPayChange(proposalPay) {
    this.setState({proposalPay})
  }

  handleProposalThemeChange(proposalTheme) {
    this.setState({proposalTheme})
  }

  handleProposalReasonChange(proposalReason) {
    this.setState({proposalReason})
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
    console.log('new state!', this.state);
    const dateFormat = 'MMMM DD, YYYY';
    return(
      <div>
        <AntDesignSelect
          label='Primary Research Area'
          placeholder="Select primary research area..."
          optionList={ResearchAreas.ResearchAreas}
          value={data.researchArea}
          handleChange={this.handleAreaChange}
          handleInput={this.handleAreaOther}
          required={true}
        />
        <div>
          <label>Title</label>
          <TextArea value={data.title} autosize />
        </div>
        <div>
          <label>Abstract (approx 500 words)</label>
          <TextArea value={data.abstract} autosize />
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
          handleProposalTypeChange={this.handleProposalTypeChange}
          handleProposalPayChange={this.handleProposalPayChange}
          handleProposalThemeChange={this.handleProposalThemeChange}
          handleProposalReasonChange={this.handleProposalReasonChange}
          required={true}
        />
        <div>
          <label>Preferred Start Date</label>
          <DatePicker defaultValue={data.startDate} format={dateFormat}/>
        </div>
        <hr />
        <div>Proposal associated with NSFSFR? (checkbox)</div>
        <div>Will you need assistance of emsl staff? (checkbox)</div>
        <div>Lab POC</div>
      </div>
    )
  }
}