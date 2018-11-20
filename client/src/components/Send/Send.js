import React, { Component } from "react";
import SideNav from "../SideNav/SideNav.js";
import MainSend from "./MainSend.js";
import "./Send.css"
import API from "../../API/API.js";

class Send extends Component {
    state = {
        user: "",
        name: ""
    }

    // Getting our User data and sending it to the State object
    getName = (id) => {
        // console.log(id);
        API.getName(id).then(response => {
            // console.log(response.data);
            return this.setState({  name: response.data.name,
                                    special: response.data.special
                                });
        });
    }
    
    // Getting the User id from our URL
    componentDidMount = () => {
        // console.log(window.location.pathname);
        let x = window.location.pathname.split("/");
        // console.log(x[3]);
        this.setState({user: x[3]});
        this.getName(x[3]);
    }

    render() {
        return(
            <div>
                <SideNav user={this.state.user} name={this.state.name} />
                {this.state.user ?
                    <MainSend user={this.state.user} /> : <div>Loading...</div>
                }
            </div>
        )
        
    }
}

export default Send;