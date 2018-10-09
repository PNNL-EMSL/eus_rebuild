import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';

export default class ProposalSummary extends WizardPage {

  constructor(props) {
    super(props);

    props.wizardInstance.beforeNext = undefined;
  }

  render() {
    return (
      <div>
        <DetailsForm {...this.props}/>
        <ParticipantsForm {...this.props}/>
        <FundingForm {...this.props}/>
        <ResourcesForm {...this.props}/>
      </div>
    )
  }
}