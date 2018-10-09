import React, {Component} from 'react';
import NewProposalWizard from 'components/portal/components/proposals//NewProposalWizard';
import gql from 'graphql-tag';

export default class ProposalNew extends Component<any, any> {
  GET_CURRENT_USER = gql`
    {
      CurrentUser @client {
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

    // Get the information for the current user and set them as the one participant on the proposal.
    // They are the initial Principal Investigator
    const user = this.props.client.readQuery({query: this.GET_CURRENT_USER}).CurrentUser[0];
    const participant = {
      name: user.name,
      profession: user.profession,
      professionOther: user.professionOther,
      email: user.email,
      orcid: user.orcid,
      orcidPermissions: user.orcidPermissions,
      institution: user.institution,
      proposalRoles: ['Principal Investigator']
    };
    this.state = {
      participantsData: {
        participants: [participant]
      }
    };

    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  onCancel() {
    this.props.history.push('/Portal/proposals/');
  }

  onOk() {
    alert('Saving your proposal!');
    this.props.history.push('/Portal/proposals/');
  }

  render() {
    console.log('new wizard', this.state.participantsData);
    return(
      <div>
        <NewProposalWizard onOk={this.onOk} onCancel={this.onCancel} participantsData={this.state.participantsData}/>
      </div>
    )
  }

}

