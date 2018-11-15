import React, { Component } from "react";
import { Table, Row, Input, Button, Icon } from "react-materialize";
import API from "../../API/API.js";

class MainSpecial extends Component {

    state = {
        goal: "vacations",
        title: "",
        amount: "",
        special: [],
        total: 0
    }

    componentDidMount = () => {
        // console.log("MainSpecial", this.props.user);

        API.getName(this.props.user).then(response => {
            let special = [];
            let total = 0

            response.data.special.forEach((item) => {
                special.push(item);
                total += item.amount;
            })

            this.setState({special: special,
                           total: total
            });

            // console.log(this.state)
        });

    }
    
    captureInput = (event) => {
        // console.log(event.target.name, event.target.value)

        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleNewSpecial = (event) => {
        event.preventDefault();
        // console.log(this.state);

        if (this.state.title && this.state.amount) {
            API.addNewSpecial({user: this.props.user, 
                newItem: {goal: this.state.goal,
                          title: this.state.title,
                          amount: this.state.amount }
            }).then(response => {
                // console.log(response);
                window.location.reload();
            });
        } else return window.Materialize.toast('Information Missing', 1000);
        
    }

    render() {
        return(
            <div>
                <h1 className="specialTitle">Goal: (Vacations, New Car, New House)</h1>

                <Row>
                    <Table className="striped specialTable">
                        <thead>
                            <tr>
                                <th data-field="targetName">Name</th>
                                <th data-field="targetAmount">Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.special ? this.state.special.map(function(item, index) {                      
                                return (<tr key={index++} className="deleteOption" onClick={event => {
                                    event.preventDefault();
        
                                    // console.log("Clicked", item._id);
                                    let data = {_id: item._id};
                                        API.deleteSpecial(data).then(window.location.reload());
                                    }
                                }><td>{item.title} <Icon tiny>delete_forever</Icon></td><td>${item.amount}</td></tr>)
                            }) : <div></div>}
                        </tbody>
                    </Table>
                </Row>

                <Row className="specialForm">
                    <Input placeholder="Hotel" s={5} label="Name" onChange={this.captureInput} name="title" />
                    <Input placeholder="$1000" type="number" s={5} label="Amount" onChange={this.captureInput} name="amount" />
                    <Button className="addSpecial" onClick={this.handleNewSpecial}><Icon>done</Icon></Button>
                </Row>

                <h2 className="specialTarget">Your Target: ${this.state.total}</h2>
            </div>
        )
    }
}

export default MainSpecial;