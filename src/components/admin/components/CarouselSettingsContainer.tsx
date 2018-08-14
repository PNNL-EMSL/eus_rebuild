import React, {Component} from 'react';
// import CarouselContainer from 'components/core/CarouselContainer';
// import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';
import ReactDataGrid from 'react-data-grid';
// import ImageFormatter from 'react-data-grid-addons';
import CaroImgFormatter from 'components/admin/components/carousel_comps/CaroImgFormatter';
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
    
    columns:object[];
    rows:object[];


    constructor(props){
        super(props);
       
        this.columns = [
          {
            key: 'id',
            name: 'ID',
            width: 50,
            resizable: true,
          },
          {
            key: 'text',
            name: 'Text',
            
            resizable: true,
            editable: true,
            width: 50,
          },
          // {
          //   key: 'imgUrl',
          //   name: 'Image URL',
          //   resizable: true,
          //   editable: true
          // },
          {
            key: 'imgUrl',
            name: 'Image Preview',
            // formatter: ImageFormatter,
            formatter: CaroImgFormatter,
            resizable: true,
            editable: true,
            // headerRenderer: <ImageFormatter value='https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiCu8r2yu3cAhWBL3wKHbUCC7oQjRx6BAgBEAU&url=https%3A%2F%2Fsocialnetworking.lovetoknow.com%2FAvatar_Galleries&psig=AOvVaw3loKFuYQOT6zv14M0_uzi3&ust=1534371909818288' />
          },
        ];

        // this.rows = [{id: 'a', title: 'a', count: 10},{id: 'b', title: 'b', count: 11},{id: 'x', title: 'u', count: 19},];
        
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

    updateCarouselSettings(id, prop, value) {
      const query = this.GET_MESSAGE_INFORMATION;
      let prev = this.props.client.readQuery({query}).CarouselInfos;
      const changing = prev.filter((item) => (item.id === id))[0];// the prev object with id = this.props.id.
      console.log(changing);
      // remove changing from prev
      prev = prev.filter((item) => (item.id !== id)); 
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


    updateCarouselDisplay(id, display) {
      this.updateCarouselSettings(id, 'display', display);
  }

    onRowsSelected = (rows) => {
      console.log("on rows selected", rows);
      this.updateCarouselDisplay(rows[0].row.id, true);
    };
  
    onRowsDeselected = (rows) => {
      console.log("on rows deselected", rows);
      this.updateCarouselDisplay(rows[0].row.id, false);
    };

    rowGetter = (i) => {
      return this.props.settings[i]; // this.rows[i];
    }

    render() {
      const selectedRows = this.props.settings.filter((item) => (item.display === true));
      console.log("selected rows called", selectedRows);

      return(
        <ReactDataGrid 
          columns={this.getColumns()}
          rowGetter={this.rowGetter}
          rowsCount={this.props.settings.length}
          minHeight={500}
          rowHeight={50}
          rowSelection={{
            showCheckbox: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              isSelectedKey: 'display'
            }
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