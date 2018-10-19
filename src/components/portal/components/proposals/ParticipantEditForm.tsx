import React, {Component} from 'react';
import gql from 'graphql-tag';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProfessionTypes from 'components/portal/components/proposals/ProfessionTypes.json'
import { Form, Button, Input, Checkbox, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    return (
      <Form>
        <FormItem label="Name" {...formItemLayout}>
          <Input defaultValue={this.props.participant.name} disabled />
        </FormItem>
        <AntDesignSelect
          label="Profession"
          placeholder="Select profession..."
          optionList={ProfessionTypes.ProfessionTypes}
          value={this.props.participant.profession}
          handleChange={this.handleProfessionChange}
          handleInput={this.handleProfessionOther}
          required={true}
        />
        <FormItem label="Email address" {...formItemLayout}>
          <Input defaultValue={this.props.participant.email} />
        </FormItem>
        {this.props.participant.orcid !== '' ? (
          <FormItem label="ORCID iD" {...formItemLayout}>
            <Input defaultValue={this.props.participant.orcid} disabled />
          </FormItem>
        ) : (<div />)}
        {this.props.participant.orcid !== '' ? (
          <FormItem label="ORCID Record Permissions" {...formItemLayout} className={'two-rows-label'}>
            <RadioGroup defaultValue={this.props.participant.orcidPermissions} disabled>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </RadioGroup>
          </FormItem>
        ) : (<div />)}
        {this.props.participant.orcid === '' &&
          <FormItem>
            <Button onChange={this.linkToOrcid} >Link ORCID iD </Button>
          </FormItem>
        }
        <FormItem label="Institution Name" {...formItemLayout}>
          {this.props.participant.institution}
        </FormItem>
        <FormItem label="Proposal Roles" {...formItemLayout}>
          <Checkbox
            checked={this.props.participant.proposalRoles.includes('Principal Investigator')}
            disabled={false}
            value="Principal Investigator"
            onChange={this.handleRoleChange}
          >
            Principal Investigator
          </Checkbox>
          <br/>
          <Checkbox
            checked={this.props.participant.proposalRoles.includes('Co-Investigator')}
            disabled={false}
            value="Co-Investigator"
            onChange={this.handleRoleChange}
          >
            Co-Investigator
          </Checkbox>
          <br/>
          <Checkbox
            checked={this.props.participant.proposalRoles.includes('Survey Respondent')}
            disabled={this.props.participant.proposalRoles.includes('Principal Investigator')}
            value="Survey Respondent"
            onChange={this.handleRoleChange}
          >
            Survey Respondent
          </Checkbox>
        </FormItem>
        <div>
          <Button onClick={this.props.cancelHandler}>Cancel</Button>
          <Button onClick={this.updateUser} type="primary">Submit Update</Button>
        </div>
      </Form>
    )
  }
}