import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';

export default class PublicationsHome extends PortalPageBase {
  constructor(props) {
    super(props);
    
    
  }
  
  
  renderContent() {
    return (
      <div>
        <h1><strong>Publications</strong></h1>
        <p>Publications will be requested on approved proposals only after work has commenced.</p>
      </div>
    );
  }
}
