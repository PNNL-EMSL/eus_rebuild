import React, { Component } from 'react';
import { css } from 'emotion';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {colorDarkGreen, colorWhite} from 'styles/base';

const header: string = css`
  padding: 5px 20px 5px 10px;
  margin-top: -20px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  background-color: ${colorDarkGreen};
  position: fixed;
  width: 100%;
  z-index: 10;
  align-items: center;
  max-width: 100%;
  border-bottom: ${colorWhite} solid 2px;
`;

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
    console.log('headerBase', this.props);
    return (
      <Query query={this.GET_HEADER_INFORMATION}>
        {({loading, error, data}) => {
          if(loading) {
            return <p>Loading...</p>;
          } else if(error) {
            return <p>Error...</p>;
          } else {
            console.log('header_data', data);
            const content = this.renderContent(data);
            return (
              <div className={header}>
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