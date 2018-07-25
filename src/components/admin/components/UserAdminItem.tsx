import React, {Component} from 'react';
import gql from 'graphql-tag';

export default class UserAdminItem extends Component<any, any> {

  GET_USER_BY_NAME = gql`
    {
      Users @client {
        userName
        email
        roleLevel
      }
    }
  `;

  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      email: props.email,
      role: props.role
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    
    this.submitChanges = this.submitChanges.bind(this);
  }

  handleUserNameChange(e) {
    this.setState({userName: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleRoleChange(e) {
    this.setState({role: e.target.value});
  }

  submitChanges(e) {
    e.preventDefault();
    // commit changes through gql query
    // check if current user is the one getting updated
    // if so, we need to update the current user role also
    const query = this.GET_USER_BY_NAME;
    let users = this.props.client.readQuery({query}).Users;
    const updating = users.filter((item) => (item.userName === this.state.userName))[0];
    users = users.filter((item) => (item.userName !== this.state.userName));
    updating.email = this.state.email;
    updating.roleLevel = Number(this.state.role);
    users.push(updating);
    const data = {Users: users};
    console.log(data, users);
    this.props.client.writeData({data});
  }
  
  render() {
    return (
      <tr>
        <td className="userName">
          <p defaultValue={this.props.userName} onChange={this.handleUserNameChange}>{this.props.userName}</p>
        </td>
        <td className="email">
          <input defaultValue={this.props.email} onChange={this.handleEmailChange} />
        </td>
        <td className="role">
          <select disabled={this.props.disable} defaultValue={this.props.role} onChange={this.handleRoleChange}>
            <option value="1">Guest</option>
            <option value="10">User</option>
            <option value="999">Administrator</option>
          </select>
        </td>
        <td className="submission">
          <button onClick={this.submitChanges}>Confirm Changes</button>
        </td>
      </tr>
    );
  }
}