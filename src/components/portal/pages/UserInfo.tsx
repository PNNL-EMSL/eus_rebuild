import React from 'react';
import PortalPageBase from 'components/portal/pages/PortalPageBase';
import {portalContentStyle} from 'styles/base'
import PropTypes from 'prop-types';
// import { cx, css } from 'emotion';
import { Form, Input, Tabs, Radio, Button} from 'antd';
import AntDesignSelect from 'components/shared/components/AntDesignSelect';
import ProfessionTypes from 'components/portal/components/proposals/ProfessionTypes.json'
import Prefixes from 'components/portal/pages/prefixes.json'
import InstitutionType from 'components/portal/pages/institutionType.json'
import UserProfileValidator from 'components/portal/pages/UserProfileValidator'
import gql from 'graphql-tag'
import FormError from 'components/shared/components/FormError';


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

    static VALIDATOR = new UserProfileValidator();

    GET_USER_INFO = gql`
    {
        Users @client {
            userName,
            name,
            prefix,
            suffix,
            email,
            institution,
            institutionType,
            institutionTypeOther,
            orcid,
            orcidPermissions,
            profession,
            professionOther,
            primaryCitzenship,
            dualCitizenship,
            department,
            businessAddrL1,
            businessAddrL2,
            country,
            stateOrProv,
            city,
            postalCode,
            phone,
            fax
        }

        CurrentUser @client  {,
            userName,
            name,
            prefix,
            suffix,
            email,
            institution,
            institutionType,
            institutionTypeOther,
            orcid,
            orcidPermissions,
            profession,
            professionOther,
            primaryCitzenship,
            dualCitizenship,
            department,
            businessAddrL1,
            businessAddrL2,
            country,
            stateOrProv,
            city,
            postalCode,
            phone,
            fax
        }
    }
`;
    

    constructor(props) {
        super(props);

        this.state = {
            radioValue: 1,
            user: this.blankToUndefined(this.props.client.readQuery({query: this.GET_USER_INFO}).CurrentUser[0]),
            errors: []
          }

          this.handleEmailChange = this.handleEmailChange.bind(this);
          this.handleInstitutionChange = this.handleInstitutionChange.bind(this);
          this.handleOrcidChange = this.handleOrcidChange.bind(this);
          this.handleProfessionChange = this.handleProfessionChange.bind(this);
          this.handleProfessionOther = this.handleProfessionOther.bind(this);
          this.handlePrefixChange = this.handlePrefixChange.bind(this);
          this.handleInstitutionTypeChange = this.handleInstitutionTypeChange.bind(this);
          this.handleInstitutionTypeOther = this.handleInstitutionTypeOther.bind(this);
          this.handleSuffixChange = this.handleSuffixChange.bind(this);
          this.handlePrimaryCitizenshipChange = this.handlePrimaryCitizenshipChange.bind(this);
          this.handleDualCitizenshipChange = this.handleDualCitizenshipChange.bind(this);
          this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
          this.handleBusinnessAddrL1Change = this.handleBusinnessAddrL1Change.bind(this);
          this.handleBusinnessAddrL2Change = this.handleBusinnessAddrL2Change.bind(this);
          this.handleCountryChange = this.handleCountryChange.bind(this);
          this.handleStateOrProvChange = this.handleStateOrProvChange.bind(this);
          this.handleCityChange = this.handleCityChange.bind(this);
          this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
          this.handlePhoneChange = this.handlePhoneChange.bind(this);
          this.handleFaxChange = this.handleFaxChange.bind(this);
          this.handleOrcidPermissionRadioChange = this.handleOrcidPermissionRadioChange.bind(this);
          this.submitChanges = this.submitChanges.bind(this);
          this.validateForm = this.validateForm.bind(this);
          this.saveChangesToDatabase = this.saveChangesToDatabase.bind(this);
    }


    
    // const UndefinedToNull = (Component) => (props) => {
    //     const newProps = props.map(p => p === null ? undefined : p)
    //     return <Component {...newProps}>
    //   }


    

    handleSuffixChange(e) {
        const user = this.state.user;
        user.suffix = e.target.value;
        this.setState({user});
    }

    handlePrimaryCitizenshipChange(e) {
        // C
    }
    handleDualCitizenshipChange(e) {
        // C
    }

    handleDepartmentChange(e) {
        const user = this.state.user;
        user.department= e.target.value;
        this.setState({user});
    }

    handleBusinnessAddrL1Change(e) {
        const user = this.state.user;
        user.businessAddrL1 = e.target.value;
        this.setState({user});
    }

    handleBusinnessAddrL2Change(e) {
        const user = this.state.user;
        user.businessAddrL2 = e.target.value;
        this.setState({user});
    }

    handleCountryChange(e) {
        // Note: This will change once we have drop-down
        // Placeholder onChange for validation
        const user = this.state.user;
        user.country = e.target.value;
        this.setState({user});
    }

    handleStateOrProvChange(e) {
        // Note: This will change once we have drop-down
        // Placeholder onChange for validation
        const user = this.state.user;
        user.stateOrProv = e.target.value;
        this.setState({user});
    }

    handleCityChange(e) {
        const user = this.state.user;
        user.city = e.target.value;
        this.setState({user});
    }

    handlePostalCodeChange(e) {
        const user = this.state.user;
        user.postalCode = e.target.value;
        this.setState({user});
    }

    handlePhoneChange(e) {
        const user = this.state.user;
        user.phone = e.target.value;
        this.setState({user}); 
    }

    handleFaxChange(e) {
        const user = this.state.user;
        user.fax = e.target.value;
        this.setState({user}); 
    }


    handlePrefixChange(e) {
        console.log("Prefix On Change Called")
        const user = this.state.user;
        user.prefix = e;
        this.setState({user});
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
        this.setState({user});
    }

    handleEmailChange(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({user});
    }

    handleInstitutionChange(e) {
        console.log("Institution On Change called")
        const user = this.state.user;
        user.institution = e.target.value;
        this.setState({user});
        // Need a way to type in a search bar and filter
        // through the results that way
    }

    handleInstitutionTypeChange(e) {
        console.log("Instution Type On Change Called")
        const user = this.state.user;
        user.institutionType = e;
        this.setState({user});
    }

    handleInstitutionTypeOther(e) {
        console.log("Instution Type Other Change Called")
        const user = this.state.user;
        user.institutionTypeOther = e.target.value;
        this.setState({user});
    }

    

    handleOrcidChange(e) {
        const user = this.state.user;
        user.orcid = e.target.value;
        this.setState({user});
    }

    handleOrcidPermissionRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        const user = this.state.user;
        user.orcidPermissions = e.target.value;
        this.setState({
          radioValue: e.target.value,
          user,
        });
      }

    displayErrors(errors) {
        const errorArray:string[] = [];
        errors.forEach((error) => {
          errorArray[error.field] = error.tooltip;
        });
        this.setState({errors: errorArray});
    }  

 
    submitChanges(e) {
        e.preventDefault();


        // check validation
        const errors = this.validateForm();
        if (errors.length === 0) {
            this.saveChangesToDatabase(); 
        }

        this.displayErrors(errors);           


    }

    blankToUndefined(user) {
        Object.keys(user).forEach((key) => {
            if (user[key] === "") {
                user[key] = undefined;
            }
        })
        
        return user;
    }

    undefinedToBlank(user) {
        Object.keys(user).forEach((key) => {
            if (user[key] === undefined) {
                user[key] = "";
            }
        })
        
        return user;
    }

    validateForm() {
        // Call the validator and check validation.
        return UserInfo.VALIDATOR.doValidate(this.state.user, "UserProfileForm");
        
        
    }

    saveChangesToDatabase() {
        // commit changes through gql query
        // check if current user is the one getting updated
        // if so, we need to update the current user role also
        const query = this.GET_USER_INFO;
        console.log("Query", query);
        let users = this.props.client.readQuery({query}).Users;
        console.log("Users", users);
        console.log("Current User", this.state.user);
        let updating = users.find((item) => (item.userName === this.state.user.userName));
        users = users.filter((item) => (item.userName !== this.state.user.userName));
        console.log("Updating", updating);
        console.log("Email", this.state.user.email)
        updating.email = this.state.user.email;
        updating.prefix = this.state.user.prefix;
        updating.suffix = this.state.user.suffix;
        updating.institution = this.state.user.institution;
        updating.institutionType = this.state.user.institutionType;
        updating.institutionTypeOther = this.state.user.institutionTypeOther;
        updating.orcid = this.state.user.orcid;
        updating.orcidPermissions = this.state.user.orcidPermissions;
        updating.profession = this.state.user.profession;
        updating.professionOther = this.state.user.professionOther;
        updating.primaryCitzenship = this.state.user.primaryCitzenship;
        updating.dualCitizenship = this.state.user.dualCitizenship;
        updating.department = this.state.user.department;
        updating.businessAddrL1 = this.state.user.businessAddrL1;
        updating.businessAddrL2 = this.state.user.businessAddrL2;
        updating.country = this.state.user.country;
        updating.stateOrProv = this.state.user.stateOrProv;
        updating.city = this.state.user.city;
        updating.postalCode = this.state.user.postalCode;
        updating.phone = this.state.user.phone;
        updating.fax = this.state.user.fax;
        console.log("Final update", updating);
        updating = this.undefinedToBlank(updating);
        users.push(updating);
        const data = {Users: users};
        console.log(data, users);
        this.props.client.writeData({data});
        const usersUpdated = this.props.client.readQuery({query}).Users;
        console.log("Updated results", usersUpdated); 
        console.log("Data", data, users);
        
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
      const errors = this.state.errors;
      console.log("Errors", errors)
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
                        validateSelect={errors && errors.prefix}
                        selectError={errors.prefix}
                        required={true}
                    />  
                <FormItem {...formItemLayout} label="Name">
                    <Input disabled={true} value={user.name} />
                </FormItem>
                <FormItem {...formItemLayout} label="Suffix">
                    <Input defaultValue={user.suffix} onChange={this.handleSuffixChange}/>
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
                    <RadioGroup onChange={this.handleOrcidPermissionRadioChange} value={user.orcidPermissions} >
                        <Radio value="Y">Yes</Radio>
                        <Radio value="N">No</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Primary Citizenship">
                    Needs to be implemented
                </FormItem> 
                <FormItem {...formItemLayout} label="Dual Citizenship">
                    Needs to be implemented
                </FormItem> 
                <Button type="primary" onClick={this.submitChanges}>Submit All Changes</Button>
                

            </Form>
            </TabPane>
            <TabPane tab="Professional" key="2">
            <Form>
                <AntDesignSelect
                    label="Profession"
                    placeholder="Select profession..."
                    optionList={ProfessionTypes.ProfessionTypes}
                    value={user.profession}
                    otherValue={user.professionOther}
                    handleChange={this.handleProfessionChange}
                    handleInput={this.handleProfessionOther}
                    validateSelect={errors && errors.profession}
                    selectError={errors.profession}
                    validateSelectOther={errors && errors.professionOther}
                    selectOtherError={errors.professionOther}
                    required={true}
                />     
                <AntDesignSelect
                    label="Type of Institution"
                    placeholder="Select institution type..."
                    optionList={InstitutionType.InstitutionType}
                    value={user.institutionType}
                    otherValue={user.institutionTypeOther}
                    handleChange={this.handleInstitutionTypeChange}
                    handleInput={this.handleInstitutionTypeOther} // THis was commented out earlier
                    validateSelect={errors && errors.institutionType}
                    selectError={errors.institutionType}
                    validateSelectOther={errors && errors.institutionTypeOther}
                    selectOtherError={errors.institutionTypeOther}
                    required={true}
                />     
                <FormItem {...formItemLayout} required={true} label="Institution name"
                    validateStatus={errors && errors.institution ? 'error' : undefined}

                 >
                    <Input defaultValue={user.institution} onChange={this.handleInstitutionChange}/>
                    {errors.institution && (<FormError error={errors.institution}/>)}  
                </FormItem>   
                <FormItem {...formItemLayout} label="Department">
                    <Input defaultValue={user.department} onChange={this.handleDepartmentChange}/>    
                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Business Address, Line 1"
                    validateStatus={errors && errors.businessAddrL1 ? 'error' : undefined} >
                    <Input defaultValue={user.businessAddrL1} onChange={this.handleBusinnessAddrL1Change}/>
                    {errors.businessAddrL1 && (<FormError error={errors.businessAddrL1}/>)}  
    
                </FormItem>  
                <FormItem {...formItemLayout}  label="Business Address, Line 2">
                    <Input defaultValue={user.businessAddrL2} onChange={this.handleBusinnessAddrL2Change}/>     
                </FormItem> 
                <FormItem {...formItemLayout} required={true} label="Country"
                    validateStatus={errors && errors.country ? 'error' : undefined} >
                    <Input defaultValue={user.country} onChange={this.handleCountryChange}/>
                    {errors.country && (<FormError error={errors.country}/>)}  
   
                    Needs to be implemented  

                </FormItem>
                <FormItem {...formItemLayout}  required={true} label="State/Province"
                    validateStatus={errors && errors.stateOrProv ? 'error' : undefined} >                    
                    <Input defaultValue={user.stateOrProv} onChange={this.handleStateOrProvChange}/>
                    {errors.stateOrProv && (<FormError error={errors.stateOrProv}/>)}  

                    This needs to be implemented
                    Note: This is only required for US and Canada.

                </FormItem>
                <FormItem {...formItemLayout} label="City">
                    <Input defaultValue={user.city} onChange={this.handleCityChange}/>    
                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Postal Code"
                    validateStatus={errors && errors.postalCode ? 'error' : undefined} >                    
                    <Input defaultValue={user.postalCode} onChange={this.handlePostalCodeChange}/> 
                    {errors.postalCode && (<FormError error={errors.postalCode}/>)}    
                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Business phone number"
                    validateStatus={errors && errors.phone ? 'error' : undefined} >                    
                    <Input defaultValue={user.phone} onChange={this.handlePhoneChange}/>  
                    {errors.phone && (<FormError error={errors.phone}/>)}    
                </FormItem>
                <FormItem {...formItemLayout} label="Business fax number">
                    <Input defaultValue={user.fax} onChange={this.handleFaxChange}/>    
                </FormItem>
                <FormItem {...formItemLayout} required={true} label="Business email address"
                    validateStatus={errors && errors.email ? 'error' : undefined} >                    
                    <Input defaultValue={user.email} onChange={this.handleEmailChange}/>
                    {errors.email && (<FormError error={errors.email}/>)}    
    
                </FormItem>
                <Button type="primary" onClick={this.submitChanges}>Submit All Changes</Button>

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

