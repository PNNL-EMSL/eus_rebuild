import React, {Component} from 'react';
import FormError from 'components/shared/components/FormError';

import {Form, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

export default class NewCallCriterion extends Component<any, any>{

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handlePanelChange = this.handlePanelChange.bind(this);

    this.addCriterion = this.addCriterion.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  getInitialState() {
    return {
      title: '',
      text: '',
      weight: '',
      panel: false,
      default: false,
      errors: {
        titleError: '',
        textError: '',
        weightError: ''
      }
    };
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  
  handleDescriptionChange(e) {
    this.setState({text: e.target.value});
  }

  handleWeightChange(e) {
    this.setState({weight: e.target.value});
  }

  handlePanelChange(e) {
    this.setState({panel: e.target.checked});
  }
  
  addCriterion() {
    // Reset errors so we can check appropriately
    const errors = {
      titleError: '',
      textError: '',
      weightError: ''
    };
    const weight = parseInt(this.state.weight, 10);
    if((this.state.title !== '' && this.state.text !== '') &&
       (this.state.weight === '' || (!isNaN(weight) && weight > 0 && weight <= 100))
    ) {
      const data = {
        title: this.state.title,
        text: this.state.text,
        weight: this.state.weight,
        panel: this.state.panel,
        isDefault: this.state.default
      };
      this.props.onAdd(data);
      this.resetForm();
    } else {
      if(this.state.title === '') {
        errors.titleError = 'error';
      }
      if(this.state.text === '') {
        errors.textError = 'error';
      }
      if(isNaN(weight) || weight <= 0 && weight > 100) {
        errors.weightError = 'error';
      }
    }
    this.setState({errors});
  }

  resetForm() {
    this.setState(this.getInitialState());
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
    return(
      <div>
        <Form>
          <FormItem
            {...formItemLayout}
            label="Title"
            required={true}
            validateStatus={this.state.errors.titleError}
          >
            <Input value={this.state.title} onChange={this.handleTitleChange}/>
            {this.state.errors.titleError && (<FormError error="You must provide a title for the criterion" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Description"
            required={true}
            validateStatus={this.state.errors.textError}
          >
            <TextArea value={this.state.text} autosize={{ minRows: 2, maxRows: 6 }} onChange={this.handleDescriptionChange}/>
            {this.state.errors.textError && (<FormError error="You must provide a description for the criterion" />)}
          </FormItem>
        </Form>
        <hr />
        <Form layout="inline">
          <FormItem label="Default weight" validateStatus={this.state.errors.weightError}>
            <Input value={this.state.weight} onChange={this.handleWeightChange}/>
            {this.state.errors.weightError && (<FormError error="Please provide an integer between 1 and 100 for the percent weight" />)}
          </FormItem>
          <FormItem label="Show to Panel by default">
            <Checkbox checked={this.state.panel} onChange={this.handlePanelChange}/>
          </FormItem>
        </Form>
        <hr />
        <Button type="primary" onClick={this.addCriterion}>Add</Button>
      </div>
    )
  }
}