import React, {Component} from 'react';
import CallCriterionTable from 'components/admin/components/manageCalls/CallCriterionTable';
import CallExtensionForm from 'components/admin/components/manageCalls/CallExtensionForm';
import {Button, Modal} from 'antd';
import {twoLineButton} from 'styles/base';

import CallTypes from 'components/admin/components/manageCalls/CallTypes.json';
import CallThemes from 'components/admin/components/manageCalls/CallThemes.json';

export default class CallRow extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      criterionVisible: false,
      extensionsVisible: false,
      canCloseReviews: this.props.call.reviewsOpen,
      call: this.props.call
    };

    this.handleCriteriaAdd = this.handleCriteriaAdd.bind(this);
    this.handleCriteriaRemove = this.handleCriteriaRemove.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.handleExtensionAdd = this.handleExtensionAdd.bind(this);

    this.showCriterion = this.showCriterion.bind(this);
    this.showExtensions = this.showExtensions.bind(this);
    this.closeReviews = this.closeReviews.bind(this);
    this.doCopy = this.doCopy.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  handleCriteriaAdd(data) {
    const call = this.state.call;
    const criteria = call.criteria;
    criteria.push(JSON.parse(JSON.stringify(data)));
    this.setState({call});
  }

  handleCriteriaRemove(data) {
    const call = this.state.call;
    const criteria = call.criteria;
    criteria.splice(criteria.findIndex((item) => (data.title === item.title)), 1);
    this.setState({call});
  }

  handleCriteriaChange(data) {
    const call = this.state.call;
    const criteria = call.criteria;
    criteria.splice(criteria.findIndex((item) => (data.id === item.id)), 1, data);
    this.setState({call});
  }

  handleExtensionAdd(data) {
    const call = this.state.call;
    const extentions = call.callExtensions;
    extentions.push(data);
    this.setState({call});
  }

  showCriterion() {
    this.setState({criterionVisible: true});
  }

  showExtensions() {
    this.setState({extensionsVisible: true});
  }

  closeReviews() {
    this.setState({canCloseReviews: false});
    // TODO: update reviews in call and notify user that they are closed.
  }
  
  doCopy() {
    this.props.onCopy(this.state.call.id);
  }

  closeModals() {
    this.setState({criterionVisible: false, extensionsVisible: false})
  }

  createCallTitle(call) {
    let title = '';
    const CALL_TYPES = CallTypes.CallTypes;
    const CALL_THEMES = CallThemes[call.callType];
    if(call.callType === 'other') {
      title += call.callTypeOther;
    } else {
      title += CALL_TYPES[CALL_TYPES.findIndex((callType) => (callType.value === call.callType))].label;
    }
    title += ':';
    if(call.callTheme === 'other') {
      title += call.callThemeOther;
    } else {
      title += CALL_THEMES[CALL_THEMES.findIndex((callTheme) => (callTheme.value === call.callTheme))].label;
    }
    return title;
  }

  render() {
    const call = this.state.call;
    const callTitle = this.createCallTitle(call);
    return (
      <tr>
        <td>{call.id}</td>
        <td>{callTitle}</td>
        <td>{call.proposalDuration}</td>
        <td>{call.callStartDate}</td>
        <td>{call.callEndDate}</td>
        <td>{call.proposalId}</td>
        <td>{call.numProposals}</td>
        <td>{call.callExtensions.length}</td>
        <td><Button className={twoLineButton} type="primary" onClick={this.showCriterion}>Manage<br />Criterion</Button></td>
        <td><Button className={twoLineButton} type="primary" onClick={this.showExtensions}>Manage<br />Extensions</Button></td>
        <td>
          {this.state.canCloseReviews && (
            <Button className={twoLineButton} type="primary" onClick={this.closeReviews}>Close<br />Reviews</Button>
          )}
        </td>
        <td><Button className={twoLineButton} type="primary" onClick={this.doCopy}><i className='fas fa-copy fa-2x' /></Button></td>
        <Modal
          title={"Manage Criterion for "+callTitle}
          visible={this.state.criterionVisible}
          onCancel={this.closeModals}
          footer={null}
          width={1000}
        >
          <CallCriterionTable
            criteria={call.criteria}
            handleCriteriaChange={this.handleCriteriaChange}
            onAdd={this.handleCriteriaAdd}
            onRemove={this.handleCriteriaRemove}
          />
        </Modal>
        <Modal
          title={"Manage Extensions for "+callTitle}
          visible={this.state.extensionsVisible}
          onCancel={this.closeModals}
          footer={null}
          width={1000}
        >
          <CallExtensionForm
            callExtensions={call.callExtensions}
            endDate={call.callEndDate}
            onAdd={this.handleExtensionAdd}
          />
        </Modal>
      </tr>
    )
  }
}