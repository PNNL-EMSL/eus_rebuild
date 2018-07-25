import React, {Component} from 'react';
import gql from 'graphql-tag';
import {css } from 'emotion';

const imagePreview: string = css`
    height: 100px
`;

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
        this.updateCarouselOrder = this.updateCarouselOrder.bind(this);
        this.updateCarouselDisplay = this.updateCarouselDisplay.bind(this);
        
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
                instance.updateCarouselSettings('imgUrl', target.value);
            }
        }, 0);
    }

    updateCarouselOrder(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
            if(target.contains(document.activeElement)) {
                instance.updateCarouselSettings('order', target.value);
            }
        }, 0);
    }

    updateCarouselDisplay(e) {
        const target = e.currentTarget;
        const instance = this;
        setTimeout(() => {
            if(target.contains(document.activeElement)) {
                instance.updateCarouselSettings('display', target.value);
            }
        }, 0);
    }

    updateCarouselSettings(prop, value) {
        const query = this.GET_MESSAGE_INFORMATION;
        let prev = this.props.client.readQuery({query}).CarouselInfos;
        const changing = prev.filter((item) => (item.id === this.props.settings.id))[0];// the prev object with id = this.props.id.
        console.log(changing);
        // remove changing from prev
        prev = prev.filter((item) => (item.id !== this.props.settings.id)); 
        console.log(prev);
        // update changing to the new values (in state)
        changing[prop] = value;
        // push changing BACK into previous
        prev.push(changing);
        prev = prev.sort((a, b) => (a.id > b.id));
        console.log(prev);
        const data={CarouselInfos: prev};
        this.props.client.writeData({data});
      }

    render() {
        console.log("settings", this.props, this.props.settings);
        return(
            <table >
                <tbody>
                    <tr>
                        <td >
                            <input name='carouselText' type='text' defaultValue={this.props.settings.text} onBlur={this.updateCarouselText} />
                        </td>

                        <td>
                            <input name='carouselImgUrl' type='text' defaultValue={this.props.settings.imgUrl} onBlur={this.updateCarouselImgUrl} />
                        </td>

                        <td> 
                            <img className={imagePreview} src={this.props.settings.imgUrl}/>    
                        </td>

                    </tr>
                </tbody>
            </table>
        );
    }

}