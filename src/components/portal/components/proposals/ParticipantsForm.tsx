import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';

export default class ParticipantsForm extends WizardPage {
  static defaultProps = {
    title: "Proposal participants",
    description: "Add participants to your proposal"
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
        <ParticipantsForm data={data}/>
      </div>
    )
  }

  getStepName() {
    return 'Participants';
  };

  render() {
    
    return (
      <div>
        <div>
          Header Row: name, institution, ORCID iD, Role
        </div>
        <div>
          Participants Row: Item.Name, item.institution, item.orcid, item.role, modal link for edit, icon link for delete
        </div>
      </div>
    )
  }
}