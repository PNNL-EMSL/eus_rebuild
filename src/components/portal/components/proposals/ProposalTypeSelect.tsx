import React, {Component} from 'react';
import {Select, Radio} from 'antd';
import { css } from 'emotion';

const Option = Select.Option;
const OptGroup = Select.OptGroup;
const RadioGroup = Radio.Group;

const verticalRadio = css`
  display: block;
  height: 30px;
`;

const radioGroupStyling = css`
  margin: 0 25px;
`;

const questionGrouping = css`
  margin: 15px;
`;

export default class ProposalTypeSelect extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      displayGeneral: props.value === "general",
      displayPayQuestion: props.pay,
      displayPartner: props.value === "partner"
    };
    this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
    this.renderGeneralQuestions = this.renderGeneralQuestions.bind(this);
    this.handleNoPay = this.handleNoPay.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }

  handleProposalTypeChange(value) {
    if(value === 'general') {
      this.setState({displayGeneral: true, displayPartner: false});
    } else if(value==='partner') {
      this.setState({displayGeneral: false, displayPartner: true});
    } else {
      this.setState({displayGeneral: false, displayPartner: false});
    }
    this.props.handleProposalTypeChange(value);
  }

  handleNoPay(e) {
    this.setState({displayPayQuestion: e.target.value});
    this.props.handleProposalPayChange(e.target.value);
  }
  
  handleRestricted(e) {
    this.props.handleProposalRestrictedChange(e.target.value);
  }

  handleReason(e) {
    if(e.target.value === 'rapid') {
      // display reminder to provide justification for requesting RAPID access in proposed research file
    }
    this.props.handleProposalReasonChange(e.target.value);
  }

  handleTheme(e) {
    this.props.handleProposalThemeChange(e.target.value);
  }

  renderSubGroup(subGroup) {
    const content:JSX.Element[] = [];
    subGroup.forEach((subItem) => {
      content.push(<Option key={subItem.value} value={subItem.value}>{subItem.label}</Option>)
    });
    return content;
  }

  renderOptions() {
    const options:JSX.Element[] = [];
    this.props.optionList.forEach((item) => {
      if(item.subGroup !== undefined) {
        const content = this.renderSubGroup(item.subGroup);
        options.push(<OptGroup key={item.value} label={item.label}>{content}</OptGroup>);
      } else {
        options.push(<Option key={item.value} value={item.value}>{item.label}</Option>)
      }
    });
    return options;
  }

  renderGeneralQuestions() {
    const content:JSX.Element[] = [];
    content.push(
      <div className={questionGrouping}>
        <label>Are you planning to pay for any technical support needed?</label>
        <RadioGroup defaultValue={this.props.pay} className={radioGroupStyling} onChange={this.handleNoPay}>
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </RadioGroup>
      </div>
    );
    if(this.state.displayPayQuestion === 1) {
      content.push(
        <div className={questionGrouping}>
          <label>Is this business sensitive or restricted from public dissemination?</label>
          <RadioGroup defaultValue={this.props.restricted} className={radioGroupStyling} onChange={this.handleRestricted}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </RadioGroup>
        </div>
      )
    } else if(this.state.displayPayQuestion === 0) {
      content.push(
        <div className={questionGrouping}>
          <label>Please indicate any special circumstances by selecting one of the options below:</label>
          <div>
            <RadioGroup defaultValue={this.props.reason} className={radioGroupStyling} onChange={this.handleReason}>
              <Radio className={verticalRadio} value="N/A">Not applicable (will be held until the September panel review to compete for technical support)</Radio>
              <Radio className={verticalRadio} value="rapid">Research related to urgent deadlines/deliverables or small proof-of-principle request</Radio>
              <Radio className={verticalRadio} value="non_emsl">Requesting resources that are owned or co-owned by non-EMSL programs</Radio>
            </RadioGroup>
          </div>
        </div>
      )
    }
    content.push(this.renderPartnerQuestions());
    return content;
  }

  renderPartnerQuestions() {
    console.log('displaying partner questions');
    return(
      <div className={questionGrouping}>
        <label style={{verticalAlign: "top"}}>Please select the Science Theme that best fits your proposed research.</label>
        <RadioGroup defaultValue={this.props.theme} className={radioGroupStyling} onChange={this.handleTheme}>
          <Radio className={verticalRadio} value="bioSciences">Biological Sciences</Radio>
          <Radio className={verticalRadio} value="enviroSciences">Environmental Sciences</Radio>
          <Radio className={verticalRadio} value="other">Other</Radio>
        </RadioGroup>
      </div>
    )
  }

  renderFollowOn() {
    if(this.state.displayGeneral) {
      return this.renderGeneralQuestions();
    } else if(this.state.displayPartner) {
      return this.renderPartnerQuestions();
    } else {
      return (<div />);
    }
  }

  render() {
    const options = this.renderOptions();
    const followOnQuestions = this.renderFollowOn();
    return(
      <div>
        <label>{this.props.label}</label>
        <Select
          style={{width: "75%", float: "right"}}
          placeholder = {this.props.placeholder}
          onChange={this.handleProposalTypeChange}
          defaultValue={this.props.value}
        >
          {options}
        </Select>
        {followOnQuestions}
      </div>
    )
  }

}