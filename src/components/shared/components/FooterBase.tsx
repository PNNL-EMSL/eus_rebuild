import React, { Component } from 'react';

/**
 * At the moment this class simply is the constructor and nothing else.
 * This will become more useful as we discover the appropriate information
 * to put in all footers.
 */
export default abstract class FooterBase extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  
  abstract renderContent();
  
  render() {
    const content = this.renderContent();
    
    return (
      <div>
        {content}
      </div>
    )
  }
}