import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import ProposalResourceRow from 'components/portal/components/proposals/ProposalResourceRow';
import Resources from 'components/portal/components/proposals/ProposalResources.json';
import {css} from 'emotion';
import {colorDisabled, colorBlack, colorDarkGreen} from 'styles/base';

const resourceListItem:string = css`
  list-style: none;
  padding: 5px 20px;
`;

const disabledResourceListItem:string = css`
  list-style: none;
  padding: 5px 35px;
  color: ${colorDisabled};
`;

const resourceList:string = css`
  border: 2px solid ${colorBlack};
  max-height: 200px;
  overflow: auto;
`;

export default class ResourcesForm extends WizardPage {
  static defaultProps = {
    title: "Proposal Resources",
    description: "Add EMSL resources to your proposal"
  };

  constructor(props) {
    super(props);
    const initialResources = Resources.Resources.sort((x, y) => (x.localeCompare(y)));

    this.state = {
      resources: this.props.resourcesData.resources,
      filteredList: initialResources,
      fullList: initialResources
    };

    this.renderList = this.renderList.bind(this);
    this.filterResources = this.filterResources.bind(this);
    this.addToResources = this.addToResources.bind(this);
    this.removeFromResources = this.removeFromResources.bind(this);
    this.renderResources = this.renderResources.bind(this);
    this.updateUsage = this.updateUsage.bind(this);
  }

  componentWillUnmount() {
    this.beforeNext();
  }
  
  validatePage = (data) => {
    const errors = this.props.Validator.doValidate(data, 'resourcesForm');
    const existingErrors = this.props.proposalErrors;
    existingErrors.resourcesErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    this.validatePage(this.state.resources);
    this.props.updateData('resourcesData', {resources: this.state.resources});
  };

  updateUsage(value, name) {
    const resources = this.state.resources;
    resources[resources.findIndex((resource) => (resource.name === name))].usage = Number(value);
    this.setState({resources});
  }

  filterResources(e) {
    const filter = e.target.value.toLowerCase();
    const filteredList = this.state.fullList.filter((item) => {
      return item.toLowerCase().search(filter) !== -1;
    });
    this.setState({filteredList})
  }

  addToResources(e) {
    const resourceName = e.currentTarget.outerText;
    const resources = this.state.resources;
    resources.push({name: resourceName, usage: 1});
    this.setState({resources});
  }

  removeFromResources(itemName) {
    const resources = this.state.resources;
    resources.splice(resources.findIndex((item) => (item.name === itemName)), 1);
    this.setState({resources});
  }

  renderList() {
    const selectedResources = this.state.resources;
    return (
      <div>
        <label style={{padding:"5px 5px 10px 50px"}}>Filter Resources List:</label>
        <input onChange={this.filterResources}/>
        <ul className={resourceList}>
          {
            this.state.filteredList.map((item) => {
              if(selectedResources.find((resource) => (resource.name === item))) {
                return (
                  <li key={item} className={disabledResourceListItem}>
                    {item} (Selected)
                  </li>
                )
              }
              return (
                <li key={item} className={resourceListItem} onClick={this.addToResources}>
                  <i className="fas fa-plus-circle" style={{color: colorDarkGreen, left: "-5px", position: "relative"}}/>
                  {item}
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }

  renderResources() {
    return (
      <tbody>
      {this.state.resources.sort((x, y) => (x.name.localeCompare(y.name))).map((item) => {
        return (
          <ProposalResourceRow key={item.name} item={item} updateHandler={this.updateUsage} removeHandler={this.removeFromResources}/>
        )
      })}
      </tbody>
    )
  }

  render() {
    return(
      <div>
        {this.renderList()}
        {this.state.resources.length > 0 && (
          <table className="table table-striped table-bordered" style={{textAlign: 'center'}}>
            <thead>
            <tr>
              <th colSpan={3} style={{fontSize: "24px", textAlign:"center"}}>Selected Resources</th>
            </tr>
            <tr>
              <th style={{textAlign: 'center'}}>Resource Name</th>
              <th style={{textAlign: 'center'}}>Usage</th>
              <th />
            </tr>
            </thead>
            {this.renderResources()}
          </table>
        )}
      </div>
    )
  }
}