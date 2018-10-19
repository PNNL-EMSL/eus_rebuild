import React, {Component} from 'react';
import {Form} from 'antd';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';

const FormItem = Form.Item;

export default class ManageCallsNew extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      callType: undefined,
      callTypeOther: undefined,

    }

    this.handleCallTypeChange = this.handleCallTypeChange.bind(this);
    this.handleCallTypeOther = this.handleCallTypeOther.bind(this);
  }

  handleCallTypeChange(callType) {
    this.setState({callType});
  }

  handleCallTypeOther(e) {
    const callTypeOther = e.target.value;
    this.setState({callTypeOther});
  }

  render() {

    return (
      <Form>
        <FormItem>
          <AntDesignSelect
            label="Call Type"
            placeholder="Select call type"
            value="TODO"
            otherValue="TODO"
            handleChange={this.handleCallTypeChange}
            handleInput={this.handleCallTypeOther}


          />
        </FormItem>
      </Form>
    )
  }
}