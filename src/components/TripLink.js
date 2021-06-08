import React from 'react'
import { Link } from 'react-router-dom'

const TripLink = ({trip}) => {
    return (
        <div>
            <Link to={`/trips/${trip.id}`}>
                <h3>{trip.name}</h3>
            </Link>
        </div>
    )
}

export default TripLink
