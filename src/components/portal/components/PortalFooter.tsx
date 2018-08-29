import React from 'react';
import { css } from 'emotion';
import FooterBase from 'components/shared/components/FooterBase';

const footer: string = css`
  padding: 5px 20px 5px 10px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  background-color: white;
  align-items: center;
  max-width: 1078px;
  width: 100%
`;

export default class PortalFooter extends FooterBase {
  renderContent() {
    return (
      <div className={footer}>
        <p>
          Footer should be taken from the existing eusi.emsl.pnl.gov/Portal/ styles
        </p>
      </div>
    );
  }
}