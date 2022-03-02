import React from 'react';
import style from './Pagination.module.css'

const Pagination = ({ videogamesPerPage, allVideogames, paginate }) => {

    const pages = []
    const numberOfPages = Math.ceil(allVideogames.length / videogamesPerPage);

    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
    }
   
    return (
        <div className={style.pagination}>
            <ul >
               
                {
                    pages.length>1 && 
                    pages.map(p =>(
                        <li key={p}>
                            <button onClick={(e)=>paginate(e,p)}>
                                {p}
                            </button>    
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pagination