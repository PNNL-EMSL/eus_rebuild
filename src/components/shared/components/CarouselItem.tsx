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
        <a href={this.props.webUrl} target="_blank">
          <img src={this.props.src} style={{display: 'block', margin: 'auto'}} width={90} height={60}/>
          <p className={legend}>
            {this.props.text}
            <div><a style={{ color: '#D77600' }}>Read more...</a></div>
          </p>
        </a>
      </div>
    );
  }
}