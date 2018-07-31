import React, { Component } from 'react';
import { Menu } from 'antd';

export default abstract class NavBase extends Component<any, any> {

  /**
   * css styling for the menu, defined by the page type it is on.
   */
  abstract menu;
  
  constructor(props) {
    super(props);
  }

  /**
   * Render method for the menu items, defiend by the page type it is on.
   */
  abstract renderItems();
  
  render() {
    const content = this.renderItems();
    return (
      <div>
        <Menu
          className={this.menu}
          mode={this.props.direction}
          defaultSelectedKeys={this.props.defaultSelected}
          selectedKeys={this.props.pathname}
        >
          {content}
        </Menu>
      </div>
    )
  }
}