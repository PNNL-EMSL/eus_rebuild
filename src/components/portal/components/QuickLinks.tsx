import React, {Component} from 'react'; 
import {css} from 'emotion';

const quickLinks: string = css`
  width: 18%;
  display: inline-table;
  `;

export default  class QuickLinks extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className={quickLinks}>
                <a href="#" >My Profile </ a>  <hr />
                <a href="#" >Submit a Proposal </ a> <hr />
                <a href="#" >Schedule an Experiment </ a>     <hr />
                <a href="#" >Submit a Sample</ a>  <hr />
                <a href="#" >Search my Data</ a> <hr />
                <a href="#" >Add a Publication</ a> <hr />
                <a href="#" >Provide Feedback</ a> <hr />
                <a href="#" onClick={this.props.logoutHandler} >Sign Out</ a>    

                
            </div>

        );
    }
        

}