import React, { Component } from 'react'

class TripForm extends Component {
    state ={
        name:'',
        country:'',
        city:''
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addNewTrip({
            name: this.state.name,
            country: this.state.country,
            city: this.state.city
        })
    }

    render() {
        return (
            <div>
                <form className="add-new-trip" onSubmit={this.handleSubmit}>
                    <h3>Add New Trip</h3>
                    <input type="text" name="name" value= {this.state.name} placeholder="Name your trip!" onChange={this.handleChange} />
                    <br/>
                    <input type="text" name="country" value={this.state.country} placeholder="Enter the country you're visting" onChange={this.handleChange} />
                    <br/>
                    <input type="text" name="city" value={this.state.city} placeholder="Enter the city you're visting" onChange={this.handleChange} />
                    <br/>
                    <input type="submit" name="submit" value="Submit New Trip" className="submit"/>
                </form>
            </div>
        )
    }
}

export default TripForm
