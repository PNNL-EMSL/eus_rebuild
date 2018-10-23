import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

export default class NewCallCriterion extends Component<any, any>{

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: ''
    };
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.addCriterion = this.addCriterion.bind(this);
  }
  
  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  
  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }
  
  addCriterion() {
    const data = {title: this.state.title, text: this.state.text, weight: undefined, panel: false, isDefault: false}
    this.props.onAdd(data);
  }

  render() {
    return(
      <Form>
        <FormItem label="Title">
          <Input onChange={this.handleTitleChange}/>
        </FormItem>
        <FormItem label="Description">
          <Input onChange={this.handleDescriptionChange}/>
        </FormItem>
        <FormItem>
          <Button onClick={this.addCriterion}>Add</Button>
        </FormItem>
      </Form>
    )
  }
}