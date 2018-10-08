import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import {Steps, Popover} from 'antd';

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

  hasStepComplete(stepName) {
    return false;
  }
  
  /**
   * Children should override to provide the list of pages available to the wizard.  This lets them
   * dynamically change which pages are available.
   * @returns {Array[Object]}
   */
  getPages() {
    const pages:any[] = [];
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

  getStepCompletes() {
    const stepCompletes = {};
    const stepsList = this.getSteps();
    stepsList.forEach(step => {
      stepCompletes[step] = this.hasStepComplete(step);
    });
    return stepCompletes;
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

  canFinish(stepCompletes) : boolean {
    return this.getPages().length === stepCompletes.length;
    // let canFinish = true;
    // Object.keys(stepErrors).forEach(step => {
    //   if (stepErrors[step]) {
    //     canFinish = false;
    //   }
    // });
    // return canFinish;
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
    return (
      <div>
        { React.createElement(pages[this.state.currentPageIndex].component, this.getChildProps()) }
      </div>
    );
  }

  renderSteps(pages, stepErrors, stepCompletes) {
    const stepsList = this.getSteps();
    const stepTooltips:any[] = [];
    const lastPage = this.state.currentPageIndex === (pages.length - 1) ? true : false;

    if (stepsList.length > 0) {
      const currentStep = pages[this.state.currentPageIndex].stepPos;
      const steps = stepsList.map((step, index) => {
        let stepStatus = '';
        const tooltipArray:any[] = [];
        let stepTooltip:any = '';
        if(currentStep !== index) {
          stepStatus = 'wait';
        }
        const lastStep = index === (stepsList.length - 1) ? true : false;
        if (stepErrors[step]) {
          stepStatus = 'error';
          stepErrors[step].forEach((item, errIndex) => {
            if(errIndex > 2) {
              return;
            }
            tooltipArray.push(item.tooltip);
          });
          stepTooltip = tooltipArray.join('</div><div>');
          if(tooltipArray.length < stepErrors[step].length) {
            tooltipArray.push('and '+(stepErrors[step].length - tooltipArray.length).toString()+' more errors...');
          }
          stepTooltips[index] = tooltipArray;
        } else if (lastPage && lastStep) {
          stepStatus = 'finish';
        } else if (stepCompletes[step]){
          stepStatus = 'finish';
        }
        const navToStep = () => {
          this.setState({currentPageIndex: index});
        };
        if(stepTooltips[index]) {
          const innerContent:any[] = [];
          stepTooltips[index].forEach((item, itemIndex) => {
            innerContent.push(<div key={itemIndex}>{item}</div>)
          });
          const content = <div>{innerContent}</div>;
          return (
            <Step key={step} title={<Popover content={content}>{step}</Popover>} status={stepStatus} tooltip={stepTooltip} onClick={navToStep}/>
          );
        } else {
          return (
            <Step key={step} title={step} status={stepStatus} tooltip={stepTooltip} onClick={navToStep} />
          );
        }
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
    const stepCompletes = this.getStepCompletes();
    const canFinish = this.canFinish(stepCompletes);

    return(
      <div>
        <div className="title">
          <h1>
            {this.props.title}
          </h1>
          {this.renderSteps(pages, stepErrors, stepCompletes)}
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