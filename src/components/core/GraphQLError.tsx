import React, { Component } from 'react';
import { ApolloError } from 'apollo-boost';
import { cx, css } from 'emotion';
import 'font-awesome/css/font-awesome.css';
import { flexRow, headerFont, colorRed } from 'styles/base';

// Styles
const header = css`
  ${headerFont};
  ${flexRow};
  margin-top: 20px;
`;

const errorMessage = css`
  color: ${colorRed};
`;

type MyProps = { message: string, error: ApolloError }; // props that get passed to this component
type MyState = {}; // internal state of this component

/**
 * Component used to render GraphQL errors.
 */
export default class GraphQLError extends Component<MyProps, MyState> {

  render() {
    return (
      <div>
        <div className={header}>
          <i className={cx('fa fa-exclamation-triangle', css`margin-right: 5px;`)} aria-hidden="true" />
          GraphQL Error
        </div>
        <div>{this.props.message}</div>
        <div className={errorMessage}>{this.props.error.message}</div>
        <div>{this.props.error.stack}</div>
      </div>
    );
  }
}
