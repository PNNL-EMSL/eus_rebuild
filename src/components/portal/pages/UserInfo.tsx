import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import {portalContentStyle} from 'styles/base'
import PropTypes from 'prop-types';
// import { cx, css } from 'emotion';
import { Form, Input, Tabs, Radio} from 'antd';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProfessionTypes from 'components/portal/components/proposals/ProfessionTypes.json'
import Prefixes from 'components/portal/pages/prefixes.json'
import gql from 'graphql-tag'


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;



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
    
    constructor(props) {
        super(props);

        this.state = {
            radioValue: 1,
            user: this.props.client.readQuery({query: this.GET_USER_INFO}).CurrentUser[0]
          }

          this.handleEmailChange = this.handleEmailChange.bind(this);
          this.handleInstitutionChange = this.handleInstitutionChange.bind(this);
          this.handleOrcidChange = this.handleOrcidChange.bind(this);
          this.handleProfessionChange = this.handleProfessionChange.bind(this);
          this.handleProfessionOther = this.handleProfessionOther.bind(this);
          this.handlePrefixChange = this.handlePrefixChange.bind(this);
          this.handlePrefixOther = this.handlePrefixOther.bind(this);
    }


    // handleSuffixChange() {
    //     // Comment
    // }


    // handlePrimaryCitzenChange() {
    //     // Commente
    // }

    // handleDualCitizenChange() {
    //     // Comment
    // }

    // handleSSNChange() {
    //     // Comment
    // }

    // handleDOBChange() {
    //     // COmment
    // }

    // handleBirthCountryChange() {
    //     // Comment
    // }

    // handleBirthPlaceChange() {
    //     // Comment
    // }

    // handleBirthCityChange() {
    //     // COmment
    // }

    handlePrefixChange(e) {
        console.log("Prefix On Change Called")
        const user = this.state.user;
        user.prefix = e;
        this.setState({user});
    };

    handlePrefixOther() {
         // Need to add prefixes to DB
    };

    handleProfessionChange(e) {
        console.log("Profession On Change Called")
        const user = this.state.user;
        user.profession = e;
        this.setState({user});
    };

    handleProfessionOther(e){
        const user = this.state.user;
        user.professionOther = e.target.value;
        this.setState({user});;
    }

    handleEmailChange(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({user});
    }

    handleInstitutionChange(e) {
        console.log("Institution On Change called")
        const user = this.state.user;
        user.instituion = e.target.value;
        this.setState({user});
    }

    handleOrcidChange(e) {
        const user = this.state.user;
        user.orcid = e.target.value;
        this.setState({user});
    }

    onOrcidPermissionRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        const user = this.state.user;
        if (e.target.value === 1) {
            user.orcidPermissions = "Y";
        }
        else {
            user.orcidPermissions = "N"; 
        }
        this.setState({
          radioValue: e.target.value,
          user,
        });
      }


    callback(key) {
        console.log(key);
      }


  renderContent() {
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };

      const user = this.state.user;
    return (
      <div  className={portalContentStyle}>
          

        <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Personal" key="1">
                <Form>
                    <AntDesignSelect
                        label="Prefix"
                        placeholder="Select prefix..."
                        optionList={Prefixes.Prefixes}
                        value={user.prefix} // Need to change to user.prefix, add to DB
                        handleChange={this.handlePrefixChange}
                        handleInput={this.handlePrefixOther}
                        required={true}
                    />  
                <FormItem {...formItemLayout} label="Name">
                    <Input disabled={true} value={user.name} />
                </FormItem>
                <FormItem {...formItemLayout} label="Suffix">
                    <Input />
                </FormItem> 
                <FormItem {...formItemLayout} required={true} label="ORCID iD Permissions">
                    <p>User records will now be associated with ORCID® iDs. 
                    Answering the question below will redirect you to the ORCID website so we can retrieve your ORCID iD.
                    In addition, selecting "Yes" will authorize us to post non-proprietary EMSL user research awards, as well
                    as other professional service activities, to your record. If you wish, you may opt out of these automatic
                    updates by selecting "No" now or at any time in the future (see Help box for more details). 
                    The ORCID website will ask you to authorize the connection and will return you to this page.
                    To save these settings, be sure to click on the Save User Now link before leaving this page.</p>
                </FormItem>  
                <FormItem className={'two-rows-label'} {...formItemLayout} required={true} label="Do you authorize EMSL to post to your ORCID record?">
                    <RadioGroup onChange={this.onOrcidPermissionRadioChange} value={this.state.radioValue}>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={2}>No</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Primary Citizenship">
                    Needs to be implemented
                </FormItem> 
                <FormItem {...formItemLayout} label="Dual Citizenship">
                    Needs to be implemented
                </FormItem> 
                

            </Form>
            </TabPane>
            <TabPane tab="Professional" key="2">
            <Form>
                <AntDesignSelect
                    label="Profession"
                    placeholder="Select profession..."
                    optionList={ProfessionTypes.ProfessionTypes}
                    value={user.profession}
                    handleChange={this.handleProfessionChange}
                    handleInput={this.handleProfessionOther}
                    required={true}
                />     
                <FormItem {...formItemLayout} required={true} label="Type of Institution">
                    This needs to be implemented

                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Institution name">
                    <Input defaultValue={user.institution} onChange={this.handleInstitutionChange}/>  
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

        return (
            <div className={portalContentStyle}>
                return this.renderForm(user)
            </div>
        );
    }
}

