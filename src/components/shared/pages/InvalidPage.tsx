import React, { Component } from 'react';

export default class InvalidPage extends Component<any, any> {
  constructor(props) {
    super(props);

    this.returnHandler = this.returnHandler.bind(this);
  }

  returnHandler() {
    this.props.history.push('/');
  }

  render() {
    console.log(this.props);
    return(
      <div>
        <h1>
          <strong>
            INVALID PAGE
          </strong>
        </h1>
        <br />
        <p>
          {this.props.location.pathname} is not a valid page. <br />
          Please click <a onClick={this.returnHandler}>here</a> to return to the Portal Homepage
        </p>
      </div>
    )
  }
}