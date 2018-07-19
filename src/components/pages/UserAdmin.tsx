import React, { Component } from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {css} from 'emotion';

import UserAdminItem from 'components/core/UserAdminItem';

const table: string = css`

  text-align: center;
  .userName {
    width 15%;
  }
  .email {
    width 15%;
    border-left solid;
    border-right solid;
  }
  .role {
    width 15%;
    border-right solid;
  }
  .submission {
    width 15%;
  }
  tr {
    height 45px;
    border-bottom solid;
  }
`;

// const userName: string = css`
//   width: 15%;
//   text-align: center;
//  
// `;
//
// const email: string = css`
//   width: 16%;
//   text-align: center;
//  
// `;
//
// const role: string = css`
//   width: 17%;
//   text-align: center;
//  
// `;
//
// const submission: string = css`
//   width: 18%;
//   text-align: center;
//  
// `;

export default class UserAdmin extends Component<any, any> {

  GET_USERS = gql`
    {
      Users @client {
        userName
        email
        roleLevel
      }
      CurrentUser @client {
        userName
      }
    }
  `;

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.returnHandler = this.returnHandler.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  returnHandler() {
    this.props.history.push('/home');
  }

  submitChanges() {
    // commit changes through gql query
  }

  render() {
    return (
      <div>
        <h1>
          <strong>
            User Administration
          </strong>
        </h1>
        <br/>
        <Query query={this.GET_USERS} >
          {({loading, error, data}) => {
            if(loading) {
              return (
                <div>
                  Retrieving user information...
                </div>
              );
            } else if(error) {
              return (
                <div>
                  Error encountered while retrieving user information
                </div>
              );
            } else {
              const users = data.Users;
              const currentUserName = data.CurrentUser[0].userName;
              const content:JSX.Element[] = [];
              users.forEach((user) => {
                if(user.userName !== 'superadmin') {
                  content.push(
                    <UserAdminItem 
                      id={user.userName} 
                      userName={user.userName} 
                      email={user.email} 
                      role={user.roleLevel}
                      disable={user.userName === currentUserName}
                    />
                  );
                }
              });
              if(content.length) {
                content.unshift(
                  <tr>
                    <th className="userName">
                      Username
                    </th>
                    <th className="email">
                      Email
                    </th>
                    <th className="role">
                      Role
                    </th>
                    <th className="submission"/>
                  </tr>
                );
              }
              return (
                <div>
                  <table className={table}>
                    {content}
                  </table>
                </div>
              );
            }
          }}
        </Query>
      </div>
    )
  }
}