import React from 'react';
// import CarouselContainer from 'components/core/CarouselContainer';
// import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';
// import { SwatchesPicker } from 'react-color';
// import { css } from 'emotion';
import draggableContainer from '../../shared/components/draggableContainer';

export default class CarouselSettingsContainer extends draggableContainer {
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
    
    constructor(props){
        super(props);
       
        this.updateCarouselSettings = this.updateCarouselSettings.bind(this);
        this.updateCarouselText = this.updateCarouselText.bind(this);
        this.renderContent = this.renderContent.bind(this);
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

    updateCarouselSettings(prop, value) {
        const query = this.GET_MESSAGE_INFORMATION;
        const prev = this.props.client.readQuery({query}).CarouselInfos;
        prev[prop] = value;
        const data={CarouselInfos: [prev]};
        this.props.client.writeData({data});
      }

    renderContent() {
        const carousel = this.props.settings;
        const content:JSX.Element[] = [];
        Object.keys(carousel).map((key) => {
            const info = carousel[key];
            console.log(info, 'caro info');
            content.push(
              <div>
              <CarouselSettingsObj {...this.props} settings={info}/>
              </div>
            )
        })
        console.log('set cntainer', content)
        return content;
        return(
           // object keys then for each
           <div>
            {content}
            </div>
        );
    }

}