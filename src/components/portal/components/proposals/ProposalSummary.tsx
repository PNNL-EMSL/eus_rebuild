import React, {Component} from 'react';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
// import MaterialsForm from 'components/portal/components/proposals/MaterialsForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';

export default class ProposalSummary extends Component<any, any> {

  render() {
    return (
      <div>
        <DetailsForm />
        <ParticipantsForm/>
        <FundingForm />
        <ResourcesForm />
      </div>
    )
  }
}