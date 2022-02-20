import React from 'react';
import Card from '../Card';

const Cards = ({ videogames }) => {
    return (
        <div>
            {
                videogames.map(v => 
                    <Card name={v.name} genres={v.genres} id={v.id} key={v.id}/>
                )
            }
        </div>
    )
}

export default Cards