// import React from 'react';
// import WizardPage from 'components/shared/components/wizard/WizardPage';
import Wizard from 'components/shared/components/wizard/Wizard';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
// import MaterialsForm from 'components/portal/components/proposals/MaterialsForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';

class NewProposalWizard extends Wizard {
  static defaultProps = {
    visible: true,
    title: "EUS Proposal Wizard",
    pages: [
      new DetailsForm(),
      new FundingForm(),
      // new MaterialsForm(this.props),
      new ParticipantsForm(),
      new ResourcesForm()],
    initialPageValidation: [true, true, true, true],
    initialData: {},
    okLabel: 'Save'
  };

  constructor(props) {
    super(props);
  //   this.pages = [
  //     new DetailsForm(this.props),
  //     new FundingForm(this.props),
  //     // new MaterialsForm(this.props),
  //     new ParticipantsForm(this.props),
  //     new ResourcesForm(this.props)];
  }

}

export default NewProposalWizard;