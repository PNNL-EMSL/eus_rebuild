import React, {Component} from 'react';
// import CarouselContainer from 'components/core/CarouselContainer';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
// import { SwatchesPicker } from 'react-color';
// import { css } from 'emotion';

export default class CarouselSettingsContainer extends Component<any, any> {
    constructor(props){
        super(props);
    }

    render() {
        const carousel = this.props.settings;
        const content:JSX.Element[] = [];
        Object.keys(carousel).map((key) => {
            const info = carousel[key];
            console.log(info, 'caro info');
            content.push(
                <div>
                    {info.text}
                </div >
            )
        })
        
        return(
           // object keys then for each
           
           <div>
               {content}
            </div>
            
        );
    }
}