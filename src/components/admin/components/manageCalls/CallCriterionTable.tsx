import React, {Component} from 'react';
import CallCriterionRow from 'components/admin/components/manageCalls/CallCriterionRow';
import NewCallCriterion from 'components/admin/components/manageCalls/NewCallCriterion';
import {Button, Modal} from 'antd';

import SampleCriteria from 'components/admin/components/manageCalls/SampleCriteria.json';

export default class CallCriterionTable extends Component<any, any>{
  constructor(props) {
    super(props);
    
    this.state = {
      showExistingModal: false,
      showNewModal: false
    };
    
    this.getCriteriaRows = this.getCriteriaRows.bind(this);
    this.showNewCriteriaModal = this.showNewCriteriaModal.bind(this);
    this.showExistingCriteriaModal = this.showExistingCriteriaModal.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  showNewCriteriaModal() {
    this.setState({showNewModal: true});
  }

  showExistingCriteriaModal() {
    this.setState({showExistingModal: true});
  }
  
  closeModals() {
    this.setState({showNewModal: false, showExistingModal: false});
  }


  
  getCriteriaRows() {
    const rows:JSX.Element[] = [];
    
    this.props.criteria.forEach((item) => {
      rows.push(
        <CallCriterionRow
          data={item}
          handleWeightChange={this.props.handleWeightChange}
          handlePanelReviewChange={this.props.handlePanelReviewChange}
          removeCriterion={this.props.onRemove}
        />);
    });
    
    return rows;
  }
  
  getExistingCriteria() {
    const rows:JSX.Element[] = [];

    SampleCriteria.SampleCriteria.forEach((item) => {
      if(this.props.criteria.findIndex((selected) => (selected.title === item.title)) === -1) {
        rows.push(
          <CallCriterionRow
            data={item}
            handleWeightChange={this.props.handleWeightChange}
            handlePanelReviewChange={this.props.handlePanelReviewChange}
            addCriterion={this.props.onAdd}
            add={true}
          />);
      }
    });

    return rows;
  }

  render() {
    const content = this.getCriteriaRows();
    const existingContent = this.getExistingCriteria();
    return(
      <div>
        <Button onClick={this.showExistingCriteriaModal}>Add Existing Criteria</Button>
        <Button onClick={this.showNewCriteriaModal}>Create New Criteria</Button>
        <Modal
          title="Create New Criterion"
          visible={this.state.showNewModal}
          onOk={this.props.onAdd}
          onCancel={this.closeModals}
        >
          <NewCallCriterion onAdd={this.props.onAdd}/>
        </Modal>
        <Modal
          title="Add Existing Criterion"
          visible={this.state.showExistingModal}
          onOk={this.props.onAdd}
          onCancel={this.closeModals}
        >
          <table>
            <tbody>
              {existingContent}
            </tbody>
          </table>
        </Modal>
        {content.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Criteria title</th>
                <th>Criteria Description</th>
                <th style={{width: '95px'}} >Weight (%)</th>
                <th style={{width: '75px'}}>Show to Review Panel?</th>
                <th style={{width: '30px'}}/>
              </tr>
            </thead>
            <tbody>
            {content}
            </tbody>
          </table>
        )}
      </div>

    )
  }
}