import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common';


const Landing = () => {
  return (
    <div>
        <h1>Henry Videogames</h1>
        <Link to='/videogames'>
            <Button value={'Enter'}/>
        </Link>
    </div>
  )
}

export default Landing