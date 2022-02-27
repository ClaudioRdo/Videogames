import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Home.module.css'
import Navbar from '../Navbar';
import Cards from '../Cards';
import Pagination from '../Pagination';
import { Loading } from '../Loading';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);
  const allVideogames = useSelector(state => state.filteredVideogames)
  const lastVideogamePerPage = videogamesPerPage * currentPage;
  const firstVideogamePerPage = lastVideogamePerPage - videogamesPerPage;
  const currentsVideogames = allVideogames.slice(firstVideogamePerPage, lastVideogamePerPage);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  }
  return (
    <>
      {allVideogames.length ? (
          <div className={style.wrapper}>
            <div className={style.navbar}>
            <Navbar />
            </div>
            <div className={style.cards} >
            <Cards videogames={currentsVideogames} />
            </div>
            <div className={style.pagination}>
            <Pagination
              videogamesPerPage={videogamesPerPage}
              allVideogames={allVideogames}
              paginate={paginate}
            />
            </div>
          </div>
      ) : (
        <Loading/>

      )
      }
    </>
  )
}

export default Home