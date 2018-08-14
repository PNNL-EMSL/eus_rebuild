import React from 'react';
import PropTypes from 'prop-types';
import ImageFormatter from 'react-data-grid';
import CarouselImgURL from 'components/admin/components/carousel_comps/CarouselImgURL';

export default class CaroImgFormatter extends CarouselImgURL {
    static propTypes = {

    // Modify?  
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]).isRequired
  };

  constructor(props) {
      super(props);
  }

  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  }

  render() {
    return(
        <div>
          title={this.props.value}>{this.props.value}
          <ImageFormatter value={this.props.value} />  
        </div>
    );
  }
}




// Ok, it seems like the ImageFormatter has the ability to conjur up an image, based on URL. 
// The trick is going to be, adding to that formatter in this custum one, in order to display the text.
// See if there is a text formatter somewhere in the react-data-grid formatters and see if you can
// can combine their code. SimpleCellFormatter is the one you want for the text. It also has value.
// Note: figure out how to pass updateImgURL handler to this and how to integrate it
// into the code. THen figure out how to integrate the Formatters into CarouselSettingsObj
// There should be an example in the "all features" example for React Data Grid