import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import FundingSources from 'components/portal/components/proposals/FundingSources.json';
import ProposalFundingRow from 'components/portal/components/proposals/ProposalFundingRow';
import {Radio, Form} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class FundingForm extends WizardPage {
  static defaultProps = {
    title: "Funding Information",
    description: "Provide some basic information about your funding sources"
  };

  static FUNDING_SOURCES = FundingSources.FundingSources;

  constructor(props) {
    super(props);
    this.state = {
      fundingList: this.props.fundingData.fundingList,
      fundingOther: this.props.fundingData.fundingOther,
      fundingSources: this.props.fundingData.fundingSources,
      berSelection: this.props.fundingData.berSelection
    };

    props.wizardInstance.beforeNext = this.beforeNext;

    this.handleFundingChange = this.handleFundingChange.bind(this);
    this.handleFundingOther = this.handleFundingOther.bind(this);
    this.handleWorkPackageChange = this.handleWorkPackageChange.bind(this);
    this.renderFunding = this.renderFunding.bind(this);
    this.berUpdate = this.berUpdate.bind(this);
    this.updateGrantNum = this.updateGrantNum.bind(this);
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

  handleFundingChange(fundingList) {
    const originalFundingSources = this.state.fundingSources;
    let fundingSources:any[] = [];
    const fundings = FundingForm.FUNDING_SOURCES;
    if(fundingList.length < this.state.fundingList.length) {
      // remove funding
      console.log('removing from sources');
      originalFundingSources.forEach((item) => {
        if(fundingList.includes(item.name)) {
          fundingSources.push(item);
        }
      })
    } else {
      console.log('adding to sources');
      fundingList.forEach((item) => {
        if(originalFundingSources.findIndex((fund) => (fund.name === item)) === -1) {
          // FundingForm.FUNDING_SOURCES
          console.log('pause here', fundings);
          const label = fundings[fundings.findIndex((fund) => (fund.value === item))].label;
          originalFundingSources.push({name: item, label, grant: ''});
        } 
      });
      fundingSources = originalFundingSources
    }
    console.log(fundingSources);
    this.setState({fundingSources, fundingList});
  }

  handleFundingOther(e) {
    const fundingOther = e.target.value;
    this.setState({fundingOther});
  }

  handleWorkPackageChange(e) {
    const fundingWorkPackage = e.target.value;
    this.setState({fundingWorkPackage});
  }

  berUpdate(e) {
    const berSelection = e.target.value;
    this.setState({berSelection})
  }
  
  updateGrantNum(name, grantNum) {
    const fundingSources = this.state.fundingSources;
    fundingSources[fundingSources.findIndex((source) => (source.name === name))].grant = grantNum;
    this.setState({fundingSources});
  }

  renderFunding() {
    return (
      <tbody>
      {this.state.fundingSources.sort((x, y) => (x.name.localeCompare(y.name))).map((item) => {
        return (
          <ProposalFundingRow key={item.name} item={item} updateHandler={this.updateGrantNum} />
        )
      })}
      </tbody>
    )
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
    const tableLayout = {
      wrapperCol: {
        sm: { span: 18, offset: 6 },
      },
    };
    const data = this.state;
    return(
      <Form>
        <AntDesignSelect
          label='Funding Sources'
          placeholder="Select all funding sources..."
          multiple={true}
          optionList={FundingForm.FUNDING_SOURCES}
          value={data.fundingList}
          otherValue={data.fundingOther}
          handleChange={this.handleFundingChange}
          handleInput={this.handleFundingOther}
          required={true}
        />
        {data.fundingList.includes('doe_ber') && (
          <FormItem {...formItemLayout} className={'two-rows-label'} label="Are you the PI on the BER grant funding this work?" required={true}>
            <RadioGroup defaultValue={data.berSelection} onChange={this.berUpdate}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          </FormItem>
        )}
        {data.fundingSources.length > 0 && (
          <FormItem {...tableLayout}>
            <table className="table table-striped table-bordered" style={{textAlign: 'center'}}>
              <thead>
              <tr>
                <th style={{textAlign: 'center'}}>Funding Source</th>
                <th style={{textAlign: 'center'}}>Primary Grant #</th>
              </tr>
              </thead>
              {this.renderFunding()}
            </table>
          </FormItem>
        )}
      </Form>
    );
  }
}