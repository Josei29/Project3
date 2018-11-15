import React, { Component } from "react";
import { Table, Row, Input, Button, Icon } from "react-materialize";
import { Doughnut } from 'react-chartjs-2';
import API from "../../API/API.js";

class MainBudget extends Component {
    
    state = {
        type: "",
        title: "",
        amount: 0,
        expenses: [],
        earnings: [],
        expensesTotal: 0,
        earningsTotal: 0
    }

    componentDidMount = () => {
        // console.log("MainBudget user", this.props.user)
        API.getName( this.props.user ).then(response => {
            let expenses = [];
            let earnings = [];
            let expensesTotal = 0;
            let earningsTotal = 0;

            response.data.budget.forEach((item) => {
                if (item.type === "expenses") {
                    expenses.push(item);
                    expensesTotal += item.amount;
                }
                else {
                    earnings.push(item);
                    earningsTotal += item.amount;
                }
            })

            this.setState({earnings: earnings,
                           expenses: expenses,
                           expensesTotal: expensesTotal,
                           earningsTotal: earningsTotal 
            });
        });
    }

    captureInput = (event) => {
        // console.log(event.target.name, event.target.value)

        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleNewItem = (event) => {
        event.preventDefault();
        // console.log(this.state);

        if (this.state.title && this.state.amount) {
            API.addNewItem({user:this.props.user, newItem:this.state}).then(response => {
                // console.log(response);
                window.location.reload();
            });
        } else return window.Materialize.toast('Information Missing', 1000)
    }

    render() {
        return(
            <div>
            <Row>
            <Table className="striped budgetTable firstTable">
                <thead>
                    <tr>
                    <th data-field="expenses">Expenses</th>
                    <th data-field="expensesAmount">Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.expenses ? this.state.expenses.map(function(item, index) {                      
                        return (<tr key={index++} className="deleteOption" onClick={event => {
                            event.preventDefault();

                            // console.log("Clicked", item._id);
                            let data = {_id: item._id};
                                API.deleteBudget(data).then(window.location.reload());
                            }
                        }><td>{item.title} <Icon tiny>delete_forever</Icon></td><td>${item.amount}</td></tr>)
                    }) : <div></div>}
                    <tr><td>Total</td><td>${this.state.expensesTotal}</td></tr>
                </tbody>
            </Table>

            <Table className="striped budgetTable">
                <thead>
                    <tr>
                    <th data-field="earnings">Earnings</th>
                    <th data-field="earningsAmount">Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.earnings ? this.state.earnings.map(function(item, index) {                      
                        return (<tr className="deleteOption" key={index++} onClick={event => {
                                event.preventDefault();

                                // console.log("Clicked", item._id);
                                let data = {_id: item._id};
                                    API.deleteBudget(data).then(window.location.reload());
                                }
                        }><td>{item.title} <Icon tiny>delete_forever</Icon></td><td>${item.amount}</td></tr>)
                    }) : <div></div>}
                    <tr><td>Total</td><td>${this.state.earningsTotal}</td></tr>
                </tbody>
            </Table>
            </Row>

            <Row>
            <Input s={2} type='select' label="Add" defaultValue='1' onChange={this.captureInput} name="type">
                <option value='1'>Earnings</option>
                <option value='2'>Expenses</option>
            </Input>
            <Input placeholder="Lottery Ticket" s={6} label="Title" onChange={this.captureInput} name="title" />
            <Input placeholder="$1000000" s={2} type="number" label="Amount" onChange={this.captureInput} name="amount" />
            <Button className="addBudget" onClick={this.handleNewItem}><Icon>done</Icon></Button>
            </Row>
            <h2 className="chartTitle">Yearly Projection</h2>
            <Doughnut data={{
                        labels: ["Expenses", "Earnings"],
                        datasets: [{
                            label: 'Yearly Projection',
                            data: [this.state.expensesTotal*12, this.state.earningsTotal*12],
                            backgroundColor: [
                                'rgba(255, 51, 0)',
                                '#5085A5',
                            ],
                            borderColor: [
                                'rgba(255, 51, 0)',
                                '#5085A5',
                            ],
                            borderWidth: 1
                        }]
                    }}
            />
            </div>
        ) // return
    } // render

} // class

export default MainBudget;