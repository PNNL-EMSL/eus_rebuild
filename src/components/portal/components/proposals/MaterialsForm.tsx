import React from 'react';
import WizardPage from 'components/shared/components/wizard/WizardPage';
import {Form, Input, Radio} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

export default class MaterialsForm extends WizardPage {
  static defaultProps = {
    title: 'Materials and Equipment',
    description: 'Add user-provided equipment to your proposal'
  };

  constructor(props) {
    super(props);
    console.log('materials Form props', this.props);
    this.state = this.props.materialsData;

    this.handleHumanUpdate = this.handleHumanUpdate.bind(this);
    this.handleAnimalUpdate = this.handleAnimalUpdate.bind(this);
    this.handleChemicalsSentUpdate = this.handleChemicalsSentUpdate.bind(this);
    this.handleChemicalsDescriptionUpdate = this.handleChemicalsDescriptionUpdate.bind(this);
    this.handleChemicalsShipUpdate = this.handleChemicalsShipUpdate.bind(this);
    this.handleChemicalShipOtherUpdate = this.handleChemicalShipOtherUpdate.bind(this);
    this.handleChemicalEndUpdate = this.handleChemicalEndUpdate.bind(this);
    this.handleChemicalEndUpdateOther = this.handleChemicalEndUpdateOther.bind(this);
    this.handleSamplesSentUpdate = this.handleSamplesSentUpdate.bind(this);
    this.handleSamplesDescriptionUpdate = this.handleSamplesDescriptionUpdate.bind(this);
    this.handleSamplesRadioactiveUpdate = this.handleSamplesRadioactiveUpdate.bind(this);
    this.handleSamplesNanomaterialsUpdate = this.handleSamplesNanomaterialsUpdate.bind(this);
    this.handleSamplesAphisUpdate = this.handleSamplesAphisUpdate.bind(this);
    this.handleSamplesAphisPermitsUpdate = this.handleSamplesAphisPermitsUpdate.bind(this);
    this.handleSamplesBiologicalUpdate = this.handleSamplesBiologicalUpdate.bind(this);
    this.handleSamplesPestsUpdate = this.handleSamplesPestsUpdate.bind(this);
    this.handleSamplesAliveUpdate = this.handleSamplesAliveUpdate.bind(this);
    this.handleSamplesShipUpdate = this.handleSamplesShipUpdate.bind(this);
    this.handleSamplesShipOtherUpdate = this.handleSamplesShipOtherUpdate.bind(this);
    this.handleSamplesPrep = this.handleSamplesPrep.bind(this);
    this.handleSamplesEndUpdate = this.handleSamplesEndUpdate.bind(this);
    this.handleSamplesEndOtherUpdate = this.handleSamplesEndOtherUpdate.bind(this);
  }
  
  componentWillUnmount() {
    this.beforeNext();
  }

  validatePage = (data) => {
    const errors = this.props.Validator.doValidate(data, 'materialsForm');
    const existingErrors = this.props.proposalErrors;
    existingErrors.materialsErrors = errors;
    this.props.updateErrors(existingErrors);

    this.props.updateComplete(errors.length === 0);
  };

  beforeNext = () => {
    this.validatePage(this.state);
    this.props.updateData('materialsData', this.state);
  };

