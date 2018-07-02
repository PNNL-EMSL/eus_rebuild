import { css } from 'emotion';

/**
 * This file defined based styles and style variables
 * to be used in styling components via emotion css-in-js.
 */

 export const colorBlack = ' #0D1B2A';
 export const colorDarkGreen = '#255859';
 export const colorLightGreen = '#87babe';
 export const colorRed = '#BE5959';

 export const headerFont = css`
  font-weight: 700;
  font-size: 16px;
  color: ${colorDarkGreen};
 `;

export const flexRow = css`
  display: flex;
  flex: 0 0 auto;
  align-self: flex-start;
  align-items: center;
 `;