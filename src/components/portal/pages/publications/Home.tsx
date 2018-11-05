import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';

import {Collapse, Form, Input, Upload, Button} from 'antd';
import * as $ from 'jquery';

import {portalContentStyle, collapseHeaderStyle} from 'styles/base';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const TextArea = Input.TextArea;

const fileUploadProps = {
  name: 'file',
  multiple: true,

};

const textAreaLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

export default class PublicationsHome extends PortalPageBase {
  constructor(props) {
    super(props);

    this.state = {
      publicationDOI: '',
      publicationDOISubmitted: false,
      publicationCitation: '',
    };

    this.updatePublicationDOI = this.updatePublicationDOI.bind(this);
    this.submitPublicationDOI = this.submitPublicationDOI.bind(this);
    this.updatePublicationCitation = this.updatePublicationCitation.bind(this);
  }

  updatePublicationDOI(e) {
    const doi = e.target.value;
    this.setState({publicationDOI: doi});
  }

  submitPublicationDOI() {
    // CROSS REF TO GET THE CITATION
    $.ajax({
      url: 'http://dx.doi.org/10.1038/nrd842',
      accept: 'application/citeproc+json',
      crossDomain: true,
    })
  }

  updatePublicationCitation(e) {
    this.setState({ publicationCitation: e.target.value});
  }

  handleChange(key) {
    console.log('change to ', key);
  }

  renderAddPublications() {
    const header = 'Add Publication';
    const data = this.state;
    return (
      <Collapse onChange={this.handleChange}>
        <Panel key='1' className={collapseHeaderStyle} header={header}>
          <div>
            <Form>
              <FormItem {...textAreaLayout} label="Publication DOI">
                <FormItem {...textAreaLayout} label={<Input value={this.state.publicationDOI} onChange={this.updatePublicationDOI}/>}>
                  <Button onClick={this.submitPublicationDOI}>Get Citation from DOI</Button>
                </FormItem>
              </FormItem>
              <FormItem {...textAreaLayout} label="Citation">
                <TextArea value={this.state.publicationCitation} onChange={this.updatePublicationCitation} disabled={data.publicationDOISubmitted} />
              </FormItem>
              <FormItem>
                <Dragger {...fileUploadProps}>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
              </FormItem>
            </Form>
          </div>
        </Panel>
      </Collapse>
    )
  }
  
  renderContent() {
    return (
      <div className={portalContentStyle}>
        <h1><strong>Publications</strong></h1>
        {this.renderAddPublications()}
        <p>Publications will be requested on approved proposals only after work has commenced.</p>
      </div>
    );
  }
}
