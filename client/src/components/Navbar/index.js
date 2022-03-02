import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { filterByCurrentsVideogames, filteredVideogames, getVideogameByName, orderVideogames } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar = ({setCurrentPage}) => {

  const [searchValue, setSearchValue] = useState();
  const [genresValues, setGenresValues] = useState([]);

  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);

  const order = ['Select Order','Ascending', 'Descending'];
  const currentsVideogames = ['Select Origin','All','Api', 'DataBase']

  const optionGenres = genres.map(g => (
    <option value={g.name} key={g.id}>{g.name}</option>
  ));

  const optionApiDatabase = currentsVideogames.map(op => (
    <option value={op} key={op}>{op}</option>
  ));

  const optionOrders = order.map(op=>(
    <option value={op} key={op}>{op}</option>
  ))

  const filterByGenre = (e) => {
    setCurrentPage(1)
    let key = e.target.name;
    let values = e.target.value;

    setGenresValues([...genresValues, values]);

    //******* PREGUNTAR GENRESVALUES *******/
    dispatch(filteredVideogames(key, [...genresValues, values]));
  }

  const filterApiDatabase = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    value==='All'&& setGenresValues([])
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
      <form onSubmit={searchHandler} className={style.formNav}>
        <label htmlFor='search'>Name:</label>
        <input type='text' 
        onChange={handleChangeInputText}
        id='search'
        placeholder='Name of videogame'
        autoComplete='off'/>
        <button>Search</button>
      </form>
      <label htmlFor='genres'>Genres:</label>
      <select name='genres' defaultValue={''} onChange={filterByGenre} id='genres' className={style.selectNav}>
        <option value='' >Select Genres</option>
        {optionGenres}
      </select>

      <label htmlFor='filterByOrigin'>Filter By videogame existent:</label>
      <select name='id' onChange={filterApiDatabase} className={style.selectNav} id='filterByOrigin'>
        {optionApiDatabase}
      </select>

      <label htmlFor='rating'>Order by Rating:</label>
      <select name='rating' onChange={sortVideogames} className={style.selectNav}>
        {optionOrders}
      </select>

      <label htmlFor='name'>Order by Name:</label>
      <select name='name' onChange={sortVideogames} className={style.selectNav} id='name'>
        {optionOrders}
      </select>
      <Link to={'../videogame'}>
        <button className={style.buttonNav}>Create Videogame</button>
      </Link>
    </nav>
  )
}

export default Navbar