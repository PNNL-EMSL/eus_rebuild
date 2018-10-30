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
export const colorDisabled = '#AAAAAA';
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
  border: ${colorLightGrey} 2px solid;
  padding: 20px;
  padding-top: 0px;
  background-color: ${colorWhite};
`;

export const contentStyle: string = css`
  margin: 0px 20px 150px 20px;
  max-width: 100%;
  top: 100px;
  position: relative;
`;

export const adminContentStyle: string = css`
  top: 100px;
  width: 80%;
  position: relative;
  float: right;
  display: inline-block;
`;

export const adminFormContentStyle: string = css`
  background: ${colorWhite};
  overflow: auto;
  max-height: calc(100vh - 180px);
  margin: 20px;
  padding: 20px;
`;

export const headerStyle: string = css`
  padding: 5px 20px 5px 10px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  background-color: ${colorDarkGreen};
  position: fixed;
  width: 100%;
  min-width: 900px;
  z-index: 10;
  align-items: center;
  max-width: 100%;
  border-bottom: ${colorWhite} solid 2px;
`;

export const fontAwesomeContainerStyle: string = css`
  text-align: center;
  border-style: solid;
  margin: 5px;
  padding-top: 5px;
  display: inline-grid;
  min-height: 100px
`;

export const Logo = styled('img')`
  height: 80px;
`;
