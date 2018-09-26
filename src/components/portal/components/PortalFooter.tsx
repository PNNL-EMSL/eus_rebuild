import React from 'react';
import { css } from 'emotion';
import FooterBase from 'components/shared/components/FooterBase';

const footer: string = css`
  padding: 5px 20px 5px 10px;
  display: inline-block;
  flex: 0 0 auto;
  flex-direction: row;
  background-color: white;
  align-items: center;
  max-width: 1078px;
  width: 100%
`;

const footerRow: string=css`
  display: inline-flex;
`
const footerText: string=css`
  text-indent: 5em;
  color: #F4AA00;
  font-weight: bold;
`;

const footerContactText: string=css`
  text-indent: 5em;
  color: #F4AA00;
  font-style: italic;
`;

export default class PortalFooter extends FooterBase {
  renderContent() {
    return (
      <div className={footer}>
        <div className={footerRow}>
          <div className={footerText}>Contact Us</div>
          <div className={footerText}>Terms & Conditions</div>
          <div className={footerText}>Privacy</div>
          <div className={footerText}>Frequently Asked Questions</div>
          <div className={footerContactText}>emsl@pnnl.gov | 509.371.6003</div>
        </div>
        
        <div className={footerRow}>
          <div>EMSL Icon</div>
          <div>PNNL Icon</div>
          <div>DOE Icon</div>
          <div>Connect with EMSL Icon</div>
          <div>Facebook</div>
          <div>Twitter</div>
          <div>Instagram</div>
          <div>LinkedIn</div>
          <div>YouTube</div>
          <div>OrcID</div>
        </div>
        <p>
          Footer should be taken from the existing eusi.emsl.pnl.gov/Portal/ styles
        </p>
      </div>
    );
  }
}