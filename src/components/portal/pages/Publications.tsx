import React from 'react';
import PageBase from 'components/shared/pages/PageBase';

export default class Publications extends PageBase {
  renderPage() {
        return (
            <div> 
                <h1><strong>Publications</strong></h1>
                <p>Publications will be requested on approved proposals only after work has commenced.</p>
            </div>
        );
    }
}
