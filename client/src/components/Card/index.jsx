import React from 'react'
import { Link } from 'react-router-dom';
import style from './Card.module.css'
import notImg from '../../assets/noimage.png';

const Card = ({ name, genres, id, image }) => {

    return (
        <Link to={`../videogame/${id}`}>
            <article className={style.card}>
                {<h2 className={style.card_title}>{name}</h2>}
                <img src={image || notImg} alt={name} className={style.img} />
                <div className={style.card_genres}>
                    <ul >{genres.map(g =>
                        <li key={g}>{g}</li>
                    )}</ul>
                </div>
            </article>
        </Link>

    )
}

export default Card