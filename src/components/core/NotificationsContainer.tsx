/** Created by Pierce 7/12/18 */
import React, { Component} from 'react';
import logo from 'images/emsl_logo_notag.jpg'
import { css } from 'emotion';
import Marquee from 'react-smooth-marquee'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const marquee: string = css`
  width: 60%;
  font-size:20px;
  
`
export default class NotificationsContainer extends Component<any, any> {

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
                
                <div>
                    <Carousel autoPlay width="70%">
                    <div>
                        <img src={logo}/>
                        <p>Legend</p>
                    </div>
                    <div>
                        <img src={logo}/>
                        <p>Legend 2</p>
                    </div>
                    <div>
                        <img src={logo}/>
                        <p>Legend 3</p>
                    </div>
                    </Carousel>
                </div>
            </ div>


        );
    }
}
