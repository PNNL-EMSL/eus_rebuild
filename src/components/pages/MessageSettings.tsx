import React, { Component} from 'react';
import CarouselContainer from 'components/core/CarouselContainer';
import MarqueeContainer from 'components/core/MarqueeContainer';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Marquee from 'react-smooth-marquee';

export default class MessageSettings extends Component {
    render() {
        return (
            <div> 
                <MarqueeContainer />
                <CarouselContainer />
            </div>
        );
    }
}
