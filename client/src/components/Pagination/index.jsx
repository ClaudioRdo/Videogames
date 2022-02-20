import React from 'react';
import { Button } from '../common';

const Pagination = ({ videogamesPerPage, allVideogames, paginate }) => {

    const pages = []
    const numberOfPages = Math.ceil(allVideogames.length / videogamesPerPage);

    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
    }
   
    return (
        <div>
            <ul>
               
                {
                    pages && 
                    pages.map(p =>(
                        <li key={p}>
                            <Button onClick={(e)=>paginate(e,p)} value={p}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pagination