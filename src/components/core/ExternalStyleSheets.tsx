import React, { Component } from 'react';


/*************
 * This class serves to import all third-party style sheets which are used by the application.
 * This includes both external sheets (e.g. FontAwesome) and node module 
 * sheets (e.g. react-responsive-carousel)
 ************/
export default class ExternalStyleSheets extends Component<any, any> {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="../react-responsive-carousel/lib/styles/carousel.min.css"
        />
      </div>
    )
  }
}