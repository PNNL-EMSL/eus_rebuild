import React, { Component } from 'react';

export default class Proposals extends Component {
    render() {
        return (
            <div> 
                <h1><strong>Get Started</strong></h1>
                <p>Click the "Create New Proposal" button to the right to start filling out a new proposal.</p>

                // Make as pop-up and double check that page is up-to-date
                <p>Note: Submission of a proposal implies your agreement to the <a href="https://www.emsl.pnl.gov/using-emsl/terms.shtml">Terms and Conditions for Using EMSL</a></p>
            </div>
        );
    }
    
}

