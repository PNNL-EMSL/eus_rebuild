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
            </div>
        )
    }

}