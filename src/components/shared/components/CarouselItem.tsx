import React, {Component} from 'react';
import {css} from 'emotion';

const legend: string = css`
  color: white;
  text-align: center;
`;
  
export default class CarouselItem extends Component<any, any> {
  
  constructor(props) {
    super(props)
    
  }
  
  render() {
    return (
      <div>
        <img src={this.props.src} width={300} height={200}/>
        <p className={legend}>
          {this.props.text}
          <div><a style={{ color: '#D77600' }}>Read more...</a></div>
        </p>

      </div>
    );
  }
}