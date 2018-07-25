import React, {Component} from 'react';
import {css} from 'emotion';

const legend: string = css`
  color: white;
`;

export default class CarouselItem extends Component<any, any> {
  
  constructor(props) {
    super(props)
    
  }
  
  render() {
    return (
      <div>
        <img src={this.props.src}/>
        <p className={legend}>{this.props.text}</p>
      </div>
    );
  }
}