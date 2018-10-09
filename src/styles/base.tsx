import { css } from 'emotion';
import styled from 'react-emotion';

/**
 * This file defined based styles and style variables
 * to be used in styling components via emotion css-in-js.
 */

export const colorBlack = ' #0D1B2A';
export const colorRed = '#BE5959';
export const colorDarkGreenSubMenu = '#1e4647';

export const colorLightGrey = '#E1E1E3';
export const colorDarkGrey = '#616265';
export const colorWhite = '#FFFFFF';
export const colorLightOrange = '#F2A928';
export const colorYellow = '#FFD700';
export const colorLightGreen = '#719500';
export const colorDarkGreen = '#53682B';


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

export const footerStyle: string = css`
  display: inline-block;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-width: 1024px;
  position: fixed;
  bottom: 0px;
  border-top: ${colorWhite} solid 2px
`;

export const footerTextStyle: string = css`
  color: ${colorLightOrange};
  font-weight: bold;
  text-align: center;
  width: 20%
`;

export const footerIconStyle: string = css`
  width: 33%;
  padding-bottom: 5px;
  text-align: center;
`;

export const portalContentStyle: string = css`
  border: white 2px solid;
  padding: 20px;
  padding-top: 0px;
  background-color: ${colorLightGrey};
`;

export const contentStyle: string = css`
  margin: 20px 20px 150px 20px;
  max-width: 1024px;
  top: 100px;
  position: relative;
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