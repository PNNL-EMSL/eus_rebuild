// import React from 'react';
// import WizardPage from 'components/shared/components/wizard/WizardPage';
import Wizard from 'components/shared/components/wizard/Wizard';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
// import MaterialsForm from 'components/portal/components/proposals/MaterialsForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';
import ProposalSummary from 'components/portal/components/proposals/ProposalSummary';

class NewProposalWizard extends Wizard {
  static defaultProps = {
    visible: true,
    title: "EUS Proposal Wizard",
    okLabel: 'Save',
    proposalErrors: {}
  };

  static PROP_INFO = 'info';
  static PROP_PARTICIPANTS = 'participants';
  static PROP_FUNDING = 'funding';
  static PROP_RESOURCES = 'resources';
  static PROP_SUMMARY = 'summary';

  static STEP_INFO = 'Proposal Details';
  static STEP_PARTICIPANTS = 'Participants';
  static STEP_FUNDING = 'Funding';
  static STEP_RESOURCES = 'Proposal Resources';
  static STEP_SUMMARY = 'Proposal Summary';

  constructor(props) {
    super(props);
  //   this.pages = [
  //     new DetailsForm(this.props),
  //     new FundingForm(this.props),
  //     // new MaterialsForm(this.props),
  //     new ParticipantsForm(this.props),
  //     new ResourcesForm(this.props)];
    this.state = {
      currentPageIndex: 0,  // the index of the page currently being shown
      detailsData: {
        researchArea: undefined,
        researchAreaOther: '',
        title: '',
        abstract: '',
        file: undefined,
        proposalType: undefined,
        proposalPay: undefined,
        proposalTheme: undefined,
        proposalReason: undefined,
        startDate: '',
        nsfRequest: undefined,
        emslStaff: undefined,
        labPOC: ''
      },
      participantsData: {},
      fundingData: {},
      resourcesData: {},
      proposalErrors: {},
      proposalCompletes: {}
    }
    this.updateDetailsData = this.updateDetailsData.bind(this);
  }

  updateDetailsData(detailsData) {
    this.setState({detailsData});
  }

  getSteps() {
    const steps = [
      NewProposalWizard.STEP_INFO,
      NewProposalWizard.STEP_PARTICIPANTS,
      NewProposalWizard.STEP_FUNDING,
      NewProposalWizard.STEP_RESOURCES,
      NewProposalWizard.STEP_SUMMARY,
    ];

    return steps;
  }

  getPages() {
    const pages = [
      { component: DetailsForm, id: NewProposalWizard.PROP_INFO, stepPos: 0},
      { component: FundingForm, id: NewProposalWizard.PROP_PARTICIPANTS, stepPos: 1},
      { component: ParticipantsForm, id: NewProposalWizard.PROP_FUNDING, stepPos: 2},
      { component: ResourcesForm, id: NewProposalWizard.PROP_RESOURCES, stepPos: 3},
      { component: ProposalSummary, id: NewProposalWizard.PROP_SUMMARY, stepPos: 4},
    ];

    return pages;
  }

  getChildProps() {
    return  {
      wizardInstance: this,
      detailsData: this.state.detailsData,
      participantsData: this.state.participantsData,
      fundingData: this.state.fundingData,
      resourcesData: this.state.resourcesData,
      updateDetailsData: this.updateDetailsData
    };
  }

  hasStepError(stepName) {
    let hasError = false;
    // console.log(this);
    const errors = this.props.proposalErrors;
    if(stepName === NewProposalWizard.STEP_INFO) {
      if (
        errors.research_area || errors.title || errors.abstract ||
        errors.no_research_pdf || errors.research_pdf_too_big || errors.proposal_type || errors.start_date ||
        errors.nsf_request || errors.emsl_staff
      ) {
        hasError = true;
      }
    } else if (stepName === NewProposalWizard.STEP_PARTICIPANTS) {
      if( errors.no_participant || errors.no_principal ) {
        hasError = true;
      }
    } else if (stepName === NewProposalWizard.STEP_FUNDING) {
      if ( errors.no_funding || errors.no_work_package ) {
        hasError = true;
      }
    }
    return hasError;
  }
  
  hasStepComplete(stepName) {
    // let isComplete = false;
    //
    // const completes = this.state.proposalCompletes;
    return true;
  }

}

export default NewProposalWizard;