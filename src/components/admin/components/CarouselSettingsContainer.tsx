import React, {Component} from 'react';
import gql from 'graphql-tag';
import CarouselSettingsObj from 'components/admin/components/CarouselSettingsObj';
import ReactDataGrid from 'react-data-grid';
import CaroImgFormatter from 'components/admin/components/carousel_comps/CaroImgFormatter';

import PropTypes from 'prop-types';
import  * as ReactDataGridAddons from 'react-data-grid-addons';
const Draggable = ReactDataGridAddons.Draggable;
const DraggableContainer = Draggable.Container;
const RowActionsCell = Draggable.RowActionsCell;
const DropTargetRowContainer = Draggable.DropTargetRowContainer;

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
        webUrl,
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
        formatter: CaroImgFormatter,
        resizable: true,
        editable: true
      },

      {
        key: 'webUrl',
        name: 'Web URL',
        resizable: true,
        editable: true,
        events: {
          onCommit: instance.textListener,
          onKeyDown: instance.textListener
        }
      },
    ];

    console.log('raw rows', this.props.settings);
    this.renderContent = this.renderContent.bind(this);
    this.updateCarouselSettings = this.updateCarouselSettings.bind(this);
    this.updateCarouselImgUrl = this.updateCarouselImgUrl.bind(this);
    this.updateCarouselDisplay = this.updateCarouselDisplay.bind(this);
    this.updateCarouselOrder = this.updateCarouselOrder.bind(this);
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
    }
  }

  imgUrlListener(ev, args) {
    if (ev.key === 'Enter') {
      console.log(ev.target.value, args);
    }
  }

  getColumns() {
    return this.columns;
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

  updateCarouselOrder(newData) {
    const data = { CarouselInfos: newData };
    this.props.client.writeData({data});
  }

  updateCarouselDisplay(id, display) {
    this.updateCarouselSettings(id, 'display', display);
  }

  onRowsSelected = (rows) => {
    this.updateCarouselDisplay(rows[0].row.id, true);
  };

  onRowsDeselected = (rows) => {
    this.updateCarouselDisplay(rows[0].row.id, false);
  };

  rowGetter = (i) => {
    return this.rows[i]; // this.rows[i];
  };

  reorderRows = (e) => {
    const draggedRows:any[] = [e.rowSource.data];
    const undraggedRows:any[] = this.rows.filter((r) => {
      return draggedRows.indexOf(r) === -1;
    });
    let order = 1;
    undraggedRows.splice(e.rowTarget.idx, 0, e.rowSource.data);
    Object.keys(undraggedRows).forEach((index) => {
      const row = undraggedRows[index];
      const newRow = {
        id: row.id,
        display: row.display,
        order,
        text: row.text,
        imgUrl: row.imgUrl,
        __typename: "CarouselInfoItem"
      };
      undraggedRows[index] = newRow;
      order++;
    });
    this.rows = undraggedRows;
    this.updateCarouselOrder(this.rows);
  };
  

  render() {
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
      </DraggableContainer>
    );
  }


  renderContent() {
    const carousel = this.rows;
    const content:JSX.Element[] = [];
    Object.keys(carousel).map((key) => {
      const info = carousel[key];
      content.push(
        <CarouselSettingsObj {...this.props} settings={info}/>
      )
    });
    return content;
  }
}