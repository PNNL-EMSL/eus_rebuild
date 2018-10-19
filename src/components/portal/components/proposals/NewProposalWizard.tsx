import Wizard from 'components/shared/components/wizard/Wizard';
import DetailsForm from 'components/portal/components/proposals/DetailsForm';
import FundingForm from 'components/portal/components/proposals/FundingForm';
import ParticipantsForm from 'components/portal/components/proposals/ParticipantsForm';
import ResourcesForm from 'components/portal/components/proposals/ResourcesForm';
import MaterialsForm from 'components/portal/components/proposals/MaterialsForm';
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
      fundingList: [],
      fundingSources: [],
      fundingOther: '',
      berSelection: undefined
    },
    resourcesData: {
      resources: []
    },
    materialsData: {
      humanMaterials: undefined,
      animalMaterials: undefined,
      chemicalsSent: undefined,
      chemicalsDescription: undefined,
      chemicalsShip: undefined,
      chemicalsShipOther: undefined,
      chemicalsEnd: undefined,
      chemicalsEndOther: undefined,
      samplesSent: undefined,
      samplesDescription: undefined,
      samplesRadioactive: undefined,
      samplesNanomaterials: undefined,
      samplesAphis: undefined,
      samplesAphisPermits: undefined,
      samplesBiological: undefined,
      samplesPests: undefined,
      samplesAlive: undefined,
      samplesShip: undefined,
      samplesShipOther: undefined,
      samplesEnd: undefined,
      samplesEndOther: undefined
    }
  };

  static PROP_INFO = 'info';
  static PROP_PARTICIPANTS = 'participants';
  static PROP_FUNDING = 'funding';
  static PROP_RESOURCES = 'resources';
  static PROP_MATERIALS = 'materials';
  static PROP_SUMMARY = 'summary';

  static STEP_INFO = 'Details';
  static STEP_PARTICIPANTS = 'Participants';
  static STEP_FUNDING = 'Funding';
  static STEP_RESOURCES = 'Resources';
  static STEP_MATERIALS = 'Materials';
  static STEP_SUMMARY = 'Summary';
  
  static VALIDATOR = new ProposalValidator();

  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,  // the index of the page currently being shown
      detailsData: this.props.detailsData,
      participantsData: this.props.participantsData,
      fundingData: this.props.fundingData,
      resourcesData: this.props.resourcesData,
      materialsData: this.props.materialsData,
      proposalErrors: {},
      completeSteps: {},
    };
    this.updateData = this.updateData.bind(this);
    this.updateErrors = this.updateErrors.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
  }

  updateData(field, data) {
    console.log('pause here; materials data');
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
      NewProposalWizard.STEP_MATERIALS,
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
      { component: MaterialsForm, id: NewProposalWizard.PROP_MATERIALS, stepPos: 4},
      { component: ProposalSummary, id: NewProposalWizard.PROP_SUMMARY, stepPos: 5},
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
      materialsData: this.state.materialsData,
      proposalErrors: this.state.proposalErrors,
      updateData: this.updateData,
      updateErrors: this.updateErrors,
      updateComplete: this.updateComplete,
      Validator: NewProposalWizard.VALIDATOR
    };
  }

  hasStepError(stepName) {
    let hasError = false;
    const errors = this.state.proposalErrors;
    if(stepName === NewProposalWizard.STEP_INFO) {
      if (errors.detailsErrors && errors.detailsErrors.length > 0) {
        hasError = errors.detailsErrors;
      }
    } else if (stepName === NewProposalWizard.STEP_PARTICIPANTS) {
      if( errors.participantsErrors && errors.participantsErrors.length > 0 ) {
        hasError = errors.participantsErrors;
      }
    } else if (stepName === NewProposalWizard.STEP_FUNDING) {
      if (errors.fundingErrors && errors.fundingErrors.length > 0) {
        hasError = errors.fundingErrors;
      }
    } else if (stepName === NewProposalWizard.STEP_RESOURCES) {
      if (errors.resourcesErrors && errors.resourcesErrors.length > 0) {
        hasError = errors.resourcesErrors;
      }
    } else if (stepName === NewProposalWizard.STEP_MATERIALS) {
      if (errors.materialsErrors && errors.materialsErrors.length > 0) {
        hasError = errors.materialsErrors;
      }
    }
    return hasError;
  }
  
  hasStepComplete(stepName) {
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
    } else if (stepName === NewProposalWizard.STEP_RESOURCES) {
      if (errors.resourcesErrors && errors.resourcesErrors.length === 0) {
        isComplete = true;
      }
    } else if (stepName === NewProposalWizard.STEP_MATERIALS) {
      if (errors.materialsErrors && errors.materialsErrors.length === 0) {
        isComplete = true;
      }
    }
    return isComplete;
  }

}

export default NewProposalWizard;