import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import Cards from '../Cards';
import Pagination from '../Pagination';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const allVideogames = useSelector(state=>state.filteredVideogames)
    const lastVideogamePerPage = videogamesPerPage * currentPage;
    const firstVideogamePerPage = lastVideogamePerPage - videogamesPerPage;
    const currentsVideogames = allVideogames.slice(firstVideogamePerPage,lastVideogamePerPage);

    const paginate = (e,pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    }
  return (
    <div>
      <Navbar/>
      <Cards videogames={currentsVideogames}/>
      <Pagination 
      videogamesPerPage={videogamesPerPage}
      allVideogames={allVideogames}
      paginate={paginate}
      />
    </div>
  )
}

export default Home