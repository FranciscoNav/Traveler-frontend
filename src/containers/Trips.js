import React, { Component } from 'react'
import TripLink from '../components/TripLink'
import TripForm from './TripForm'

class Trips extends Component {
    state = {
        allTrips: [],
        displayForm: false
    }
    
    componentDidMount(){
        fetch('http://localhost:9292/trips')
        .then(response => response.json())
        .then(data => 
          this.setState({
              allTrips: data
            })
        )
    }

    toggleDisplayForm = () => {
        let newBoolean = !this.state.displayForm
        console.log(newBoolean)
        this.setState({
            displayForm: newBoolean
        })
    }

    addNewTrip = (trip) =>{
        fetch('http://localhost:9292/trips',{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body:JSON.stringify(trip)
        })
        .then(resp => resp.json())
        .then(data =>{
            this.setState({
                allTrips:[...this.state.allTrips, data]
            })
        })
        this.toggleDisplayForm()
    }

    render() {
        const tripsList = this.state.allTrips.map(tripE => <TripLink key={tripE.id} trip={tripE} deleteTrip={this.deleteTrip}/>)

        return (
            <div>
                <h1>Master Trips List</h1>
                {tripsList}
                {this.state.displayForm ? <TripForm addNewTrip={this.addNewTrip}/>: <button onClick={this.toggleDisplayForm} className="submit">Add Trip</button>}
            </div>
        )
    }
}

export default Trips