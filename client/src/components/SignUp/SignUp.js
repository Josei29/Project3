import React from "react";
import { Row, Input } from "react-materialize";
import API from "../../API/API.js";
import "./SignUp.css";

class SignUp extends React.Component {

    state = {
        name: "",
        username:"",
        password:""
    }

    // If the User is typing we keep track of it and set the state with the latest
    captureInput = (event) => {
        // console.log(event.target.name, event.target.value)

        this.setState({
            [event.target.name]:event.target.value
        });

    }

    // Creating a new User, sending the data to our back-end code and waiting for the response
    handleSignUp = (event) => {
        event.preventDefault();
        // console.log("I'm signing up baby", this.state);

        if (this.state.name && this.state.username && this.state.password ) {
            API.create(this.state).then(function(response){
                // console.log(response.data);
    
                if (response.data.code === 11000) {
                    return window.Materialize.toast('Username Already In Use!', 2000)
                } else return window.location.pathname = "/user/budget/" + response.data._id;
                
            })
        } else return window.Materialize.toast('Information Missing!', 2000)

    }

    render() {
        return(
            <div>
                <Row>
                    <Input placeholder="Your Name" s={8} label="Name" onChange={this.captureInput} name="name" type="text" validate />
                    <Input placeholder="YourUsername" s={6} label="Username" onChange={this.captureInput} name="username" type="text" validate />
                    <Input placeholder="Password" s={6} label="Password" type="password" onChange={this.captureInput} name="password" validate />
                </Row>  
                <button className="signLog" onClick={this.handleSignUp}>Submit</button>    
            </div>
        )
    }
};

export default SignUp;