import React, {Component} from 'react';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProfessionTypes from 'components/portal/pages/proposals/ProfessionTypes.json'
import { Button, Input } from 'antd';

export default class ParticipantEditForm extends Component<any, any> {
  static GET_USERS = gql`
    {
      Users @client {
        name,
        email,
        institution,
        orcid,
        orcidPermissions,
        profession
      }
    }
  `;
  
  constructor(props) {
    super(props);
    
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser() {
    console.log('submit update');
    this.props.submitHandler();
  }

  handleProfessionChange(e) {
    console.log(e);
  }

  handleProfessionOther(e) {
    console.log(e);
  }

  linkToOrcid() {
    // make link to Orcid
  }

  render() {
    return (
      <div>
        <div>
          <label>Name:</label>
          <Input defaultValue={this.props.participant.name} disabled />
        </div>
        <div>
          <AntDesignSelect
            label="Profession"
            placeholder="Select profession..."
            optionList={ProfessionTypes.ProfessionTypes}
            value={this.props.participant.profession}
            handleChange={this.handleProfessionChange}
            handleInput={this.handleProfessionOther}
            required={true}
          />
        </div>
        <div>
          <label>Email address</label>
          <Input defaultValue={this.props.participant.email} />
        </div>
        {this.props.participant.orcid !== '' ? (
          <div>
            <label>ORCID iD</label>
            <Input defaultValue={this.props.participant.orcid} disabled />
          </div>
        ) : (<div />)}
        {this.props.participant.orcid !== '' ? (
          <div>
            <label>ORCID Record Permissions</label>
            <Input defaultValue={this.props.participant.orcidPermissions} disabled />
          </div>
        ) : (<div />)}
        {this.props.participant.orcid === '' &&
          <div>
            <Button onChange={this.linkToOrcid} >Link ORCID iD </Button>
          </div>
        }
        <div>
          <label>Institution Name</label>
          {this.props.participant.institution}
        </div>
        <div>
          <label>Proposal Role</label>
          Proposal Role: {this.props.participant.proposalRole}
        </div>
        <div>
          <Button onClick={this.props.cancelHandler}>Cancel</Button>
          <Button onClick={this.updateUser} type="primary">Submit Update</Button>
        </div>
      </div>
    )
  }
}