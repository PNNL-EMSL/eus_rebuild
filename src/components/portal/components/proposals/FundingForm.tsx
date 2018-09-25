import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import FundingSources from 'components/portal/pages/proposals/FundingSources.json';
import {Input, Radio} from 'antd';

const RadioGroup = Radio.Group;

export default class FundingForm extends WizardPage {
  static defaultProps = {
    title: "Funding Information",
    description: "Provide some basic information about your funding sources"
  };

  constructor(props) {
    super(props);
    this.state = this.props.fundingData;
    props.wizardInstance.beforeNext = this.beforeNext;

    this.handleFundingChange = this.handleFundingChange.bind(this);
    this.handleFundingOther = this.handleFundingOther.bind(this);
    this.handleWorkPackageChange = this.handleWorkPackageChange.bind(this);
  }

  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    const errors = this.props.Validator.doValidate(data, 'fundingForm');
    const existingErrors = this.props.proposalErrors;
    existingErrors.fundingErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    console.log('new state', this.props, this.state);
    this.validatePage(this.state);
    this.props.updateData('fundingData', this.state);
  };

  handleFundingChange(fundingSources) {
    this.setState({fundingSources});
  }
  handleFundingOther(e) {
    const fundingOther = e.target.value;
    this.setState({fundingOther});
  }
  handleWorkPackageChange(e) {
    const fundingWorkPackage = e.target.value;
    this.setState({fundingWorkPackage});
  }

  render() {
    console.log('fundingState:', this.state);
    const data = this.state;
    // NOTES: BER asks "Are you the PI on the BER grant funding this work?"
    //        Other asks to specify
    return(
      <div>
        <AntDesignSelect
          label='Primary Research Area'
          placeholder="Select primary research area..."
          multiple={true}
          optionList={FundingSources.FundingSources}
          value={data.fundingSources}
          otherValue={data.fundingOther}
          handleChange={this.handleFundingChange}
          handleInput={this.handleFundingOther}
          required={true}
        />
        {data.fundingSources.includes('doe_ber') ? (
          <div>
            <label>Are you the PI on the BER grant funding this work?</label>
            <RadioGroup>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </RadioGroup>
          </div>
        ):(<div />)}
        <div>
          <label>Work Package #</label>
          <Input defaultValue={data.fundingWorkPackage} onChange={this.handleWorkPackageChange}/>
        </div>
      </div>
    );
  }
}