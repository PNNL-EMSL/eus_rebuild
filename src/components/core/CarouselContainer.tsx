import React, { Component} from 'react';
import logo from 'images/emsl_logo_notag.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class CarouselContainer extends Component<any, any> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div>
                    <Carousel
                      autoPlay
                      showThumbs={false}
                      infiniteLoop={true}
                      showStatus={false}
                    >
                    <div>
                        <img src={logo}/>
                        <p>LARGE LEGEND WHICH WE CAN SEE OVER THE BUTTON THUMB THING!!!! Legend</p>
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
            </div>
        )
    }

}