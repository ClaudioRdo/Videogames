import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css'



const Landing = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Henry Videogames</h1>
        <Link to='/videogames'>
            <button>Enter</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing