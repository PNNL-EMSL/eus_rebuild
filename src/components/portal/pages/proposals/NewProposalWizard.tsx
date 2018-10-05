// import React from 'react';
// import WizardPage from 'components/shared/components/wizard/WizardPage';
import Wizard from 'components/shared/components/wizard/Wizard';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
// import MaterialsForm from 'components/portal/components/proposals/MaterialsForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';
import ProposalSummary from 'components/portal/components/proposals/ProposalSummary';
import ProposalValidator from 'components/shared/components/validator/ProposalValidator';

class NewProposalWizard extends Wizard {
  static defaultProps = {
    visible: true,
    title: "Proposal Creation Wizard",
    okLabel: 'Save',
    proposalErrors: {},
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
      proposalRestricted: undefined,
      startDate: '',
      nsfRequest: undefined,
      emslStaff: undefined,
      labPOC: ''
    },
    participantsData: {
      participants: []
    },
    fundingData: {
      fundingSources: [],
      fundingOther: '',
      fundingWorkPackage: '',
    },
    resourcesData: {},
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
  
  static VALIDATOR = new ProposalValidator();

  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,  // the index of the page currently being shown
      detailsData: this.props.detailsData,
      participantsData: this.props.participantsData,
      fundingData: this.props.fundingData,
      resourcesData: this.props.resourcesData,
      proposalErrors: {},
      completeSteps: {},
    };
    this.updateData = this.updateData.bind(this);
    this.updateErrors = this.updateErrors.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
  }

  updateData(field, data) {
    this.setState({[field]: data});
  }
  
  updateErrors(proposalErrors) {
    this.setState({proposalErrors});
  }

  updateComplete(isComplete) {
    const completeSteps = this.state.completeSteps;
    completeSteps[this.getSteps()[this.state.currentPageIndex]] = isComplete;
    this.setState({completeSteps});
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
      { component: ParticipantsForm, id: NewProposalWizard.PROP_PARTICIPANTS, stepPos: 1},
      { component: FundingForm, id: NewProposalWizard.PROP_FUNDING, stepPos: 2},
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
      proposalErrors: this.state.proposalErrors,
      updateData: this.updateData,
      updateErrors: this.updateErrors,
      updateComplete: this.updateComplete,
      Validator: NewProposalWizard.VALIDATOR
    };
  }

  hasStepError(stepName) {
    let hasError = false;
    console.log(this);
    const errors = this.state.proposalErrors;
    console.log('errors', errors);
    if(stepName === NewProposalWizard.STEP_INFO) {
      if (errors.detailsErrors && errors.detailsErrors.length > 0) {
        hasError = errors.detailsErrors;
      }
    } else if (stepName === NewProposalWizard.STEP_PARTICIPANTS) {
      if( errors.no_participant || errors.no_principal ) {
        hasError = true;
      }
    } else if (stepName === NewProposalWizard.STEP_FUNDING) {
      if (errors.fundingErrors && errors.fundingErrors.length > 0) {
        hasError = errors.fundingErrors;
      }
    }
    return hasError;
  }
  
  hasStepComplete(stepName) {
    console.log('completeSteps', stepName, this.state.completeSteps);
    const errors = this.state.proposalErrors;
    let isComplete = false;
    if(stepName === NewProposalWizard.STEP_INFO) {
      if (errors.detailsErrors && errors.detailsErrors.length === 0 ) {
        isComplete = true;
      }
    } else if (stepName === NewProposalWizard.STEP_PARTICIPANTS) {
      if( errors.participantsErrors && errors.participantsErrors.length === 0 ) {
        isComplete = true;
      }
    } else if (stepName === NewProposalWizard.STEP_FUNDING) {
      if (errors.fundingErrors && errors.fundingErrors.length === 0) {
        isComplete = true;
      }
    }
    return isComplete;
    //
    // const completes = this.state.proposalCompletes;
    // return true;
  }

}

export default NewProposalWizard;