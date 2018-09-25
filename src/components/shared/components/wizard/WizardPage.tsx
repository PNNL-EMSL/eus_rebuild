import PropTypes from 'prop-types';
import React from 'react';
import { cx, css } from 'emotion';
// import { colorLightGrey, colorVeryLightGrey, colorLightOrange } from 'styles/base';

// Component styles
const page = css`
    display: flex:
    flex: 1;
    flex-direction: column;
`;

const title = css`
    font-weight: 900;
    font-size: 14px;
    margin-bottom: 5px;
`;

const titleBox = css`
    background-color: white;
    padding: 15px;
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
`;

const formBox = css`
    flex: 1 0 auto;
    padding: 15px;
    min-height: 400px;
    max-height: calc(100vh - 280px);
    overflow: auto;
`;

const icon = css`
`;


export default class WizardPage extends React.Component<any, any> {

  static propTypes = {
    title: PropTypes.string,       // the title of the page
    description: PropTypes.string, // the description of the page, shown in the top of the form
    data: PropTypes.object,        // the data from the wizard that the page will fill out
    onChange: PropTypes.func       // handler when any data is changed on the page;  it passes the new data and validation state
  };

  /**
   * Child classes should override
   * @returns {*}
   */
  renderForm() {
    return (
      <div/>
    );
  }

  render() {
    return (
      <div className={page}>

        <div className={titleBox}>
          <div className="titleRow">
            <div className={css`flex: 1;`}>
              <div className={title}>{this.props.title}</div>
              <div>{this.props.description}</div>
            </div>
            <i className={cx(icon, 'fa fa-cogs fa-3x')}/>
          </div>
        </div>

        <div className={formBox}>
          {this.renderForm()}
        </div>
      </div>
    );
  }

}
