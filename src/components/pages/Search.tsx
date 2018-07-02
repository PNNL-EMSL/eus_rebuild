import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Menu, Dropdown } from 'antd';
import { css } from 'emotion';
import GraphQLError from 'components/core/GraphQLError';
import { flexRow } from 'styles/base';
import * as c from 'services/constants';

// Component styles
const dropdownContainer = css`
  ${flexRow};
`;

type MyProps = {  };
type MyState = { queryBy: string };
export default class Search extends Component<MyProps, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
        queryBy: 'Gene'
    };
  }

  onClick = (info: any) => {
    this.setState({ queryBy: info.key });
  }
  
  renderSearch() {
    if (this.state.queryBy === c.TYPE_GENE) {
      return this.renderGeneSearch();

    } else {
      return <div />
    }
  }
  renderGeneSearch(): any {
    return (
      <Query
        query={gql`
        {
          rates(currency: "USD") {
            currency
            rate
          }
        }
      `}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;

          } else if (error) {
            return <GraphQLError message="Failed to query server." error={error} />;

          } else {/* this is an example of adding type definitions to arrow function params */ }
            const items = data.rates.map(({ currency, rate }: { currency: string, rate: string }) => {
              return (
                <li key={currency}>{`${currency}: ${rate}`}
                </li>
              )
          });
          return (
            <ul>{items}</ul>
          )
        }
        }
      </Query>
    );
  }

  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key={c.TYPE_GENE}>{c.TYPE_GENE}</Menu.Item>
        <Menu.Item key={c.TYPE_METABOLITE}>{c.TYPE_METABOLITE}</Menu.Item>
        <Menu.Item key={c.TYPE_FUNCTIONAL_CATEGORY}>{c.TYPE_FUNCTIONAL_CATEGORY}</Menu.Item>
        <Menu.Item key={c.TYPE_METABOLIC_PATHWAY}>{c.TYPE_METABOLIC_PATHWAY}</Menu.Item>
      </Menu>
    );
    return (
      <div className={css`display: flex; flex-direction: column;`}>
        <div className={dropdownContainer}>
          <div className={css`margin-right: 5px;`}>Search by: </div>
          <Dropdown overlay={menu} placement="topLeft">
            <a className="ant-dropdown-link" href="#">
              {this.state.queryBy}
            </a>
          </Dropdown>
        </div>
        {this.renderSearch()}
      </div>

    );
  }
}
