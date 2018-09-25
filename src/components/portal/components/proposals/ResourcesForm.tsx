import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';

export default class ResourcesForm extends WizardPage {
  static defaultProps = {
    title: "Proposal Resources",
    description: "Add EMSL resources to your proposal"
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.beforeNext();
  }
  
  validatePage = (data) => {
    let valid = false;
    // Do the validation logic
    valid = true;
    return valid;
  };

  beforeNext = () => {
    // push the data to a place? unsure what will be needed here
  };

  renderForm() {
    const data = this.props.data;
    return (
      <div>
        <ResourcesForm data={data}/>
      </div>
    )
  }

  getStepName() {
    return 'Resources';
  };

  render() {

    return(
      <div>
        <div>Descriptions and Specifications (link)</div>
        <div>
          Filterable list
          <div>
            Search filter
          </div>
          <div>
            List of all resources
          </div>
        </div>
        <div>
          <div>
            Table
            <div>
              Header row: Resource, Usage
            </div>
            <div>
              Resource Row: Resource name, usage in hours (default 1), removal icon
            </div>
          </div>
        </div>
      </div>
    )
  }
}