import React, { Component } from 'react';
import { css } from 'emotion';
import {colorDarkGreen} from 'styles/base';
import styled from 'react-emotion';
import picture from 'images/knowledge_graph.jpg';

const section: string = css`
    margin-bottom: 25px;
    border-left: 4px solid ${colorDarkGreen};
    padding-left: 8px;
    max-width: 500px;
`;
const title: string = css`
    font-size: 17px;
    color: ${colorDarkGreen};
    font-weight: 800;
    margin-bottom: 8px;
`;
const row: string = css`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
const Image = styled('img')`
  width: 300px;
  height: 300px;
  margin-top: 10px;
  margin-left: 50px;
`;

export default class Home extends Component {
  render() {
    return (
      <div className={row}>
        <div>
          <div className={title}>Welcome</div>
          <div className={section}>
            <p>
              This application allows you to explore the knowledge graph obtained from
              PNNL's Science Focus Area:
            <strong><a href="https://genomicscience.energy.gov/research/sfas/pnnl.shtml" className={css`margin-left: 5px;`}>
                Phenotypic Response of the Soil Microbiome to Environmental Perturbations</a></strong>
            </p>
          </div>
          <div className={title}>Getting Started</div>
          <div className={section}>
            <div>
              This application provides the following capabilities
          </div>
            <ul>
              <li>TODO: Search</li>
              <li>TODO: Browse Graph</li>
            </ul>
          </div>
        </div>
        <Image src={picture} />
      </div>

    );
  }
}
