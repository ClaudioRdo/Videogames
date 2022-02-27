import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { filterByCurrentsVideogames, filteredVideogames, getVideogameByName, orderVideogames } from '../../redux/actions';
import { Button, InputText, Label, Select } from '../common'
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar = () => {

  const [searchValue, setSearchValue] = useState();
  const [genresValues, setGenresValues] = useState([]);

  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);

  const order = ['Ascending', 'Descending'];
  const currentsVideogames = ['Api', 'DataBase']

  const optionGenres = genres.map(g => (
    <option value={g.name} key={g.id}>{g.name}</option>
  ));

  const filterByGenre = (e) => {
    let key = e.target.name;
    let values = e.target.value;

    setGenresValues([...genresValues, values]);

    //******* PREGUNTAR GENRESVALUES *******/
    dispatch(filteredVideogames(key, [...genresValues, values]));
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

  const handleChangeInputText = (e) => {

    setSearchValue(e.target.value)
  }

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getVideogameByName(searchValue));
  }

  return (
    <nav className={style.nav}>
      <div>{genresValues}</div>
      <form onSubmit={searchHandler}>
        <Label value='Name:' id='search' />
        <InputText
          placeholder={'Name of videogame'}
          onChange={handleChangeInputText}
          id='search' />
        <Button value='Search' />
      </form>
      <label htmlFor='genres'>Genres:</label>
      <select name='genres' defaultValue={''} onChange={filterByGenre} id='genres'>
        <option value='' disabled>Select genres</option>
        {optionGenres}
      </select>

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