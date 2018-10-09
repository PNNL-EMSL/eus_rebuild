import React from 'react';
import CarouselImgURL from 'components/admin/components/carousel_comps/CarouselImgURL';

export default class CaroImgFormatter extends CarouselImgURL {
  constructor(props) {
      super(props);
  }

  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  }

  render() {
    return(
        <div title={this.props.value}>
          <img src={this.props.value} style={{height: "40px"}}/> 
        </div>
    );
  }
}