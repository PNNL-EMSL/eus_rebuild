import React, {Component} from 'react';

export default class ProgressStep extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          I am step {this.props.step} - It is {this.props.valid}
        </div>
        <div>
          {this.props.name}
        </div>
        <div>
          {this.props.errors.length}
        </div>
      </div>
    );
  }
}