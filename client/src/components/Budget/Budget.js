import React, { Component } from "react";
import SideNav from "../SideNav/SideNav.js";
import "./Budget.css";
import MainBudget from "./MainBudget.js";
import API from "../../API/API.js";

class Budget extends Component {

    state = {
        user: "",
        name: "",
        budget: []
    }

    getName = (id) => {
        // console.log("getName", id);
        API.getName(id).then(response => {
            // console.log("landed on budget", response.data);
            this.setState({ user: response.data._id,
                            name: response.data.name,
                            budget: response.data.budget
                        });
            return;
        });
    }
    
    componentDidMount = () => {
        // console.log(window.location.pathname);
        let x = window.location.pathname.split("/");
        // console.log("Current User", x)
        // console.log(x[3]);
        this.setState({user: x[3]});
        this.getName(x[3]);
    } 

    render() {
        return(
            <div>
                <SideNav user={this.state.user} name={this.state.name}/>
                { this.state.user ?
                <MainBudget user={this.state.user} /> : <div>Loading...</div>
                }
                </div>
        );
    }
};

export default Budget;