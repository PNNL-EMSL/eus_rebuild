import React, {Component} from 'react';
import Dragula from 'react-dragula';

export default abstract class DraggableContainer extends Component<any, any> {

    
    abstract renderContent();

    render() {
        const content = this.renderContent();
        
        return(
            <div className='container' ref={this.dragulaDecorator} >
                {content}
            </div>
        );
    }

    dragulaDecorator = (componentBackingInstnace) => {
        if (componentBackingInstnace) {
          const options = { };
          Dragula([componentBackingInstnace], options);

        }
      };
}