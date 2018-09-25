import React, {Component} from 'react';
import NewProposalWizard from 'components/portal/pages/proposals/NewProposalWizard';

export default class ProposalNew extends Component<any, any> {
  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
  }

  onCancel() {
    this.props.history.push('/Portal/proposals/');
  }

  onOk() {
    alert('Saving your proposal!');
    this.props.history.push('/Portal/proposals/');
  }

  render() {
    return(
      <div>
        <NewProposalWizard onOk={this.onOk} onCancel={this.onCancel} />
      </div>
    )
  }

}

