import React, {Component} from 'react';
// import CarouselContainer from 'components/core/CarouselContainer';
// import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';
import ReactDataGrid from 'react-data-grid';
// import { SwatchesPicker } from 'react-color';
// import { css } from 'emotion';

export default class CarouselSettingsContainer extends Component<any, any> {
    GET_MESSAGE_INFORMATION = gql`
    {
      CarouselInfos @client {
        id,
        text,
        imgUrl,
        order,
        display,   
      }
    }
  `;
    
    columns:Array<{key, name}>;
    rows:object[];


    constructor(props){
        super(props);
       
        this.columns = [
          {
            key: 'id',
            name: 'ID'
          },
          {
            key: 'title',
            name: 'Title'
          },
          {
            key: 'count',
            name: 'Count'
          }
        ];

        this.rows = [{id: 'a', title: 'a', count: 10},{id: 'b', title: 'b', count: 11},{id: 'x', title: 'u', count: 19},];
        
        this.renderContent = this.renderContent.bind(this);
        this.updateCarouselSettings = this.updateCarouselSettings.bind(this);
        this.updateCarouselDisplay = this.updateCarouselDisplay.bind(this);
        this.onRowsSelected = this.onRowsSelected.bind(this);
        this.onRowsDeselected = this.onRowsDeselected.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
    }

    getColumns() {
      return this.columns;
    }

    updateCarouselSettings(prop, value) {
      const query = this.GET_MESSAGE_INFORMATION;
      let prev = this.props.client.readQuery({query}).CarouselInfos;
      const changing = prev.filter((item) => (item.id === this.props.settings.id))[0];// the prev object with id = this.props.id.
      console.log(changing);
      // remove changing from prev
      prev = prev.filter((item) => (item.id !== this.props.settings.id)); 
      console.log(prev);
      // update changing to the new values (in state)
      changing[prop] = value;
      // push changing BACK into previous
      prev.push(changing);
      prev = prev.sort((a, b) => (a.id > b.id));
      console.log(prev);
      const data={CarouselInfos: prev};
      this.props.client.writeData({data});
    }

    // Next step get some columns so we can see what we are working with


    updateCarouselDisplay(e) {
      this.updateCarouselSettings('display', e.currentTarget.checked);
  }

    onRowsSelected = (rows) => {
      this.updateCarouselDisplay(rows);
    };
  
    onRowsDeselected = (rows) => {
      this.updateCarouselDisplay(rows);
    };

    rowGetter = (i) => {
      return this.rows[i];
    }

    render() {
      
  
      const selectedRows = this.props.settings.filter((item) => (item.display === true));
      console.log(selectedRows);
      this.rows = [{id: 'a', title: 'a', count: 10},{id: 'b', title: 'b', count: 11},{id: 'x', title: 'u', count: 19},];

      return(
        <ReactDataGrid 
          columns={this.getColumns()}
          rowGetter={this.rowGetter}
          rowsCount={this.rows.length}
          minHeight={500}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            
          }}        
        />
      );
    }

    
    renderContent() {
        const carousel = this.props.settings;
        const content:JSX.Element[] = [];
        Object.keys(carousel).map((key) => {
            const info = carousel[key];
            console.log(info, 'caro info');
            content.push(
              <div>
              <CarouselSettingsObj {...this.props} settings={info}/>
              </div>
            )
        })
        console.log('set cntainer', content)
        return content;
        return(
           // object keys then for each
           <div>
            {content}
            </div>
        );
    }

    dropHandler(el) {
      console.log("Drop handler called");
    }

}