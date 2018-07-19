import React, { Component } from 'react';

export default class AccessError extends Component<any, any> {

  constructor(props) {
    super(props);

    this.returnHandler = this.returnHandler.bind(this);
  }

  returnHandler() {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <h1>
          <strong>
            ACCESS DENIED
          </strong>
        </h1>
        <br/>
        <p>
          You do not have sufficient permissions to access the requested resource. <br />
          Please click <a onClick={this.returnHandler}>here</a> to return to the Portal Homepage
        </p>
      </div>
    )
  }
}