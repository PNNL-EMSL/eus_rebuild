import React from 'react';
import AdminPageBase from 'components/admin/pages/AdminPageBase';
import CarouselContainer from 'components/shared/components/CarouselContainer';
import MarqueeContainer from 'components/shared/components/MarqueeContainer';
import CarouselSettingsContainer from 'components/admin/components/CarouselSettingsContainer';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SwatchesPicker } from 'react-color';
import { css } from 'emotion';

const colors = [
  ["#000000","#525252","#969696","#d9d9d9","#ffffff"],
  ["#b71c1c","#d32f2f","#f44336","#e57373","#ffcdd2"],
  ["#1a237e","#303f9f","#3f51b5","#7986cb","#c5cae9"],
  ["#194d33","#388e3c","#4caf50","#81c784","#c8e6c9"],
  ["#ff6f00","#ffa000","#ffc107","#ffd54f","#ffecb3"],
];

const marqueeEntry: string = css`
  padding: 10px;
  border-top: solid darkgrey;
`;

const carousel: string = css`
  width: 30%;
`;

export default class MessageSettings extends AdminPageBase {

  GET_MESSAGE_INFORMATION = gql`
    {
      MarqueeInfos @client {
        id,
        text,
        color,
        background,
        display,
      }
      CarouselInfos @client {
        id,
        text,
        imgUrl,
        order,
        display,
        
      }
    }
  `;

  constructor(props) {
    super(props);
    
    this.updateMarqueeSettings = this.updateMarqueeSettings.bind(this);
    this.updateMarqueeText = this.updateMarqueeText.bind(this);
    this.updateMarqueeDisplay = this.updateMarqueeDisplay.bind(this);
    this.updateMarqueeColor = this.updateMarqueeColor.bind(this);
    this.updateMarqueeBackground = this.updateMarqueeBackground.bind(this);
  }

  updateMarqueeText(e) {
    const target = e.currentTarget;
    const instance = this;
    setTimeout(() => {
      if(!target.contains(document.activeElement)) {
        instance.updateMarqueeSettings('text', target.value);
      }
    }, 0);
  }

  updateMarqueeDisplay(e) {
    this.updateMarqueeSettings('display', e.currentTarget.checked);
  }

  updateMarqueeColor(color) {
    this.updateMarqueeSettings('color', color.hex);
  }

  updateMarqueeBackground(color) {
    this.updateMarqueeSettings('background', color.hex);
  }

  updateMarqueeSettings(prop, value) {
    const query = this.GET_MESSAGE_INFORMATION;
    const prev = this.props.client.readQuery({query}).MarqueeInfos[0];
    prev[prop] = value;
    const data={MarqueeInfos: [prev]};
    this.props.client.writeData({data});
  }

  renderContent() {
    return (
      <div>
        <Query query={this.GET_MESSAGE_INFORMATION} >
          {({loading, error, data}) => {
            if (loading) {
              return <p>Loading Messaging Settings...</p>
            } else if(error) {
              return <p>ERROR LOADING MESSAGE SETTINGS!</p>
            } else {
              const marqueeData = data.MarqueeInfos[0];
              const carouselData = data.CarouselInfos;
              
              return (
                <div>
                  <MarqueeContainer settings={marqueeData}/>
                  <table>
                    <tbody>
                    <tr>
                      <td className={marqueeEntry}>
                        <label>
                          Marquee text:
                        </label>
                      </td>
                      <td className={marqueeEntry}>
                        <input name='marqueeText' type='text' defaultValue={marqueeData.text} onBlur={this.updateMarqueeText} />
                      </td>
                      <td className={marqueeEntry}>
                        <label>
                          Marquee active:
                        </label>
                      </td>
                      <td className={marqueeEntry}>
                        <input name='marqueeDisplay' type='checkbox' checked={marqueeData.display} value={marqueeData.display} onChange={this.updateMarqueeDisplay}/>
                      </td>
                    </tr>
                    <tr>
                      <td className={marqueeEntry}>
                        <label>
                          Marquee text color:
                        </label>
                      </td>
                      <td className={marqueeEntry}>
                        <SwatchesPicker colors={colors} color={marqueeData.color} height="auto" onChange={this.updateMarqueeColor}/>
                      </td>
                      <td className={marqueeEntry}>
                        <label>Marquee background color:
                        </label>
                      </td>
                      <td className={marqueeEntry}>
                        <SwatchesPicker colors={colors} color={marqueeData.background} height="auto" onChange={this.updateMarqueeBackground}/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <hr />
                  <div>
                    <CarouselSettingsContainer settings={carouselData} {...this.props}/>
                    <CarouselContainer settings={carouselData} className={carousel}/>
                  </div>
                  <br/>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
