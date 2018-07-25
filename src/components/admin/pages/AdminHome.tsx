import React, {Component} from 'react';
import gql from 'graphql-tag';
import Login from 'components/shared/pages/Login';
import AdminTileContainer from 'components/admin/components/AdminTileContainer';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class AdminHome extends Component<any, any> {

  GET_USER_ROLE = gql`
    {
      CurrentUser @client {
        roleLevel
      }
    }
  `;

  constructor(props) {
    super(props);

    this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
    this.state = {userLoggedIn: this.isUserLoggedIn()};

    this.doLogin = this.doLogin.bind(this);
    this.renderTile = this.renderTile.bind(this);
  }

  isUserLoggedIn() {
    const query = this.GET_USER_ROLE;
    const loggedIn = this.props.client.readQuery({query}).CurrentUser.length !== 0;
    return loggedIn;
  }

  doLogin() {
    console.log('called login');
    this.setState({userLoggedIn: true});
  }
  
  renderTile() {
    const query = this.GET_USER_ROLE;
    const role = this.props.client.readQuery({query}).CurrentUser[0].roleLevel;
    return (
      <div>
        <AdminTileContainer role={role} {...this.props}/>
      </div>
    );
  }

  render() {
    console.log('EUS Admin render', this.state, this.props);
    let content;
    if(!this.state.userLoggedIn) {
      content =  <Login {...this.props} loginHandler={this.doLogin} />
    } else {
      content = this.renderTile();
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}