import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import {portalContentStyle} from 'styles/base'
import PropTypes from 'prop-types';
// import { cx, css } from 'emotion';
import { Form, Input, Tabs } from 'antd';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProfessionTypes from 'components/portal/components/proposals/ProfessionTypes.json'
import Prefixes from 'components/portal/pages/prefixes.json'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;


// const title = css`
//     font-weight: 900;
//     font-size: 14px;
//     margin-bottom: 5px;
// `;

// const titleBox = css`
//     background-color: white;
//     padding: 15px;
//     flex: 0 0 auto;
//     display: flex;
//     flex-direction: row;
// `;

// const formBox = css`
//     flex: 1 0 auto;
//     padding: 15px;
//     min-height: 400px;
//     max-height: calc(100vh - 280px);
//     overflow: auto;
// `;

// const icon = css`
// `;



export default class UserInfo extends PortalPageBase {

static propTypes = {
    title: PropTypes.string,       // the title of the page
    description: PropTypes.string, // the description of the page, shown in the top of the form
    data: PropTypes.object,        // the data from the wizard that the page will fill out
    onChange: PropTypes.func       // handler when any data is changed on the page;  it passes the new data and validation state
    };

    state = {
        radioValue: 1,
      }

    GET_USER_INFO = gql`
        {
            CurrentUser @client {
                name,
                email,
                institution,
                orcid,
                orcidPermissions,
                profession,
                professionOther


            }
        }
    `;
    
    handleProfessionChange() {
        // Comment
    };

    handleProfessionOther(){
        // Test
    }

    handlePrefixChange() {
        // Comment
    };

    handlePrefixOther() {
        // Comment
    };

    callback(key) {
        console.log(key);
      }

      /**
       * Child classes should override
       * @returns {*}
       */
      renderForm(user) {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };

        return (

          <div>
              

            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Personal" key="1">
                    <Form>
                    <FormItem {...formItemLayout} required={true}>
                        <AntDesignSelect
                            label="Prefix"
                            placeholder="Select prefix..."
                            optionList={Prefixes.Prefixes}
                            value={user.profession} // Need to change to user.prefix, add to DB
                            handleChange={this.handlePrefixChange}
                            handleInput={this.handlePrefixOther}
                            required={true}
                        /> 
                    </FormItem>    
                    <FormItem {...formItemLayout} label="Name">
                        <Input value={user.name} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Suffix">
                        <Input />
                    </FormItem> 
                    <FormItem {...formItemLayout} required={true} label="ORCID iD Permissions">
                        User records will now be associated with ORCID® iDs. 
                        Answering the question below will redirect you to the ORCID website so we can retrieve your ORCID iD.
                        In addition, selecting "Yes" will authorize us to post non-proprietary EMSL user research awards, as well
                        as other professional service activities, to your record. If you wish, you may opt out of these automatic
                        updates by selecting "No" now or at any time in the future (see Help box for more details). 
                        The ORCID website will ask you to authorize the connection and will return you to this page.
                        To save these settings, be sure to click on the Save User Now link before leaving this page.
                    </FormItem>  
                    <FormItem {...formItemLayout} required={true} label="Do you authorize EMSL to post to your ORCID record?">
                        Radio Buttons here. Needs to be implemented
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Primary Citizenship">
                        Needs to be implemented
                    </FormItem> 
                    <FormItem {...formItemLayout} label="Dual Citizenship">
                        Needs to be implemented
                    </FormItem> 
                    <FormItem>
                    <AntDesignSelect
                        label="Profession"
                        placeholder="Select profession..."
                        optionList={ProfessionTypes.ProfessionTypes}
                        value={user.profession}
                        handleChange={this.handleProfessionChange}
                        handleInput={this.handleProfessionOther}
                        required={true}
                    />     
                    </FormItem> 
                    <FormItem {...formItemLayout} required={true} label="Type of Institution">
                        This needs to be implemented

                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Institution name">
                        <Input defaultValue={user.institution}/>  
                    </FormItem>   
                    <FormItem {...formItemLayout} label="Department">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Business Address, Line 1">
                        <Input />    
                    </FormItem>  
                    <FormItem {...formItemLayout}  label="Business Address, Line 2">
                        <Input />    
                    </FormItem> 
                    <FormItem {...formItemLayout} required={true} label="Country">
                        This needs to be implemented

                    </FormItem>
                    <FormItem {...formItemLayout}  required={true} label="State/Province"> 
                        This needs to be implemented
                        Note: This is only required for US and Canada.

                    </FormItem>
                    <FormItem {...formItemLayout} label="City">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Postal Code">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Business phone number">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} label="Business fax number">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Business email address">
                        <Input defaultValue={user.email}/>    
                    </FormItem>

                </Form>
                </TabPane>
                <TabPane tab="Professional" key="2">
                <Form>
                    <FormItem>
                    <AntDesignSelect
                        label="Profession"
                        placeholder="Select profession..."
                        optionList={ProfessionTypes.ProfessionTypes}
                        value={user.profession}
                        handleChange={this.handleProfessionChange}
                        handleInput={this.handleProfessionOther}
                        required={true}
                    />     
                    </FormItem> 
                    <FormItem {...formItemLayout} required={true} label="Type of Institution">
                        This needs to be implemented

                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Institution name">
                        <Input defaultValue={user.institution}/>  
                    </FormItem>   
                    <FormItem {...formItemLayout} label="Department">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Business Address, Line 1">
                        <Input />    
                    </FormItem>  
                    <FormItem {...formItemLayout}  label="Business Address, Line 2">
                        <Input />    
                    </FormItem> 
                    <FormItem {...formItemLayout} required={true} label="Country">
                        This needs to be implemented

                    </FormItem>
                    <FormItem {...formItemLayout}  required={true} label="State/Province"> 
                        This needs to be implemented
                        Note: This is only required for US and Canada.

                    </FormItem>
                    <FormItem {...formItemLayout} label="City">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Postal Code">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Business phone number">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} label="Business fax number">
                        <Input />    
                    </FormItem>
                    <FormItem {...formItemLayout} required={true} label="Business email address">
                        <Input defaultValue={user.email}/>    
                    </FormItem>

                </Form>
                </TabPane>
            </Tabs>
          </div>
        );
      }

  renderContent() {
        return (
            <div className={portalContentStyle}>
            <Query query={this.GET_USER_INFO}>
                {({loading, error, data}) => {
                    if (loading) {
                        return (
                            <div>Loading</div>
                        )
                    } else if (error) {
                        return (
                            <div>Error</div>
                        )
                    }

                    else {
                        const user = data.CurrentUser[0];
                        return this.renderForm(user)
                    }
                }} 
                </Query>
            </div>
        );
    }
}

