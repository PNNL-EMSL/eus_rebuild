import React, {Component} from 'react';
import { Button, Modal } from 'antd';
import ParticipantEditForm from 'components/portal/components/proposals/ParticipantEditForm';
import {css} from 'emotion';

const nameColumn: string = css`
  width: 20%;
`;

const institutionColumn: string = css`
  width: 30%;
`;

const orcidColumn: string = css`
  width: 10%
`;

const rolesColumn: string = css`
  width: 20%;
`;

const buttonColumn: string = css`
  width: 15%;
`;

export default class ParticipantRow extends Component<any, any> {
  static defaultProps = {
    edittable: false,
    addable: false,
    removable: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      showEditModal: false,
      user: this.props.user
    };
    
    this.addParticipant = this.addParticipant.bind(this);
    this.removeParticipant = this.removeParticipant.bind(this);
    this.editParticipant = this.editParticipant.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.professionHandler = this.professionHandler.bind(this);
    this.professionOtherHandler = this.professionOtherHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.roleHandler = this.roleHandler.bind(this);
  }

  editParticipant() {
    console.log('edit button clicked');
    this.setState({showEditModal: true});
  }
  
  closeEdit() {
    this.setState({showEditModal: false});
  }

  submitUpdate() {
    console.log('submission handler');
    this.props.updateProposalRoles(this.state.user);
    this.closeEdit();
  }

  addParticipant() {
    console.log('add button clicked');
    this.props.addHandler(this.state.user);
  }

  removeParticipant() {
    console.log('remove button clicked');
    this.props.removeHandler(this.state.user);
  }

  professionHandler(profession) {
    const user = this.state.user;
    user.profession = profession;
    this.setState({user})
  }

  professionOtherHandler(professionOther) {
    const user = this.state.user;
    user.professionOther = professionOther;
    this.setState({user})
  }

  emailHandler(email) {
    const user = this.state.user;
    user.email = email;
    this.setState({user});
  }

  roleHandler(proposalRole, toAdd) {
    const user = this.state.user;
    if(!toAdd) {
      user.proposalRoles.splice(user.proposalRoles.indexOf(proposalRole), 1);
    } else {
      if(proposalRole === 'Principal Investigator') {
        // If we are adding the PI role, we need to remove any others
        user.proposalRoles = [];
      } else if(proposalRole === 'Co-Investigator' && user.proposalRoles.indexOf('Principal Investigator') !== -1) {
        // Co-PIs cannot be PIs so we need to remove PI
        user.proposalRoles.splice(user.proposalRoles.indexOf('Principal Investigator'), 1);
      }
      user.proposalRoles.push(proposalRole);
    }
    this.setState({user})
  }

  render() {
    const user = this.state.user;
    return (
      <tr>
        <td className={nameColumn}>
          {user.name}
        </td>
        <td className={institutionColumn}>
          {user.institution}
        </td>
        <td className={orcidColumn}>
          {user.orcid}
        </td>
        {this.props.edittable === true &&
          <td className={rolesColumn}>
            {user.proposalRoles.join(', ')}
          </td>
        }
        <td className={buttonColumn}>
          {this.props.edittable === true &&
          <Button onClick={this.editParticipant}><i className="far fa-edit" /></Button>
          }
          {this.props.addable === true &&
          <Button onClick={this.addParticipant}><i className="fas fa-user-plus" /></Button>
          }
          {this.props.removable === true &&
          <Button onClick={this.removeParticipant}><i className="fas fa-user-minus" /></Button>
          }
        </td>
        <Modal
          title="Edit User"
          visible={this.state.showEditModal}
          onCancel={this.closeEdit}
          footer={null}
        >
          <ParticipantEditForm
            participant={user}
            submitHandler={this.submitUpdate}
            cancelHandler={this.closeEdit}
            professionHandler={this.professionHandler}
            professionOther={this.professionOtherHandler}
            emailHandler={this.emailHandler}
            roleHandler={this.roleHandler}
          />
        </Modal>
      </tr>
    );
  }
}