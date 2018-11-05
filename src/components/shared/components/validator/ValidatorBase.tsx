export default class ValidatorBase {
  functionList:any = [];
  
  _createReturnText(fieldArray, tooltip) {
    let joined = '';
    if(fieldArray.length > 1) {
      const last = fieldArray.pop();
      joined = fieldArray.join(', ') + ' and ' + last;
    } else {
      joined = fieldArray.join(', ');
    }
    return [joined, tooltip].join(' ');
  }
  
  validateNotEmptyOrUndefined(data, field: string|undefined,  tooltip) {
    if(data === '' || data === undefined) {
      return {field, tooltip}
    }
    return undefined;
  }

  validateNotEmptyOrUndefinedIfSelected(data, parentData, field, tooltip, instance) {
    if(parentData === '' || parentData === undefined) {
      return undefined;
    }
    if(data === '' || data === undefined) {
      return {field, tooltip}
    }
    return undefined;
  }

  validateOtherIfSelected(data, parentData, field, tooltip, instance) {
    if(parentData === 'other') {
      if(data === '' || data === undefined) {
        return {field, tooltip}
      }
    }
    return undefined;
  }
  
  doValidate(data, form) {
    const errors:object[] = [];
    const instance = this;
    if(this.functionList[form]) {
      this.functionList[form].forEach((item) => {
        let error = {};
        if (item.parentField !== undefined) {
          error = item.func(data[item.field], data[item.parentField], item.field, item.tooltip, instance);
        } else if(item.field !== undefined) {
          error = item.func(data[item.field], item.field, item.tooltip, instance);
        } else {
          error = item.func(data, item.tooltip, instance)
        }
        if (error) {
          errors.push(error);
        }
      });
    }
    return errors;
  }

  displayErrors(errors) {
    const errorArray:string[] = [];
    errors.forEach((error) => {
      errorArray[error.field] = error.tooltip;
    });
    return errorArray;
  }
}