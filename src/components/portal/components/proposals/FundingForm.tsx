import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import FundingSources from 'components/portal/components/proposals/FundingSources.json';
import {Input, Radio, Form} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class FundingForm extends WizardPage {
  static defaultProps = {
    title: "Funding Information",
    description: "Provide some basic information about your funding sources"
  };

  constructor(props) {
    super(props);
    this.state = this.props.fundingData;
    props.wizardInstance.beforeNext = this.beforeNext;

    this.handleFundingChange = this.handleFundingChange.bind(this);
    this.handleFundingOther = this.handleFundingOther.bind(this);
    this.handleWorkPackageChange = this.handleWorkPackageChange.bind(this);
  }

  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    const errors = this.props.Validator.doValidate(data, 'fundingForm');
    const existingErrors = this.props.proposalErrors;
    existingErrors.fundingErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    console.log('new state', this.props, this.state);
    this.validatePage(this.state);
    this.props.updateData('fundingData', this.state);
  };

  handleFundingChange(fundingSources) {
    this.setState({fundingSources});
  }
  handleFundingOther(e) {
    const fundingOther = e.target.value;
    this.setState({fundingOther});
  }
  handleWorkPackageChange(e) {
    const fundingWorkPackage = e.target.value;
    this.setState({fundingWorkPackage});
  }

  render() {
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    const data = this.state;
    return(
      <Form>
        <AntDesignSelect
          label='Funding Sources'
          placeholder="Select primary research area..."
          multiple={true}
          optionList={FundingSources.FundingSources}
          value={data.fundingSources}
          otherValue={data.fundingOther}
          handleChange={this.handleFundingChange}
          handleInput={this.handleFundingOther}
          required={true}
        />
        {data.fundingSources.includes('doe_ber') && (
          <FormItem {...formItemLayout} className={'two-rows-label'} label="Are you the PI on the BER grant funding this work?" required={true}>
            <RadioGroup>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </RadioGroup>
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="Work Package #" required={true}>
          <Input defaultValue={data.fundingWorkPackage} onChange={this.handleWorkPackageChange}/>
        </FormItem>
      </Form>
    );
  }
}