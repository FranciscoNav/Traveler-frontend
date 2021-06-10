import React, { Component } from 'react'

class ExpenseForm extends Component {
    state ={
        name:'',
        price: 0
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.newExpense({
            name: this.state.name,
            price: this.state.price
        })
    }

    render() {
        return (
            <div>
                <form className="add-new-trip" onSubmit={this.handleSubmit}>
                    <h3>Add New Expense</h3>
                    <input type="text" name="name" value= {this.state.name} placeholder="Expense Name" onChange={this.handleChange} />
                    <br/>
                    <input type="text" name="price" value={this.state.price} placeholder="Enter Cost" onChange={this.handleChange} />
                    <br/>
                    <input type="submit" name="submit" value="Submit New Expense" className="submit"/>
                </form>
            </div>
        )
    }
}

export default ExpenseForm
