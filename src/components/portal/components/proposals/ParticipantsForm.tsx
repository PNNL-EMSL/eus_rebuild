import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import ParticipantsSearchForm from 'components/portal/components/proposals/ParticipantsSearchForm';
import ParticipantRow from 'components/portal/components/proposals/ParticipantRow';
import {Button, Modal} from 'antd';
// import {css} from 'emotion';

// const participantTable: string = css`
//   min-width: 958px;
// `;

export default class ParticipantsForm extends WizardPage {
  static defaultProps = {
    title: "Proposal participants",
    description: "Add participants to your proposal"
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      participants: this.props.participantsData.participants
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.removeParticipant = this.removeParticipant.bind(this);
    this.editParticipant = this.editParticipant.bind(this);
    this.updateProposalRoles = this.updateProposalRoles.bind(this);
  }

  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    const errors = this.props.Validator.doValidate(data, 'participantsForm');
    console.log('participantsErrors', errors);
    const existingErrors = this.props.proposalErrors;
    existingErrors.participantsErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
    this.validatePage(this.state.participants);
    this.props.updateData('participantsData', {participants: this.state.participants});
  };

  showModal() {
    this.setState({showModal: true})
  }

  hideModal() {
    this.setState({showModal: false})
  }

  addParticipant(user) {
    // Add the participant to the participants data list
    const participant = {
      name: user.name,
      profession: user.profession,
      professionOther: user.professionOther,
      email: user.email,
      orcid: user.orcid,
      orcidPermissions: user.orcidPermissions,
      institution: user.institution,
      proposalRoles: []
    };
    this.state.participants.push(participant);
    this.hideModal();
  }

  removeParticipant(user) {
    // Add the participant to the participants data list
    const newParticipants = this.state.participants;
    console.log(newParticipants, user, newParticipants.findIndex((participant) => (participant.name === user.name)));
    newParticipants.splice(newParticipants.findIndex((participant) => (participant.name === user.name)), 1);
    // If the user is the PI, make the first user the PI.
    if(user.proposalRoles.includes('Principal Investigator')) {
      newParticipants[0].proposalRoles = ['Principal Investigator'];
    }
    this.setState({participants: newParticipants});
  }

  editParticipant(user) {
    // Add the participant to the participants data list
    console.log('edit', user);
  }

  updateProposalRoles(user) {
    const limited = ['Principal Investigator', 'Co-Investigator'];
    const participants = this.state.participants;
    limited.forEach((item) => {
      if(user.proposalRoles.includes(item)) {
        participants.forEach((participant) => {
          if(participant.name !== user.name && participant.proposalRoles.includes(item)) {
            participant.proposalRoles.splice(participant.proposalRoles.indexOf(item), 1);
          }
        });
      }
    });
    this.setState({participants});
  }

  renderUsers() {
    const content:JSX.Element[] = [];
    this.state.participants.forEach((participant) => {
      content.push(
        <ParticipantRow
          key={participant.name}
          edittable={true}
          removable={this.state.participants.length > 1}
          user={participant}
          updateProposalRoles={this.updateProposalRoles}
          removeHandler={this.removeParticipant}
        />
      )
    });
    return content;
  }

  render() {
    const content:JSX.Element[] = this.renderUsers();
    return (
      <div>
        <Modal
          title="Add Participants"
          visible={this.state.showModal}
          onCancel={this.hideModal}
          okText="Add"
        >
          <div>
            <ParticipantsSearchForm
              participants={this.state.participants}
              addHandler={this.addParticipant}
            />
          </div>
        </Modal>
        <div className="buttonBar">
          <Button onClick={this.showModal}>Add Participant</Button>
        </div>
        {content.length !== 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Institution</th>
                <th>ORCID iD</th>
                <th>Proposal Roles</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {content}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}