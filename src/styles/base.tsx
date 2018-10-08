import { css } from 'emotion';
import styled from 'react-emotion';

/**
 * This file defined based styles and style variables
 * to be used in styling components via emotion css-in-js.
 */

export const colorBlack = ' #0D1B2A';
// export const colorDarkGreen = '#255859';
// export const colorLightGreen = '#87babe';
export const colorRed = '#BE5959';
export const colorDarkGreenSubMenu = '#1e4647';

export const colorDarkGrey = '#616265';
export const colorWhite = '#FFFFFF';
export const colorLightOrange = '#F2A928';
export const colorLightGreen = '#719500';
export const colorDarkGreen = '#53682B';

export const footerFont = css`
  
`;

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

// const header: string = css`
//   padding: 5px 20px 5px 10px;
//   display: flex;
//   flex: 0 0 auto;
//   flex-direction: row;
//   background-color: white;
//   align-items: center;
//   max-width: 1078px;
// `;
// const footer: string = css`
//   padding: 5px 20px 5px 10px;
//   display: flex;
//   flex: 0 0 auto;
//   flex-direction: row;
//   background-color: white;
//   align-items: center;
//   max-width: 1078px;
// `;
// const titleContainer: string = css`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   margin-left: 10px;
//   margin-top: -15px;
// `;
// const title: string = css`
//   font-weight: 800;
//   font-size: 28px;
//   text-shadow: 2px 2px 8px #aaa;
// `;
// const content: string = css`
//   margin: 5px 20px 15px 100px;
//   max-width: 958px;
// `;
//
export const Logo = styled('img')`
  height: 80px;
`;
//
// const logout: string = css`
//   text-align: right;
//   float: right;
//   width: 72%;
// `;