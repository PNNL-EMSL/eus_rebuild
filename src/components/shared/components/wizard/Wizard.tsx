import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Steps } from 'antd';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import ProgressHeader from 'components/shared/components/wizard/ProgressHeader';
// import { cx, css } from 'emotion';

// Component styles



export default class Wizard extends React.Component<any, any> {

  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    initialData: PropTypes.object,
    initialPageValidation: PropTypes.array,
    okLabel: PropTypes.string
  };

  propData = {};
  pageComponent:WizardPage;
  pages:WizardPage[] = [];

  constructor(props) {
    super(props);

    this.state = {
      data: props.initialData,
      currentPageIndex: 0,
      pageValidation: props.initialPageValidation
    };

    this.propData = {};
  }

  canFinish() {
    const valid = this.state.pageValidation.reduce((validAccumulator, currentValue) => {
      return validAccumulator && currentValue;
    }, true);
    return valid;
  }

  canGoBack() {
    return this.state.currentPageIndex > 0;
  }

  canGoForward() {
    const index = this.state.currentPageIndex;
    let canGoForward = false;
    console.log(index, this.pages.length - 1, this.state.pageValidation[index]);
    if(index < this.pages.length - 1 && this.state.pageValidation[index]) {
      canGoForward = true;
    }
    return canGoForward;
  }

  onOk = () => {
    if(this.props.onOk) {
      this.props.onOk(this.state.data);
    }
  };

  onCancel = () => {
    if(this.props.onCancel) {
      this.props.onCancel(this.state.data);
    }
  };

  onBack = () => {
    if(this.canGoBack()) {
      const currentPageIndex = this.state.currentPageIndex - 1;
      this.setState({ currentPageIndex });
    }
  };

  onNext = () => {
    console.log(this.pageComponent);
    this.pageComponent.beforeNext();
    if(this.canGoForward()) {
      const currentPageIndex = this.state.currentPageIndex + 1;
      this.setState({ currentPageIndex });
    }
  };

  onPageChanged = (data, valid) => {
    const pageValidation = this.state.pageValidation;
    pageValidation[this.state.currentPageIndex] = valid;
    this.setState({
      data,
      pageValidation
    });
  };

  renderCurrentPage() {
    // const pageRefFunction = (component) => { this.pageComponent = component; };
    this.pageComponent = this.props.pages[this.state.currentPageIndex];
    console.log('page to render', this.props.pages[this.state.currentPageIndex]);
    return (
      <div>
        {
          this.pages[this.state.currentPageIndex].renderForm()
        }
      </div>
    );
  }

  renderModal() {
    console.log("pageIndex", this.state.currentPageIndex);
    return(
      <div>
        <div>
          <ProgressHeader index={this.state.currentPageIndex} pages={this.props.pages} />
        </div>
        <div className="title">{this.props.title}</div>
        <hr />
        <div className="body">
          {this.renderCurrentPage()}
        </div>
        <hr />
        <div className="footer">
          <div className="buttonBar">
            <div className="buttonBackAndForward">
              <Button onClick={this.onBack} className="btn" disabled={!this.canGoBack()}>&lt; Back</Button>
              <Button onClick={this.onNext} className="btn" disabled={!this.canGoForward()}>Next &gt;</Button>
            </div>
            <br />
            <div>
              <Button onClick={this.onOk} className="btn btn-primary" disabled={!this.canFinish()}>{this.props.okLabel}</Button>
              <Button autoFocus onClick={this.onCancel} className="btn btn-cancel">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let component = <div />
    if (this.props.visible) {
      component = this.renderModal();
    }

    return component;
  }

}