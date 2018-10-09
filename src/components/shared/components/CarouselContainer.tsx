import React, { Component} from 'react';
import CarouselItem from 'components/shared/components/CarouselItem';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import "../../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import {css} from 'emotion';

const center: string=css`
  text-align: center;
`;

export default class CarouselContainer extends Component<any, any> {
    constructor(props) {
        super(props);
    }
    
    render() {
      const content:JSX.Element[] = [];
      this.props.settings.filter((item) => (item.display)).sort((a,b) => (a.order - b.order)).forEach((item) => {
        if(item.display) {
          content.push(<div> <CarouselItem src={item.imgUrl} text={item.text} webUrl={item.webUrl}/> </div>);
        }
      });

      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        pauseOnHover: true,
        className: center
      }

        return (
            <Slider {...settings} style={{display: 'inline-grid !important'}}> 
                {content}
            </Slider>
        )
    }

}