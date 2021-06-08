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
        }))
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
        const tripsList = this.state.allTrips.map(tripE => <TripLink key={tripE.id} trip={tripE}/>)

        return (
            <div>
                <h1>Trips Master List ...?</h1>
                <ul>
                    {tripsList}
                </ul>
                {this.state.displayForm ? <TripForm addNewTrip={this.addNewTrip}/>: <button onClick={this.toggleDisplayForm}>Add Trip</button>}
            </div>
        )
    }
}

export default Trips