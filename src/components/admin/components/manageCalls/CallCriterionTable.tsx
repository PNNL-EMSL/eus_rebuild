import React, {Component} from 'react';
import CallCriterionRow from 'components/admin/components/manageCalls/CallCriterionRow';
import NewCallCriterion from 'components/admin/components/manageCalls/NewCallCriterion';
import {Button, Modal} from 'antd';
import {buttonMargin, modalTableStyle} from 'styles/base';

import SampleCriteria from 'components/admin/components/manageCalls/SampleCriteria.json';

export default class CallCriterionTable extends Component<any, any>{
  static EXISTING = SampleCriteria.SampleCriteria;

  constructor(props) {
    super(props);
    
    this.state = {
      showExistingModal: false,
      showNewModal: false
    };
    
    this.getCriteriaRows = this.getCriteriaRows.bind(this);
    this.showNewCriteriaModal = this.showNewCriteriaModal.bind(this);
    this.addToCriteria = this.addToCriteria.bind(this);
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
    let index = 0;
    this.props.criteria.forEach((item) => {
      rows.push(
        <CallCriterionRow
          key={index++}
          data={item}
          handleCriteriaChange={this.props.handleCriteriaChange}
          removeCriterion={this.props.onRemove}
        />);
    });
    
    return rows;
  }

  addToCriteria(data) {
    const existing = CallCriterionTable.EXISTING;
    // read data from SampleCriteria.json

    data.id = existing.length + 1;
    existing.push(data);
    // splice in data passed in
    // as part of above, update id in data to be new id


    // write all data back to SampleCriteria.json

    const criteriaCopy = JSON.parse(JSON.stringify(data));
    this.props.onAdd(criteriaCopy);
    this.closeModals();
  }
  
  getExistingCriteria() {
    const rows:JSX.Element[] = [];
    let index = 0;
    CallCriterionTable.EXISTING.forEach((item) => {
      if(this.props.criteria.findIndex((selected) => (selected.title === item.title)) === -1) {
        rows.push(
          <CallCriterionRow
            key={index++}
            data={item}
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
        <Button type="primary" className={buttonMargin} onClick={this.showExistingCriteriaModal}>Add Existing Criteria</Button>
        <Button type="primary" className={buttonMargin} onClick={this.showNewCriteriaModal}>Create New Criteria</Button>
        <Modal
          title="Create New Criterion"
          visible={this.state.showNewModal}
          footer={null}
          onCancel={this.closeModals}
          width={700}
        >
          <NewCallCriterion onAdd={this.addToCriteria}/>
        </Modal>
        <Modal
          title="Add Existing Criterion"
          visible={this.state.showExistingModal}
          footer={null}
          onCancel={this.closeModals}
          width={900}
        >
          <table className={modalTableStyle} >
            <thead>
            <tr>
              <th style={{width: '300px'}}>Criteria title</th>
              <th style={{width: '300px'}}>Criteria Description</th>
              <th style={{width: '100px'}} >Default Weight (%)</th>
              <th style={{width: '100px'}}>Show to Review Panel by Default?</th>
              <th style={{width: '30px'}}/>
            </tr>
            </thead>
            <tbody>
              {existingContent}
            </tbody>
          </table>
        </Modal>
        {content.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{width: '300px'}}>Criteria title</th>
                <th style={{width: '300px'}}>Criteria Description</th>
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