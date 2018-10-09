import React, {Component} from 'react';

export default class ProgressHeader extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const content =
      Object.keys(this.props.valids).forEach((index) => {
      console.log('progress_step', index, this.props.valids[index]);
    });
    return (
      <div>
        PROGRESS HEADER
      </div>
    )
  }
}