import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { filterByCurrentsVideogames, filteredVideogames, getVideogameByName, orderVideogames } from '../../redux/actions';
import { Button, InputText, Label, Select } from '../common'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [searchValue, setSearchValue] = useState();
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);


  const order = ['Ascending', 'Descending'];
  const currentsVideogames = ['Api', 'DataBase']
  const genresSelect = genres;

  const filterByGenre = (e) => {
    let key = e.target.name;
    let values = e.target.value;
    // console.log(key);
    // console.log(values)
    dispatch(filteredVideogames(key, values));
  }

  const filterApiDatabase = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    dispatch(filterByCurrentsVideogames(key, value))
  }

  const sortVideogames = (e) => {
    let key = e.target.name;
    let order = e.target.value;
    dispatch(orderVideogames(key, order))
  }

  const handleChange = (e) => {

    setSearchValue(e.target.value)
  }

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getVideogameByName(searchValue));
  }

  return (
    <nav>
      <form onSubmit={searchHandler}>
        <Label value='Name:' id='search'/>
        <InputText
          placeholder={'Name of videogame'}
          onChange={handleChange}
          id='search' />
        <Button value='Search' />
      </form>

      <span>Filter by Genre:</span>
      <Select
        name='genres'
        options={genresSelect}
        optionDefault={'All'}
        onChange={filterByGenre} />

      <span>Filter By videogame existent:</span>
      <Select
        name='id'
        options={currentsVideogames}
        optionDefault={'All'}
        onChange={filterApiDatabase} />

      <span>Order by Rating:</span>
      <Select name='rating' options={order} onChange={sortVideogames} />

      <span>Order by Name:</span>
      <Select name='name' options={order} onChange={sortVideogames} />
      <Link to={'../videogame'}>
        <Button value='Create Videogame' />
      </Link>
    </nav>
  )
}

export default Navbar