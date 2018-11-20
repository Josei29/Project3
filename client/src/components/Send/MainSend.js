import React, { Component } from "react";
import { Row, Input, Button, Icon } from "react-materialize";
import API from "../../API/API.js";

class MainSend extends Component {

    state = {
        balance: 0,
        to: "",
        amount: ""
    }
    
    // Getting the User data with the latest updates
    componentDidMount = () => {
        // console.log("MainSend", this.props.user);

        API.getName( this.props.user).then(response => {

            this.setState({balance: response.data.wallet});

            // console.log(this.state)
        });
    }

    // If the User is typing we keep track of it and set the state with the latest
    captureInput = (event) => {
        // console.log(event.target.name, event.target.value)

        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // Function to be able to send money, first we check with our back-end code and wait for the response
    handleSend = (event) => {
        event.preventDefault();
        // console.log(this.state);

        if (this.state.balance >= this.state.amount && this.state.amount) {
            API.sendMoney({ user: this.props.user, 
                            data: { to: this.state.to,
                                    amount: this.state.amount
                                  }
            }).then(response => {
                // console.log(response);

                if (response.data === "Not Found") {

                    window.Materialize.toast('Invalid Username', 1000);

                } else { window.Materialize.toast('Success', 1000);
                         window.location.reload()
                        }
            })
        } else return window.Materialize.toast('Insufficient Funds', 1000);

    } // handleSend
    
    render() {
        return(
            <div>
                <h1 className="sendTitle">Current Balance: ${this.state.balance}</h1>

                <Row className="sendForm">
                    <Input placeholder="Me" s={5} label="To" onChange={this.captureInput} name="to" />
                    <Input placeholder="$100" type="number" s={5} label="Amount" onChange={this.captureInput} name="amount" />
                    <Button className="sendButton" onClick={this.handleSend}><Icon>done</Icon></Button>
                </Row>
            </div>
        ) // return
    } // render
} // class

export default MainSend;