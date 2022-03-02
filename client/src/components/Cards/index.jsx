import React from 'react';
import Card from '../Card';
import style from './Cards.module.css';

const Cards = ({ videogames }) => {
    return (
        <div className={style.cards}>
            {
                videogames.map(v => 
                    <Card 
                    name={v.name} 
                    genres={v.genres}
                    image={v.image} 
                    id={v.id} 
                    key={v.id}/>
                )
            }
        </div>
    )
}

export default Cards