import React, {Component} from 'react';
// import gql from 'graphql-tag';

export default class UserAdminItem extends Component<any, any> {
  
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
    // commit changes through gql query
    // check if current user is the one getting updated
    // if so, we need to update the current user role also
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
          <select disabled={this.props.disable}>
            <option selected={this.props.role === 1} value="1">Guest</option>
            <option selected={this.props.role === 10} value="10">User</option>
            <option selected={this.props.role === 999} value="999">Administrator</option>
          </select>
        </td>
        <td className="submission">
          <button>Confirm Changes</button>
        </td>
      </tr>
    );
  }
}