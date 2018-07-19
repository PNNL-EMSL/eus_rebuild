import React, { Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from 'components/core/CarouselItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class CarouselContainer extends Component<any, any> {
    constructor(props) {
        super(props);
    }
    
    render() {
      const content:JSX.Element[] = [];
      this.props.settings.filter((item) => (item.display)).sort((a,b) => (a.order - b.order)).forEach((item) => {
        if(item.display) {
          content.push(<CarouselItem src={item.imgUrl} text={item.text} />);
        }
      });
        return (
            <div>
                <div>
                    <Carousel
                      autoPlay
                      showThumbs={false}
                      infiniteLoop={true}
                      showStatus={false}
                    >
                      {content}
                    </Carousel>
                </div>
            </div>
        )
    }

}