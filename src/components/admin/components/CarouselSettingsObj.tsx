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
    
    // Note, this is the base class. What yo need to do next time you look at this is delete the files
    // you just created, and then  create a component for each thing you want to dispaly. Then you 
    // put in all the update X, Y, Z in those components (make sure that you have the new components extend 
    // the the)
    constructor(props) {
        super(props);

        console.log('I AM A CAROUSEL SETTINGS OBJECT');
        this.updateCarouselSettings = this.updateCarouselSettings.bind(this);
        this.updateCarouselImgUrl = this.updateCarouselImgUrl.bind(this);
        this.updateCarouselOrder = this.updateCarouselOrder.bind(this);
        this.updateCarouselDisplay = this.updateCarouselDisplay.bind(this);
        
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
        this.updateCarouselSettings('display', e.currentTarget.checked);
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

            <table>

                <tbody>
                    <tr>
                        <td>
                            <input name='carouseId' type='text' defaultValue={this.props.row.id} disabled />

                        </td>
                        <td >
                            <input name='carouselText' type='text' defaultValue={this.props.row.text} onBlur={this.props.updateCarouselText} />
                        </td>

                        <td>
                            <input name='carouselImgUrl' type='text' defaultValue={this.props.row.imgUrl} onBlur={this.updateCarouselImgUrl} />
                        </td>

                        <td> 
                            <img className={imagePreview} src={this.props.row.imgUrl}/>    
                        </td>


                    </tr>
                </tbody>
            </table>
        );
    }

}
