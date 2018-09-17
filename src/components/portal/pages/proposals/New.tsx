import React, {Component} from 'react';
import NewProposalWizard from 'components/portal/pages/proposals/NewProposalWizard';

export default class ProposalNew extends Component<any, any> {

  // TODO: Implement chevrons as a distinct component
  //      Mock out validation to demonstrate color
  //      Chevron on-click should take you to the appropriate form
  //      Summary must always be viewable (should just be all the forms lumped together)
  //      OnBlur should perform FORM validation, not necessarily whole component validation
  //      Make HOCs for all the form portions
  //

  renderProposalDetails() {
    return (
      <div />
    )
  }

  renderParticipants() {
    // Get the current user and pre-populate their information for the proposal
    return (
      <div />
    )
  }

  renderFunding() {
    return (
      <div />
    )
  }

  renderResources() {
    return (
      <div />
    )
  }

  renderMaterialsEquipment() {
    return (
      <div />
    )
  }

  render() {
    return(
      <div>
        Create a new proposal!
        <div>
          Render Details
        </div>
        <div>
          Render Participants
        </div>
        <div>
          Render Resources
        </div>
        <div>
          Render Logistics
        </div>
        <NewProposalWizard />
      </div>
    )
  }

}

