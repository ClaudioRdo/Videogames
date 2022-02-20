import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {useDispatch} from 'react-redux'; 

import './App.css';

import { getGenres, getVideogames } from './redux/actions';
import Landing from './components/Landing/index';
import Home from './components/Home';
import VideogameDetail from './components/VideogameDetail';
import CreateVideogame from './components/CreateVideogame';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres())
  }, [dispatch])
  

  return (
    
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path ='/videogames' element={<Home/>}/>
        <Route exact path='/videogame/:idVideogame' element={<VideogameDetail/>}/>
        <Route path='/videogame' element={<CreateVideogame/>}/>
      </Routes>
      
      
      
    </div>
  );
}

export default App;
