import React from 'react'
import { Link } from 'react-router-dom'

const TripLink = ({trip}) => {
    
    return (
        <div className='trip-card'>
            <Link to={`/trips/${trip.id}`}>
                <h3>{trip.name}</h3>
            </Link>
            <p1>Destination Country: {trip.country}</p1>
            <p>Destination City: {trip.city}</p>
        </div>
    )
}

export default TripLink
