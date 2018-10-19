import React, {Component} from 'react';
import {css} from 'emotion';
import {colorWhite, colorLightOrange} from 'styles/base';

const legend: string = css`
  color: ${colorWhite};
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
        </a>
        <p className={legend}>
          {this.props.text}
          <br />
          <a style={{ color: colorLightOrange }}>Read more...</a>
        </p>
      </div>
    );
  }
}