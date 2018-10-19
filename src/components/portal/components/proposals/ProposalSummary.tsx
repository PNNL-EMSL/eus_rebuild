import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';
import MaterialsForm from 'components/portal/components/proposals/MaterialsForm';

export default class ProposalSummary extends WizardPage {

  constructor(props) {
    super(props);

    props.wizardInstance.beforeNext = undefined;
  }

  render() {
    return (
      <div>
        <h3>Proposal Details</h3>
        <DetailsForm {...this.props}/>
        <hr />
        <h3>Proposal Participants</h3>
        <ParticipantsForm {...this.props}/>
        <hr />
        <h3>Proposal Funding</h3>
        <FundingForm {...this.props}/>
        <hr />
        <h3>Proposal Resources</h3>
        <ResourcesForm {...this.props}/>
        <hr />
        <h3>Proposal Materials</h3>
        <MaterialsForm {...this.props}/>
      </div>
    )
  }
}