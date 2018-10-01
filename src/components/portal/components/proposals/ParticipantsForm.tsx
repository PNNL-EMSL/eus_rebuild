import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import ParticipantsSearchForm from 'components/portal/components/proposals/ParticipantsSearchForm';
import ParticipantRow from 'components/portal/components/proposals/ParticipantRow';
import ReactDataGrid from 'react-data-grid';
import {Button, Modal} from 'antd';

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
  }

  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    let valid = false;
    // Do the validation logic
    valid = true;
    return valid;
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
    this.props.updateData('participantsData', this.state.participants);
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
  
  getColumns() {
    return [
      {
        key: 'name',
        name: 'Name',
        width: 50,
        editable: true,
        resizable: true,
      },
      {
        key: 'institution',
        name: 'Institution',
        width: 500,
        editable: true,
        resizable: true,
      },
      {
        key: 'orcid',
        name: 'ORCid',
        width: 50,
        editable: true,
        resizable: true,
      },
      {
        key: 'role',
        name: 'Role',
        width: 50,
        editable: true,
        resizable: true,
      },
    ]
  }
  
  rowGetter = (i) => {
    return this.state.participants[i];
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
      profession: user.proession,
      email: user.email,
      orcid: user.orcid,
      orcidPermissions: user.orcidPermissions,
      institution: user.institution,
      proposalRole: ''
    };
    this.state.participants.push(participant);
    this.hideModal();
  }

  removeParticipant(user) {
    // Add the participant to the participants data list
    console.log('remove', user);
    const participants = this.state.participants;
    participants.splice(participants.findIndex((participant) => (participant.name === user.name)), 1);
    this.setState({participants});
  }

  editParticipant(user) {
    // Add the participant to the participants data list
    console.log('edit', user);
  }

  renderUsers() {
    const content:JSX.Element[] = [];
    this.state.participants.forEach((participant) => {
      content.push(
        <div>
          <ParticipantRow
            edittable={true}
            removable={true}
            user={participant}
            removeHandler={this.removeParticipant}
          />
        </div>
      )
    });
    return content;
  }

  render() {

    const content = this.renderUsers();
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
        {content}
        <ReactDataGrid
          enableCellSelect={true}
          columns={this.getColumns()}
          rowGetter={this.rowGetter}
          rowsCount={this.state.participants.length}
          minHeight={500}
          rowHeight={50}
        />
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