  handleHumanUpdate(e) {
    const humanMaterials = e.target.value;
    this.setState({humanMaterials});
  }
  handleAnimalUpdate(e) {
    const animalMaterials = e.target.value;
    this.setState({animalMaterials});
  }
  handleChemicalsSentUpdate(e) {
    const chemicalsSent = e.target.value;
    this.setState({chemicalsSent});
  }
  handleChemicalsDescriptionUpdate(e) {
    const chemicalsDescription = e.target.value;
    this.setState({chemicalsDescription});
  }
  handleChemicalsShipUpdate(e) {
    const chemicalsShip = e.target.value;
    this.setState({chemicalsShip});
  }
  handleChemicalShipOtherUpdate(e) {
    const chemicalsShipOther = e.target.value;
    this.setState({chemicalsShipOther});
  }
  handleChemicalEndUpdate(e) {
    const chemicalsEnd = e.target.value;
    this.setState({chemicalsEnd});
  }
  handleChemicalEndUpdateOther(e) {
    const chemicalsEndOther = e.target.value;
    this.setState({chemicalsEndOther});
  }
  handleSamplesSentUpdate(e) {
    const samplesSent = e.target.value;
    this.setState({samplesSent});
  }
  handleSamplesDescriptionUpdate(e) {
    const samplesDescription = e.target.value;
    this.setState({samplesDescription});
  }
  handleSamplesRadioactiveUpdate(e) {
    const samplesRadioactive = e.target.value;
    this.setState({samplesRadioactive});
  }
  handleSamplesNanomaterialsUpdate(e) {
    const samplesNanomaterials = e.target.value;
    this.setState({samplesNanomaterials});
  }
  handleSamplesAphisUpdate(e) {
    const samplesAphis = e.target.value;
    this.setState({samplesAphis});
  }
  handleSamplesAphisPermitsUpdate(e) {
    const samplesAphisPermits = e.target.value;
    this.setState({samplesAphisPermits});
  }
  handleSamplesBiologicalUpdate(e) {
    const samplesBiological = e.target.value;
    this.setState({samplesBiological});
  }
  handleSamplesPestsUpdate(e) {
    const samplesPests = e.target.value;
    this.setState({samplesPests});
  }
  handleSamplesAliveUpdate(e) {
    const samplesAlive = e.target.value;
    this.setState({samplesAlive});
  }
  handleSamplesShipUpdate(e) {
    const samplesShip = e.target.value;
    this.setState({samplesShip});
  }
  handleSamplesShipOtherUpdate(e) {
    const samplesShipOther = e.target.value;
    this.setState({samplesShipOther});
  }
  handleSamplesPrep(e) {
    const samplesPrep = e.target.value;
    this.setState({samplesPrep});
  }
  handleSamplesEndUpdate(e) {
    const samplesEnd = e.target.value;
    this.setState({samplesEnd});
  }
  handleSamplesEndOtherUpdate(e) {
    const samplesEndOther = e.target.value;
    this.setState({samplesEndOther});
  }


