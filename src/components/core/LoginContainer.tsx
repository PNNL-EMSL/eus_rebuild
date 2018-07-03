/**
 * Created by dega126 on 7/2/18.
 */
import React, {Component} from 'react';
import {css} from 'emotion';

const container: string = css`
    background-color: #6699ff;
`


export default class LoginContainer extends Component {
    render() {
        return (
            <div className={container}>
                Temp Login container

                <div>
                    PNNL Network ID:
                    <input name='username' />

                    

                    
                    
                </div>
                <br />
                <div>
                    PNNL Password: 
                    <input name='pass' />
                </div>

                <div>
                    <button onClick={this.submitFunction}>Log In</button>
                </div>

                <div>
                    Placeholder Div 3
                </div>

            </div>

            
        )
    }

    submitFunction(e) {
        e.preventDefault();
        window.location.assign("/homeTab");
        // console.log("Hello World");
    }
}
