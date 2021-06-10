import React, { Component } from 'react'

// this is the EDIT form!!!!!!
class ExpenseEditForm extends Component {
    state ={
        id: null,
        name: '',
        price: 0 
    }

    componentDidMount(){
        this.setState({
            id: this.props.expense.id,
            name: this.props.expense.name,
            price: this.props.expense.price
        })
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.editTheExp(this.state)
        this.props.toggleExpForm()
    }

    render() {
        return (
            <div>
                <form className="add-new-trip" onSubmit={this.handleSubmit}>
                    <h3>Edit Expense</h3>
                    <input type="text" name="name" value= {this.state.name} placeholder="Edit Name" onChange={this.handleChange} />
                    <br/>
                    <input type="text" name="price" value={this.state.price} placeholder="Edit Cost" onChange={this.handleChange} />
                    <br/>
                    <input type="submit" name="submit" value="Submit Change" className="submit"/>
                </form>
            </div>
        )
    }
}
export default ExpenseEditForm