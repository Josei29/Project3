import React from "react";
import { Row, Input } from "react-materialize";
import API from "../../API/API.js";
import "./Login.css";
 
class Login extends React.Component {

    state = {
        username:"",
        password:""
    }

    captureInput = (event) => {
        // console.log(event.target.name, event.target.value)

        this.setState({
            [event.target.name]:event.target.value
        });

    }

    handleSignUp = (event) => {
        event.preventDefault();
        // console.log("I'm logging in baby", this.state);
        let self = this;
        
        API.login(self.state).then(function(response){
            //console.log(response);
            if (response.data === "Wrong" || !response.data.success) {
                return window.Materialize.toast('Incorrent User/Password!', 1000)
            }
            else if (response.data.success) return window.location.pathname = "/user/budget/" + response.data.user._id;
        });
    }

    render() {
        return(
            <div>
                <Row>
                    <Input placeholder="YourUsername" s={8} label="Username" onChange={this.captureInput} name="username" type="text" validate />
                    <Input placeholder="Password" s={8} label="Password" type="password" onChange={this.captureInput} name="password" validate />
                </Row>      
                <button className="signLog" onClick={this.handleSignUp}>Submit</button>
            </div>
        )
    }
};

export default Login;