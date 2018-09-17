import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';

export default class DetailsForm extends WizardPage {
  static defaultProps = {
    title: "Proposal Information",
    description: "Provide some basic information about your proposal"
  };

  constructor(props) {
    super(props);
  }

  validatePage = (data) => {
    let valid = false;
    // Do the validation logic
    valid = true;
    return valid;
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
  };

  renderForm() {
    const data = this.props.data;
    return (
      <div>
        <DetailsForm data={data}/>
      </div>
    )
  }

  getStepName() {
    return 'Details';
  };

  render() {

    return(
      <div>
        <div>Primary Research Area</div>
        <div>Title</div>
        <div>Abstract</div>
        <div>Proposed Research (pdf doc)</div>
        <hr />
        <div>Proposal Type</div>
        <div>Preferred Start Date</div>
        <hr />
        <div>Proposal associated with NSFSFR? (checkbox)</div>
        <div>Will you need assistance of emsl staff? (checkbox)</div>
        <div>Lab POC</div>
      </div>
    )
  }
}