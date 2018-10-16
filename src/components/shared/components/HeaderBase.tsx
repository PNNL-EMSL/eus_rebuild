import React, { Component } from 'react';
import { css } from 'emotion';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {headerStyle} from 'styles/base';

const titleContainer: string = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

export default abstract class HeaderBase extends Component<any, any> {

  GET_HEADER_INFORMATION = gql`
    {
      CurrentUser @client {
        userName,
        roleLevel
      }
    }
  `;

  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  abstract renderContent(data);

  render() {
    return (
      <Query query={this.GET_HEADER_INFORMATION}>
        {({loading, error, data}) => {
          if(loading) {
            return <p>Loading...</p>;
          } else if(error) {
            return <p>Error...</p>;
          } else {
            const content = this.renderContent(data);
            return (
              <div className={headerStyle}>
                <div className={titleContainer}>
                  {content}
                </div>
              </div>
            );
          }
        }}
      </Query>
    )
  }
}