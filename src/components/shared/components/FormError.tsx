import React, {Component} from 'react';
import {errorStyle} from 'styles/base';

export default class FormError extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={errorStyle}>
        <b><i>{this.props.error}</i></b>
      </div>
    )
  }
}