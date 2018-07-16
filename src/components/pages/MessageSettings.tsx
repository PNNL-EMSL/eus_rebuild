import React, {Component} from 'react';
import CarouselContainer from 'components/core/CarouselContainer';
import MarqueeContainer from 'components/core/MarqueeContainer';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class MessageSettings extends Component {

  GET_MESSAGE_INFORMATION = gql`
    {
      marqueeText,
      marqueeDisplaying,
      marqueeColor,
    }
  `;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MarqueeContainer />
        <CarouselContainer />
        <Query query={this.GET_MESSAGE_INFORMATION} >
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading Messaging Settings...</p>
            } else if(error) {
              return <p>ERROR LOADING MESSAGE SETTINGS!</p>
            } else {
              console.log(data, data.marqueeInfo);
              // const carouselInfo = data.carouselInfo;
              return (
                <div>
                  <div>
                    Marquee text:
                    <input name='marqueeText' type='text' defaultValue={data.marqueeText} />
                  </div>
                  <div>
                    Marquee displaying:
                    <input name='marqueeDisplay' type='checkbox' defaultChecked={data.marqueeDisplaying}/>
                  </div>
                  <div>
                    Marquee text:
                    <input name='marqueeColor' type='text' defaultValue={data.marqueeColor} />
                  </div>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
