
export default class ProposalValidator {

  functionList:Array<((data: object) => object|undefined)> = [];
  constructor() {
    this.functionList = [
      this.validateResearchArea,
      this.validateTitle,
      this.validateAbstract,
      this.validateProposalType,
      this.validateStartDate,
      // this.validateNSFSFR,
      // this.validateEMSLStaff
    ]
  }
  
  validateResearchArea(data) {
    if(data.researchArea === undefined || data.researchArea === 'other' && data.researchAreaOther === '') {
      return {field: "researchArea", tooltip: "Research Area must be defined"};
    }
    return undefined;
  }

  validateTextField(field, data, tooltip) {
    if(data === '') {
      return {field, tooltip}
    }
    return undefined;
  }

  validateTitle(data) {
    return this.validateTextField(data.title, 'title', 'All proposals must have a title');
  }

  validateAbstract(data) {
    return this.validateTextField(data.abstract, 'abstract', 'All proposals must have an abstract');
  }

  validateStartDate(data) {
    return this.validateTextField(data.startDate, 'startDate', 'All proposals must have a preferred start date');
  }

  validateProposalType(data) {
    if(data.proposalType === undefined) {
      return {field: "proposalType", tooltip: "Proposal Type must be defined"};
    }
    return undefined;
  }

  doValidate(data) {
    const errors:object[] = [];
    this.functionList.forEach((item) => {
      const error = item(data);
      if(error) {
        errors.push(error);
      }
    });
    return errors;
  }
}