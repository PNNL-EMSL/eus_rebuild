import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ParticipantRow from 'components/portal/components/proposals/ParticipantRow';

export default class ParticipantsSearchForm extends Component<any, any> {
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
    
    this.addParticipant = this.addParticipant.bind(this);
  }

  addParticipant(user) {
    this.props.addHandler(user);
  }

  render() {
    const selectedUsers = this.props.participants;
    return(
      <div>
        Users which are addable...
        <Query query={ParticipantsSearchForm.GET_USERS} >
          {({loading, error, data}) => {
            if(loading) {
              return (
                <div>
                  Retrieving users...
                </div>
              );
            } else if(error) {
              return (
                <div>
                  Error encountered while retrieving users.
                </div>
              );
            } else {
              const users = data.Users;
              const content:JSX.Element[] = [];
              users.forEach((user) => {
                if(selectedUsers.findIndex((selectedUser) => {
                    return selectedUser.name === user.name;
                  }) !== -1) {
                  // Do nothing
                } else {
                  content.push(<ParticipantRow user={user} addable={true} addHandler={this.addParticipant}/>)
                }
              });
              console.log(content.length);
              return (
                <div>
                  {content}
                </div>
              )
            }
          }}
        </Query>
      </div>
    );
  }
}