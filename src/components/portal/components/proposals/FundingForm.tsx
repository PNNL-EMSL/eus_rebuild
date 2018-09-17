import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';


export default class FundingForm extends WizardPage {
  static defaultProps = {
    title: "Funding Information",
    description: "Provide some basic information about your funding sources"
  };

  constructor(props) {
    super(props);
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
        <FundingForm data={data}/>
      </div>
    )
  }

  getStepName() {
    return 'Funding';
  };

  render() {

    return(
      <div>
        <div>Typeahead for funding sources, need to be able to display multiple selections.</div>
        <div>Use http://ericgio.github.io/react-bootstrap-typeahead/ (https://github.com/ericgio/react-bootstrap-typeahead) for typeahead</div>
        <div>If Other is one of those selected above ^, need to have an input to capture the other.</div>
      </div>
    );
  }
}