import React, {Component} from 'react';
import {css} from 'emotion';

const legend: string = css`
  color: black;
`;

export default class CarouselItem extends Component<any, any> {
  
  constructor(props) {
    super(props)
    
  }
  
  render() {
    return (
      <div>
        <img src={this.props.src} width={300} height={200}/>
        <p className={legend}>{this.props.text}</p>
      </div>
    );
  }
}