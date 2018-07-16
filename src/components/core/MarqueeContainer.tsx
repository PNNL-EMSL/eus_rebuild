import React, { Component} from 'react';
import Marquee from 'react-smooth-marquee'; 
import { css } from 'emotion';

const marquee: string = css`
  width: 60%;
  font-size:20px;
  
`

export default class MarqueeContainer extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return(

            <div>
                <div className={marquee}>
                <Marquee>
                    Content goes here 
                </Marquee>
          
                </div>
            </div>

        );
    }
}