import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";
import "./SideNav.css";

class SideNav extends Component {

    render() {
        return(
            <div>
                <Navbar brand={"Hi, " + this.props.name} left>
                    <NavItem href={"/user/budget/" + this.props.user}>Budget</NavItem>
                    <NavItem href={"/user/special/"  + this.props.user}>Special</NavItem>
                    <NavItem href={"/user/send/" + this.props.user}>Send</NavItem>
                    <NavItem href="/">Home</NavItem>
                </Navbar>
            </div>
        )
    }
}

export default SideNav;