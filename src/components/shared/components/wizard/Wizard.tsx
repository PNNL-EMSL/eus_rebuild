import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Steps } from 'antd';

// import { cx, css } from 'emotion';

// Component styles

const Step = Steps.Step;

export default class Wizard extends React.Component<any, any> {

  static propTypes = {
    visible: PropTypes.bool,       // whether the wizard should be visible or not
    onOk: PropTypes.func,          // handler when OK button is pressed
    onCancel: PropTypes.func,      // handler when cancel button is pressed
    title: PropTypes.string,       // the title of the wizard
    okLabel: PropTypes.string,     // the label to use on the ok button
  };

  static defaultProps = {
    visible: false,
    title: 'Wizard',
    okLabel: 'Save',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPageIndex: 0      // the index of the page currently being shown
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible === false && nextProps.visible === true) {
      this.resetWizardState(nextProps);
    }
  }

  /**
   * Children should override if they want to show progress steps at the bottom of the wizard.  Each page can
   * be mapped to the associated step.
   * @returns {Array[string]}
   */
  getSteps() {
    const steps:string[] = [];
    return steps;
  }

  /**
   * Children can override to evaluate if the given step has an error condition that should be rendered.
   * @param stepName
   * @returns {boolean}
   */
  hasStepError(stepName) {
    return false;
  }

  /**
   * Children should override to provide the list of pages available to the wizard.  This lets them
   * dynamically change which pages are available.
   * @returns {Array[Object]}
   */
  getPages() {
    const pages:Array<{component, id, stepPos}> = [];
    return pages;
  }

  /**
   * Get the props that this wizard should pass to its children
   * Children should override to pass their specific properites
   * @returns {object}
   */
  getChildProps() {
    return  {
      wizardInstance: this
    };
  }

  getStepErrors() {
    const stepErrors = {};
    const stepsList = this.getSteps();
    stepsList.forEach(step => {
      stepErrors[step] = this.hasStepError(step);
    });
    return stepErrors;
  }

  /**
   * Children can override to reset other parts of the state when wizard is re-opened
   */
  resetWizardState(props) {
    // from inside componentWillReceiveProps, setState will NOT trigger a render
    this.setState({
      currentPageIndex: 0  // reset the wizard to the first page
    });
  }

  canFinish(stepErrors) : boolean {
    let canFinish = true;
    Object.keys(stepErrors).forEach(step => {
      if (stepErrors[step]) {
        canFinish = false;
      }
    });
    return canFinish;
  }

  canGoBack() {
    return this.state.currentPageIndex > 0;
  }

  canGoForward() {
    const pages = this.getPages();
    const index = this.state.currentPageIndex;
    let canGoForward = false;
    if (index < pages.length - 1 && !this.missingRequiredInfo(pages[index].id)) {
      canGoForward = true;
    }

    return canGoForward;
  }

  missingRequiredInfo = (pageId) => {
    // override to prevent moving on to next page if required information is missing
    return false;
  };

  onOk = () => {
    if (this.props.onOk) {
      this.props.onOk();
    }
  };

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onBack = () => {
    if (this.canGoBack()) {
      let currentPageIndex = this.state.currentPageIndex;
      currentPageIndex = currentPageIndex - 1;
      this.setState({ currentPageIndex });
    }
  };

  onNext = () => {
    if (this.canGoForward()) {
      this.beforeNext();
      let currentPageIndex = this.state.currentPageIndex;
      currentPageIndex = currentPageIndex + 1;
      this.setState({ currentPageIndex });
    }
  };

  beforeNext = () => {
    // modify process or anything that needs to be done before going to the next page
  };

  renderCurrentPage(pages) {
    // Create the current page component and pass it the current data and change handlers
    console.log('this.getChildProps()', this.getChildProps());
    return (
      <div>
        { React.createElement(pages[this.state.currentPageIndex].component, this.getChildProps()) }
      </div>
    );
  }

  renderSteps(pages, stepErrors) {
    const stepsList = this.getSteps();
    const lastPage = this.state.currentPageIndex === (pages.length - 1) ? true : false;

    if (stepsList.length > 0) {
      console.log('renderSteps', pages, this.state.currentPageIndex)
      const currentStep = pages[this.state.currentPageIndex].stepPos;
      // const formChanged = pages[this.state.currentPageIndex].updated;
      const steps = stepsList.map((step, index) => {
        let stepStatus = 'process';
        const lastStep = index === (stepsList.length - 1) ? true : false;
        if (stepErrors[step]) {
          stepStatus = 'error';
        } else if (lastPage && lastStep) {
          // if we are on the last page and there is no error, then we can set the finished status
          stepStatus = 'finish';
          console.log('');
        }
        const navToStep = () => {
          this.setState({currentPageIndex: index});
        };
        // console.log('step info', currentStep, step, index);
        return (
          <Step key={step} title={step} status={stepStatus} onClick={navToStep}/>
        );
      });
      return (
        <Steps size="small" current={currentStep}>
          {steps}
        </Steps>
      );

    }
    return <div/>;
  }

  renderModal() {
    const pages = this.getPages();
    const stepErrors = this.getStepErrors();
    const canFinish = this.canFinish(stepErrors);
    console.log('new state...?');

    return(
      <div>
        <div className="title">
          <div>
            {this.props.title}
          </div>
          {this.renderSteps(pages, stepErrors)}
        </div>
        <hr />
        <div className="body">
          {this.renderCurrentPage(pages)}
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
              <Button onClick={this.onOk} className="btn btn-primary" disabled={!canFinish}>{this.props.okLabel}</Button>
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