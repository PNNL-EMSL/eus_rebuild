import React, {Component} from 'react';
import gql from 'graphql-tag';

export default class CarouselSettingsObj extends Component<any, any> {
    GET_MESSAGE_INFORMATION = gql`
    {
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

        this.updateCarouselSettings = this.updateCarouselSettings.bind(this);
        this.updateCarouselText = this.updateCarouselText.bind(this);
        this.updateCarouselImgUrl = this.updateCarouselImgUrl.bind(this);
    }

    updateCarouselText(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
          if(!target.contains(document.activeElement)) {
            instance.updateCarouselSettings('text', target.value);
          }
        }, 0);
      }

    updateCarouselImgUrl(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
            if(!target.contains(document.activeElement)) {
            instance.updateCarouselSettings('text', target.value);
            }
        }, 0);
    }

    updateCarouselSettings(prop, value) {
        const query = this.GET_MESSAGE_INFORMATION;
        const prev = this.props.client.readQuery({query}).CarouselInfos;
        prev[prop] = value;
        const data={CarouselInfos: [prev]};
        this.props.client.writeData({data});
      }

    render() {
        console.log("settings", this.props, this.props.settings);
        return(
            <table>
                <tbody>
                    <tr>
                        <td >
                            <input name='carouselText' type='text' defaultValue={this.props.settings.text} onBlur={this.updateCarouselText} />
                        </td>

                        <td>
                            <input name='carouselImgUrl' type='text' defaultValue={this.props.settings.imgUrl} onBlur={this.updateCarouselImgUrl} />
                        </td>

                    </tr>
                </tbody>
            </table>
        );
    }

}