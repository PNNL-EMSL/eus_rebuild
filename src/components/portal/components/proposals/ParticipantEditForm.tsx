import React, {Component} from 'react';
import gql from 'graphql-tag';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProfessionTypes from 'components/portal/components/proposals/ProfessionTypes.json'
import { Button, Input, Checkbox } from 'antd';

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
    this.handleProfessionChange = this.handleProfessionChange.bind(this);
    this.handleProfessionOther = this.handleProfessionOther.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  updateUser() {
    console.log('submit update');
    this.props.submitHandler();
  }

  handleProfessionChange(e) {
    this.props.professionHandler(e);
  }

  handleProfessionOther(e) {
    this.props.professionOther(e.target.value);
  }
  
  handleEmailChange(e) {
    this.props.emailHandler(e.target.value);
  }

  handleRoleChange(e) {
    console.log(e.target);
    this.props.roleHandler(e.target.value, e.target.checked);

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
          <label>Proposal Roles</label>
          <div>
            <label>Principal Investigator</label>
            <Checkbox
              checked={this.props.participant.proposalRoles.includes('Principal Investigator')}
              disabled={false}
              value="Principal Investigator"
              onChange={this.handleRoleChange}
            />
            <label>Co-Investigator</label>
            <Checkbox
              checked={this.props.participant.proposalRoles.includes('Co-Investigator')}
              disabled={false}
              value="Co-Investigator"
              onChange={this.handleRoleChange}
            />
            <label>Survey Respondent</label>
            <Checkbox
              checked={this.props.participant.proposalRoles.includes('Survey Respondent')}
              disabled={this.props.participant.proposalRoles.includes('Principal Investigator')}
              value="Survey Respondent"
              onChange={this.handleRoleChange}
            />
          </div>
        </div>
        <div>
          <Button onClick={this.props.cancelHandler}>Cancel</Button>
          <Button onClick={this.updateUser} type="primary">Submit Update</Button>
        </div>
      </div>
    )
  }
}