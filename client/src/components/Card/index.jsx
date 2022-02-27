import React from 'react'
import { Link } from 'react-router-dom';
import style from './Card.module.css'

const Card = ({ name, genres, id, image }) => {
    return (
       
            <article className={style.card}>
                <div className={style.card_title}>
                    <Link to={`../videogame/${id}`}>
                        {<h2>{name}</h2>}
                    </Link>
                </div>
                 
                <img src={image} alt={name} className={style.img} />
                <div className={style.card_genres}>
                    <ul >{genres.map(g =>
                        <li key={g}>{g}</li>
                    )}</ul>

                </div>
            </article>
        
    )
}

export default Card