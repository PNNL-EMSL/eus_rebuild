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
        profession,
        professionOther
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
              users.forEach((user, index) => {
                if(selectedUsers.findIndex((selectedUser) => {
                    return selectedUser.name === user.name;
                  }) !== -1) {
                  // Do nothing
                } else {
                  content.push(<ParticipantRow key={index} user={user} addable={true} addHandler={this.addParticipant}/>)
                }
              });
              console.log(content.length);
              return (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Institution</th>
                      <th>ORCID iD</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {content}
                  </tbody>
                </table>
              )
            }
          }}
        </Query>
      </div>
    );
  }
}