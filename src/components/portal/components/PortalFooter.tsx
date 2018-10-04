import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import FooterBase from 'components/shared/components/FooterBase';
import orcidMember from 'images/ORCID_Member.png';
import orcidBadgeAuth from 'images/ORCID_Badge_AUTHENTICATE.jpg';
import orcidBadgeCollect from 'images/ORCID_Badge_COLLECT.jpg';
import orcidBadgeDisplay from 'images/ORCID_Badge_DISPLAY.jpg';
import emsl from 'images/EMSL_grey_transparent.png';
import pnnl from 'images/PNNL_Logo_grey_transparent.png';
import doe from 'images/DOE-logo_grey_transparent.png';

import facebook from 'images/facebook_grey.png';
import flickr from 'images/flickr_grey.png';
import googlePlus from 'images/googleplus_grey.png';
import linkedIn from 'images/linkedin_grey.png';
import twitter from 'images/twitter_grey.png';
import youTube from 'images/youtube_grey.png'





const footer: string = css`
  padding-top: 5px
  padding-right: 20px
  padding-bottom: 5px
  display: inline-block;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  max-width: 1280px;
  width: 100%;
  position: absolute;
  top: calc(100% - 65px);
  border-top: white solid 2px
`;

const footerTopRow: string=css`
  display: inline-flex;
  background-color: #53682B;
  width: 100%
`

const footerBottomRow: string=css`
  display: inline-flex;
  background-color: white;
  width: 100%
`

const footerText: string=css`
  text-indent: 5em;
  color: #F4AA00;
  font-weight: bold;
`;

const footerContactText: string=css`
  margin-left: 80px;
  color: #F4AA00;
  font-style: italic;
  background-color: #53682B;

`;

// const bottomRowIcons: string = css`
//   margin-right: 5px;
// `;

// const EmslIcon: string=css`
//   margin-left: 65px;
//   margin-right: 5px;
// `;

const connectWithEMSL: string=css`
  margin-left: 50px;
  margin-inline-end: 15px;
  color: #616265;
  font-weight: bold;
`;

// const socialMediaIcons: string=css`
//   margin-inline-end: 15px;
// `;

const SocialMediaLogos = styled('img') `
  height: 20px;
  padding-right: 10px;
`;

const OrcidBadge = styled('img')`  
  height: 30px;
  padding-left: 5px;
  margin: 0;
  vertical-align: middle;
  border: 0;
`;

const OrcidMember = styled('img')`
  height: 44px;
  padding-left: 60px

`;

const EmslLogo = styled('img')`
  height: 35px;
  margin-left: 70px;
  ;
`;

const PnnlLogo = styled('img')`
  height: 55px;
  padding-left: 20px

`;

const DoeLogo = styled('img')`
  height: 35px;
  padding-left: 20px
`;

// const orcidIcon: string=css`
//   margin-inline-start: 30px;
// `;

export default class PortalFooter extends FooterBase {
  renderContent() {
    return (
      <div className={footer}>
        <div className={footerTopRow}>
          <div className={footerText}>Contact Us</div>
          <div className={footerText}>Terms & Conditions</div>
          <div className={footerText}>Privacy</div>
          <div className={footerText}>Frequently Asked Questions</div>
          <div className={footerContactText}>emsl@pnnl.gov | 509.371.6003</div>
        </div>
        
        <div className={footerBottomRow}>          
          <a href="https://www.emsl.pnl.gov/emslweb/"> 
            <EmslLogo src={emsl} alt="EMSL" />
          </a>
          
          <a href="http://www.pnnl.gov/"> 
            <PnnlLogo src={pnnl} alt="PNNL" />
          </a>

          <a href="https://www.energy.gov/"> 
            <DoeLogo src={doe} alt="DOE" />
          </a>


          <div className={connectWithEMSL}>Connect with EMSL</div>
          <a href="https://www.facebook.com/emsl.pnl.gov"> 
            <SocialMediaLogos src={facebook} alt="Facebook" />
          </a>

          <a href="https://twitter.com/EMSLscience">
            <SocialMediaLogos src={twitter} alt="Twitter" />
          </a>
          
          <a href="https://plus.google.com/u/0/101061052038396007628">
            <SocialMediaLogos src={googlePlus} alt="Google Plus" />
          </a>

          <a href="https://www.linkedin.com/company/environmental-molecular-sciences-laboratory-emsl-">        
            <SocialMediaLogos src={linkedIn} alt="LinkedIn" />
          </a>

          <a href="http://www.youtube.com/user/EMSLatPNNL">
            <SocialMediaLogos src={youTube} alt="YouTube" />
          </a>

          <a href="http://www.flickr.com/photos/emsl/">
            <SocialMediaLogos src={flickr} alt="Flickr" />
          </a>

          {/* <div className={socialMediaIcons}>Facebook</div>
          <div className={socialMediaIcons}>Twitter</div>
          <div className={socialMediaIcons}>Instagram</div>
          <div className={socialMediaIcons}>LinkedIn</div>
          <div className={socialMediaIcons}>YouTube</div> */}
          <OrcidMember src={orcidMember} alt ="Orcid Member" />
          <a href="https://members.orcid.org/cc-research-organizations">
           <OrcidBadge src={orcidBadgeDisplay} alt="Orcid Display"/>
          </a>
          <a href="https://members.orcid.org/cc-research-organizations">
           <OrcidBadge src={orcidBadgeAuth} alt="Orcid Auth"/>
          </a>
          <a href="https://members.orcid.org/cc-research-organizations">
            <OrcidBadge src={orcidBadgeCollect} alt="Orcid Collect"/>
          </a>
        </div>
      </div>
    );
  }
}