  render() {
    const data = this.state;
    console.log('materialsState', data);
    const formItemLayout = {
      labelCol: {
        sm: { span: 12 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const radioStyle = {
      display: 'block',
      height: '25px',
      lineHeight: '25px',
    };
    const errors = this.props.proposalErrors.materialsErrors;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          className={'two-rows-label'}
          label="Will your research involve the use of human blood, tissues, DNA, cells, cell lines or human biological samples in any form?"
          required={true}
          colon={false}
          validateStatus={errors && errors.some((error) => (error.field === 'humanMaterials')) === true ? 'error' : undefined}
        >
          <RadioGroup defaultValue={data.humanMaterials} onChange={this.handleHumanUpdate}>
            <Radio value={true} >Yes</Radio>
            <Radio value={false} >No</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formItemLayout}
          className={'two-rows-label'}
          label="Does this work involve the use of animals?"
          required={true}
          colon={false}
          validateStatus={errors && errors.some((error) => (error.field === 'animalMaterials')) === true ? 'error' : undefined}
        >
          <RadioGroup defaultValue={data.animalMaterials} onChange={this.handleAnimalUpdate}>
            <Radio value={true} >Yes</Radio>
            <Radio value={false} >No</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formItemLayout}
          className={'two-rows-label'}
          label="Will you be bringing or sending chemicals to the EMSL facility?"
          required={true}
          colon={false}
          validateStatus={errors && errors.some((error) => (error.field === 'chemicalsStart')) === true ? 'error' : undefined}
        >
          <RadioGroup defaultValue={data.chemicalsSent} onChange={this.handleChemicalsSentUpdate}>
            <Radio value={true} >Yes</Radio>
            <Radio value={false} >No</Radio>
          </RadioGroup>
        </FormItem>
        {data.chemicalsSent === true && (
          <div>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Description of chemicals"
              required={true}
              validateStatus={errors && errors.some((error) => (error.field === 'chemicalsDescription')) === true ? 'error' : undefined}
            >
              <TextArea defaultValue={data.chemicalsDescription} onChange={this.handleChemicalsDescriptionUpdate}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="How do you plan to bring/send the chemicals to the facility?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'chemicalsShip')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.chemicalsShip} onChange={this.handleChemicalsShipUpdate}>
                <Radio style={radioStyle} value='ship' >Ship</Radio>
                <Radio style={radioStyle} value='handCarry' >Hand Carry</Radio>
                <Radio style={radioStyle} value='other' >Other</Radio>
                {data.chemicalsShip === 'other' && (
                  <FormItem
                    {...formItemLayout}
                    label="Specify"
                    required={true}
                    validateStatus={errors && errors.some((error) => (error.field === 'chemicalsShipOther')) === true ? 'error' : undefined}
                  >
                    <Input
                      defaultValue={data.chemicalsShipOther}
                      onChange={this.handleChemicalShipOtherUpdate}
                    />
                  </FormItem>
                )}
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="At the end of the project the chemicals will be"
              required={true}
              validateStatus={errors && errors.some((error) => (error.field === 'chemicalsEnd')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.chemicalsEnd} onChange={this.handleChemicalEndUpdate}>
                <Radio style={radioStyle} value='return' >Returned to you</Radio>
                <Radio style={radioStyle} value='dispose' >Disposed at Emsl</Radio>
                <Radio style={radioStyle} value='other' >Other</Radio>
                {data.chemicalsEnd === 'other' && (
                  <FormItem
                    {...formItemLayout}
                    label="Specify"
                    required={true}
                    validateStatus={errors && errors.some((error) => (error.field === 'chemicalsEndOther')) === true ? 'error' : undefined}
                  >
                    <Input
                      defaultValue={data.chemicalsEndOther}
                      onChange={this.handleChemicalEndUpdateOther}
                    />
                  </FormItem>
                )}
              </RadioGroup>
            </FormItem>
          </div>
        )}
        <FormItem
          {...formItemLayout}
          className={'two-rows-label'}
          label="Does your experiment on EMSL resources involve samples?"
          required={true}
          colon={false}
          validateStatus={errors && errors.some((error) => (error.field === 'samplesSent')) === true ? 'error' : undefined}
        >
          <RadioGroup defaultValue={data.samplesSent} onChange={this.handleSamplesSentUpdate}>
            <Radio value={true} >Yes</Radio>
            <Radio value={false} >No</Radio>
          </RadioGroup>
        </FormItem>
        {data.samplesSent === true && (
          <div>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Description of samples"
              required={true}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesDescription')) === true ? 'error' : undefined}
            >
              <TextArea defaultValue={data.samplesDescription} onChange={this.handleSamplesDescriptionUpdate}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Do any of the samples contain radioactive isotopes?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesRadioactive')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesRadioactive} onChange={this.handleSamplesRadioactiveUpdate}>
                <Radio value={true} >Yes</Radio>
                <Radio value={false} >No</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Do any of the samples contain bound or unbound engineered nanomaterials?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesNanomaterials')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesNanomaterials} onChange={this.handleSamplesNanomaterialsUpdate}>
                <Radio value={true} >Yes</Radio>
                <Radio value={false} >No</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Are any of these sample regulated USDA APHIS (ex: certain soils containing biological material)?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesAphis')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesAphis} onChange={this.handleSamplesAphisUpdate}>
                <Radio value={true} >Yes</Radio>
                <Radio value={false} >No</Radio>
              </RadioGroup>
            </FormItem>
            {data.samplesAphis === true && (
              <FormItem
                {...formItemLayout}
                className={'two-rows-label'}
                label="Enter each Permit Number, comma separated"
                required={true}
                validateStatus={errors && errors.some((error) => (error.field === 'samplesAphisPermits')) === true ? 'error' : undefined}
              >
                <TextArea defaultValue={data.samplesAphisPermits} onChange={this.handleSamplesAphisPermitsUpdate}/>
              </FormItem>
            )}
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Are any of the samples biological?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesBiological')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesBiological} onChange={this.handleSamplesBiologicalUpdate}>
                <Radio value={true} >Yes</Radio>
                <Radio value={false} >No</Radio>
              </RadioGroup>
            </FormItem>
            {data.samplesBiological === true && (
              <div>
                <FormItem
                  {...formItemLayout}
                  className={'two-rows-label'}
                  label="Can the biologic samples contain plant pathogens/pests?"
                  required={true}
                  colon={false}
                  validateStatus={errors && errors.some((error) => (error.field === 'samplesPests')) === true ? 'error' : undefined}
                >
                  <RadioGroup defaultValue={data.samplesPests} onChange={this.handleSamplesPestsUpdate}>
                    <Radio value={true} >Yes</Radio>
                    <Radio value={false} >No</Radio>
                  </RadioGroup>
                </FormItem>
                {data.samplesPests === true && (
                  <FormItem
                    {...formItemLayout}
                    className={'two-rows-label'}
                    label="Are the pathogens/pests alive or inactive?"
                    required={true}
                    colon={false}
                    validateStatus={errors && errors.some((error) => (error.field === 'samplesAlive')) === true ? 'error' : undefined}
                  >
                    <RadioGroup defaultValue={data.samplesAlive} onChange={this.handleSamplesAliveUpdate}>
                      <Radio value={true} >Alive</Radio>
                      <Radio value={false} >Inactive</Radio>
                    </RadioGroup>
                  </FormItem>
                )}
              </div>
            )}
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="How do you plan to bring/send the samples to the facility?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesShip')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesShip} onChange={this.handleSamplesShipUpdate}>
                <Radio style={radioStyle} value='ship' >Ship</Radio>
                <Radio style={radioStyle} value='handCarry' >Hand Carry</Radio>
                <Radio style={radioStyle} value='other' >Other</Radio>
                {data.samplesShip === 'other' && (
                  <FormItem
                    {...formItemLayout}
                    label="Specify"
                    required={true}
                    validateStatus={errors && errors.some((error) => (error.field === 'samplesShipOther')) === true ? 'error' : undefined}
                  >
                    <Input defaultValue={data.samplesShipOther} onChange={this.handleSamplesShipOtherUpdate}/>
                  </FormItem>
                )}
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="Will you need to perform sample preparation at the facility?"
              required={true}
              colon={false}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesPrep')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesPrep} onChange={this.handleSamplesPrep}>
                <Radio value={true} >Yes</Radio>
                <Radio value={false} >No</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              className={'two-rows-label'}
              label="At the end of the project the samples will be"
              required={true}
              validateStatus={errors && errors.some((error) => (error.field === 'samplesEnd')) === true ? 'error' : undefined}
            >
              <RadioGroup defaultValue={data.samplesEnd} onChange={this.handleSamplesEndUpdate}>
                <Radio style={radioStyle} value='return' >Ship</Radio>
                <Radio style={radioStyle} value='dispose' >Hand Carry</Radio>
                <Radio style={radioStyle} value='other' >Other</Radio>
                {data.samplesEnd === 'other' && (
                  <FormItem
                    {...formItemLayout}
                    label="Specify"
                    required={true}
                    validateStatus={errors && errors.some((error) => (error.field === 'samplesEndOther')) === true ? 'error' : undefined}
                  >
                    <Input defaultValue={data.samplesEndOther} onChange={this.handleSamplesEndOtherUpdate}/>
                  </FormItem>
                )}
              </RadioGroup>
            </FormItem>
          </div>
        )}
        <hr />
        <div>user equipment listing</div>
        <hr />
        <div>Proposal comments</div>
      </Form>
    )
  }
}