import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';

export default class MaterialsForm extends WizardPage {
  static defaultProps = {
    title: 'Materials and Equipment',
    description: 'Add user-provided equipment to your proposal'
  };

  constructor(props) {
    super(props);

    this.state = {
      materialsData: this.props.materialsData
    }
  }

  render() {

    return (
      <div>
        <div>Human blood question</div>
        <div>animal use question</div>
        <div>bring chemicals question</div>
        <div>IF YES</div>
        <div>description of chemicals</div>
        <div>How do you plan bring chemicals</div>
        <div>if other, specify</div>
        <div>Chemicals at end of project</div>
        <div>if other, specify</div>
        <div>involve samples question</div>
        <div>IF YES</div>
        <div>Sample description</div>
        <div>Samples radioactive?</div>
        <div>Samples nanomaterials</div>
        <div>Samples regulated USDA APHIS?</div>
        <div>IF YES</div>
        <div>Permit numbers, csv</div>
        <div>Samples biological?</div>
        <div>IF YES</div>
        <div>Plant pathogens/pests?</div>
        <div>IF YES</div>
        <div>Pathogins alive/inactive?</div>
        <div>How do you plan to bring samples?</div>
        <div>if other, specify</div>
        <div>will you need sample prep?</div>
        <div>samples at end of project</div>
        <div>if other, specify</div>
        <hr />
        <div>user equipment listing</div>
        <hr />
        <div>Proposal comments</div>
      </div>
    )
  }
}