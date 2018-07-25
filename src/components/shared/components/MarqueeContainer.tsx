import React, {Component} from 'react';
// import Marquee from 'react-smooth-marquee';
import Marquee from 'react-marquee';
import {css} from 'emotion';
import 'styles/index.scss';

const marquee:string = css`
  font-size:20px;
  text-align: center;
  margin: 10px 0px;
`;

export default class MarqueeContainer extends Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props.settings;
    const display = props.display ? 'block' : 'none';
    return (
      <div>
        <div className={marquee} style={{
          display,
          background: props.background,
          color: props.color
        }}>
          <Marquee text={props.text} hoverToStop={true} loop={true} leading={2000} trailing={2000}/>
        </div>
      </div>

    );
  }
}