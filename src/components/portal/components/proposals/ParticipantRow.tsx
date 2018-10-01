import React, {Component} from 'react';
import { Button, Modal } from 'antd';
import ParticipantEditForm from 'components/portal/components/proposals/ParticipantEditForm';

export default class ParticipantRow extends Component<any, any> {
  static defaultProps = {
    edittable: false,
    addable: false,
    removable: false,
  };

  constructor(props) {
    super(props);

    this.state = {showEditModal: false};
    
    this.addParticipant = this.addParticipant.bind(this);
    this.removeParticipant = this.removeParticipant.bind(this);
    this.editParticipant = this.editParticipant.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  editParticipant() {
    console.log('edit button clicked');
    this.setState({showEditModal: true});
  }
  
  closeEdit() {
    this.setState({showEditModal: false});
  }

  submitUpdate() {
    this.closeEdit();
  }

  addParticipant() {
    console.log('add button clicked');
    this.props.addHandler(this.props.user);
  }

  removeParticipant() {
    console.log('remove button clicked');
    this.props.removeHandler(this.props.user);
  }

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>
          {user.name}
        </td>
        <td>
          {user.institution}
        </td>
        <td>
          {user.orcid}
        </td>
        {this.props.edittable === true &&
          <td>
            {user.proposalRole}
          </td>
        }
        <td>
          {this.props.edittable === true &&
          <Button onClick={this.editParticipant}>Edit</Button>
          }
          {this.props.addable === true &&
          <Button onClick={this.addParticipant}>Add</Button>
          }
          {this.props.removable === true &&
          <Button onClick={this.removeParticipant}>Remove</Button>
          }
        </td>
        <Modal
          title="Edit User"
          visible={this.state.showEditModal}
          onCancel={this.closeEdit}
          footer={null}
        >
          <ParticipantEditForm
            participant={this.props.user}
            submitHandler={this.submitUpdate}
            cancelHandler={this.closeEdit}
          />
        </Modal>
      </tr>
    );
  }
}