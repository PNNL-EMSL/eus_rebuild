import React, {Component} from 'react';
import CarouselContainer from 'components/core/CarouselContainer';
import MarqueeContainer from 'components/core/MarqueeContainer';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class MessageSettings extends Component {

  GET_MESSAGE_INFORMATION = gql`
    {
      MarqueeInfos @client {
        id,
        text,
        color,
        display,
      }
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
              const marqueeData = data.MarqueeInfos[0]; // marquee data is going to be a single object
              return (
                <div>
                  <div>
                    Marquee text:
                    <input name='marqueeText' type='text' defaultValue={marqueeData.text} />
                  </div>
                  <div>
                    Marquee displaying:
                    <input name='marqueeDisplay' type='checkbox' defaultChecked={marqueeData.display}/>
                  </div>
                  <div>
                    Marquee color:
                    <input name='marqueeColor' type='text' defaultValue={marqueeData.color} />
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
