import ValidatorBase from 'components/shared/components/validator/ValidatorBase';

export default class UserProfileValidator extends ValidatorBase {

    constructor() {
        super()
    
        this.functionList = {
            UserProfileForm: [
        //         { func: this.validateResearchArea, field: undefined, tooltip: 'Research Area must be defined' },
        // { func: this.validateOtherIfSelected, field: 'researchOther', parentField: 'researchArea', tooltip: 'You must specify the research area.'},
                {func: this.validateNotEmptyOrUndefined, field: 'prefix', tooltip: 'Prefix must be defined' },
                {func: this.validateOtherIfSelected, field: 'prefixOther', parentField: 'prefix', tooltip: "Please enter other prefix"},
                {func: this.validateNotEmptyOrUndefined, field: 'profession', tooltip: "Profession must be defined"},
                {func: this.validateOtherIfSelected, field: 'professionOther', parentField: 'profession', tooltip: "Please enter other profession"},
                {func: this.validateNotEmptyOrUndefined, field: "institution", tooltip: "Please provide an insitution name"},
                {func: this.validateNotEmptyOrUndefined, field: "institutionType", tooltip: "Institution type must be defined"},
                {func: this.validateOtherIfSelected, field: 'institutionTypeOther', parentField: 'institutionType', tooltip: "Please enter other institution type"},
                {func: this.validateNotEmptyOrUndefined, field: "businessAddrL1", tooltip: "Please enter an address"},
                {func: this.validateNotEmptyOrUndefined, field: "country", tooltip: "Please enter the institution's country"},

                // Note: validation requried for being USA or Canada?
                {func: this.validateNotEmptyOrUndefined, field: "stateOrProv", tooltip: "Please enter your institution's state or providence"},
                {func: this.validateNotEmptyOrUndefined, field: "postalCode", tooltip: "Please enter your institution's postal code"},
                {func: this.validateNotEmptyOrUndefined, field: "phone", tooltip: "Please enter your business phone"},
                {func: this.validatePhoneAndFaxNumberFormat, field: "phone", tooltip: "Incorrect phone number format"},
                {func: this.validatePhoneAndFaxNumberFormat, field: "fax", tooltip: "Incorrect fax number format"},
                {func: this.validateNotEmptyOrUndefined, field: "email", tooltip: "Please enter your business email"},
                {func: this.validateEmailFormat, field: "email", tooltip: "Please enter a valid email address"}
                
            ]


        }
    
    };

    validatePhoneAndFaxNumberFormat(data, field, tooltip) {
        if (data !== undefined && data !== "") {
            if (!data.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g)) {
                return {field, tooltip};
            }
        }

        return undefined;
    }

    validateEmailFormat(data, field, tooltip) {
        if (data !== undefined && data !== "") {
            if (!data.match(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)) {
                return {field, tooltip}
            }
        }

        return undefined;
    }

}