import React from 'react';
import RestrictedPage from 'components/shared/pages/RestrictedPage';

export default class Publications extends RestrictedPage {
  renderPage() {
        return (
            <div> 
                <h1><strong>Publications</strong></h1>
                <p>Publications will be requested on approved proposals only after work has commenced.</p>
            </div>
        );
    }
}
