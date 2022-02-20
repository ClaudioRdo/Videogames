import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ name, genres, id }) => {
    return (
        <Link to={`../videogame/${id}`}>
            <div>
                {name}
                {genres}
            </div>
        </Link>
    )
}

export default Card