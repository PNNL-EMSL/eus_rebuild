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
import PropTypes from 'prop-types';
import  * as ReactDataGridAddons from 'react-data-grid-addons';
const Draggable = ReactDataGridAddons.Draggable;
const DraggableContainer = Draggable.Container;
const RowActionsCell = Draggable.RowActionsCell;
const DropTargetRowContainer = Draggable.DropTargetRowContainer;

// const RowActionsCell = ReactDataGridAddons.RowActionsCell;
// const DropTargetRowContainer = ReactDataGridAddons.DropTargetRowContainer;
// const Data = ReactDataGridAddons.Selectors;
// const RowRenderer = DropTargetRowContainer(CarouselSettingsObj);
const RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);

export default class CarouselSettingsContainer extends Component<any, any> {
  static propTypes = {
    rowKey: PropTypes.string.isRequired
  };  

  static defaultProps = { rowKey: 'id' };
  
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
    
    columns: any;
    rows: any;

    constructor(props){
        super(props);
        this.textListener = this.textListener.bind(this);
        this.imgUrlListener = this.imgUrlListener.bind(this);
        const instance = this;
        this.rows = this.props.settings;
        this.columns = [
          {
            key: 'id',
            name: 'ID',
            width: 50,
            editable: true,
            resizable: true,
          },
          {
            key: 'text',
            name: 'Text',
            editable: true,
            resizable: true,
            events: {
              onCommit: instance.textListener,
              onKeyDown: instance.textListener
              // function(ev, args) {
              //   if (ev.key === 'Enter') {
              //     console.log(ev, args);
              //     instance.updateCarouselText(args.rowId, args);

              //   }
              // }
              
              // onFocusOut: instance.textListener
              // onCellDeselected: (ev, args) {
              //   console.log(ev, args);
              //   instance.updateCarouselText(args.rowId, args);
              // }
            }
          },
          {
            key: 'imgUrl',
            name: 'Image URL',
            resizable: true,
            editable: true,
            events: {
              onCommit: instance.imgUrlListener,
              onKeyDown: instance.imgUrlListener
            }
          },
          {
            key: 'imgUrl',
            name: 'Image Preview',
            // formatter: ImageFormatter,
            formatter: CaroImgFormatter,
            resizable: true,
            editable: true
            // headerRenderer: <ImageFormatter value='https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiCu8r2yu3cAhWBL3wKHbUCC7oQjRx6BAgBEAU&url=https%3A%2F%2Fsocialnetworking.lovetoknow.com%2FAvatar_Galleries&psig=AOvVaw3loKFuYQOT6zv14M0_uzi3&ust=1534371909818288' />
          },
        ];

        // this.rows = [{id: 'a', title: 'a', count: 10},{id: 'b', title: 'b', count: 11},{id: 'x', title: 'u', count: 19},];
        this.renderContent = this.renderContent.bind(this);
        this.updateCarouselSettings = this.updateCarouselSettings.bind(this);
        this.updateCarouselImgUrl = this.updateCarouselImgUrl.bind(this);
        this.updateCarouselDisplay = this.updateCarouselDisplay.bind(this);
        this.onRowsSelected = this.onRowsSelected.bind(this);
        this.onRowsDeselected = this.onRowsDeselected.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
      if((this.rows !== nextProps.settings)) {
        this.rows = nextProps.settings;
        return true;
      }
      return false;
    }

    textListener(ev, args) {
        if (ev.key === 'Enter') {
          console.log(ev.target.value, args);
          // const id = this.rows[args.rowIdx].id;
          // this.updateCarouselText(id, ev.target.value);
        }
    }

    imgUrlListener(ev, args) {
      if (ev.key === 'Enter') {
        console.log(ev.target.value, args);
        // const id = this.rows[args.rowIdx].id;
        // this.updateCarouselImgUrl(id, ev.target.value);
      }
  }

    getColumns() {
      return this.columns;
    }

    
    updateCarouselText(id, text) {
      this.updateCarouselSettings(id, 'text', text);
    }


    updateCarouselImgUrl(id, text) {
      this.updateCarouselSettings(id, 'imgUrl', text);
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
      console.log('in rowGetter', i);
      return this.rows[i]; // this.rows[i];
    }

    reorderRows = (e) => {
      const draggedRows:any[] = [e.rowSource.data];
      const undraggedRows:any[] = this.rows.filter((r) => {
        return draggedRows.indexOf(r) === -1;
      });
      undraggedRows.splice(e.rowTarget.idx, 0, e.rowSource.data);
      this.rows = undraggedRows;
      console.log(this.rows);
      
      // let draggedRows = this.isDraggedRowSelected(selectedRows, e.rowSource) ? selectedRows : [e.rowSource.data];
      // let undraggedRows = this.state.rows.filter(function(r) {
      //   return draggedRows.indexOf(r) === -1;
      // });
      // let args = [e.rowTarget.idx, 0].concat(draggedRows); // Concatonates the rows to be dragged to the target index
      // Array.prototype.splice.apply(undraggedRows, args); // No elements deleted because start is 0. So it adds the undragged rows to the start and the dragged rows after them (?)  
      // this.setState({rows: undraggedRows});
    };
  

    render() {
//      const selectedRows = this.rows.filter((item) => (item.display === true));

      return(
        <DraggableContainer>
            <ReactDataGrid 
              enableCellSelect={true}
              rowActionsCell={RowActionsCell}
              columns={this.getColumns()}
              rowGetter={this.rowGetter}
              rowsCount={this.rows.length}
              minHeight={500}
              rowRenderer={<RowRenderer onRowDrop={this.reorderRows}/>}
              rowHeight={50}
              rowSelection={{
                showCheckbox: true,
                enableShiftSelect: true,
                onRowsSelected: this.onRowsSelected,
                onRowsDeselected: this.onRowsDeselected,
                selectBy: {
                  isSelectedKey: 'display'
                }
              }}        
            />
        </DraggableContainer>);
    }

    
    renderContent() {
        const carousel = this.rows;
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