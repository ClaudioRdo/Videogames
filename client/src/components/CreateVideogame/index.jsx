import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVideogame } from '../../redux/actions';

const CreateVideogame = () => {

  const videogames = useSelector(state => state.videogames);
  const genres = useSelector(state => state.genres);
  
  const dispatch = useDispatch();

  const [videogame, setVideogame] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: ''
  });

  const [errors, setErrors] = useState({
    name: ''
  })

  const validate = (videogame) => {

  }

  const handleChange = (e) => {
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value
    })

    //validate(videogame);
  };

  const handleSelect = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    setVideogame({
      ...videogame,
      [name]: Array.from(new Set([...videogame[name], val]))
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideogame(videogame));
  };

  const optionGenres = genres.map(g => (
    <option value={g.id} key={g.id}>{g.name}</option>
  ));

  const filter = (key, id) => {
    const filtered = videogame[key].filter(f => f !== id);

    setVideogame({
      ...videogame,
      [key]: filtered
    })
  }

  let allPlatforms = []
  //const testeo = [...videogames].map(t=>console.log(t.platforms));
  const platforms = [...videogames].map(p => Array.isArray(p.platforms)
  ?p.platforms
  :p.platforms.split(','));

  platforms.map(pl =>pl
    .map(p=> !allPlatforms
      .includes(p)
      ? allPlatforms.push(p)
      : false)
    )
    
  //   (p =>!allPlatforms
  //   .includes(p) 
  //   ? allPlatforms.push(p) 
  //   : false)
  
  // )
  
  console.log(allPlatforms)
  const optionsPlatforms = allPlatforms.map(p => (
    <option value={p} key={p}>{p}</option>
  )
  );

  const nameGenres = (id) => {
    const name = genres.filter(g => g.id === Number(id)).map(g => g.name)
    return name
  };





  return (
    <div>
      <h1>Create Videogame</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          placeholder='Enter the name'
          value={videogame.name}
          onChange={handleChange}
          id='name' />

        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          onChange={handleChange}
          id='description'>
        </textarea>

        <label htmlFor='released'>Released Date:</label>
        <input
          type='text'
          placeholder='Enter the date'
          value={videogame.released}
          onChange={handleChange}
          id='released' />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='text'
          placeholder='Enter the rating: 1 to 5'
          value={videogame.rating}
          onChange={handleChange}
          id='rating' />

        <label htmlFor='genres'>Genres:</label>
        <select name='genres' defaultValue={''} onChange={handleSelect} id='genres'>
          <option value='' disabled>Select genres</option>
          {optionGenres}
        </select>

        <label htmlFor='platforms'>Platforms:</label>
        <select name='platforms' defaultValue={''} onChange={handleSelect} id='platforms'>
          <option value='' disabled>Select platforms</option>
          {/*optionsPlatforms*/}
        </select>


        {
          (videogame.name &&
            videogame.description &&
            videogame.platforms.length > 0 &&
            videogame.genres.length > 0) && (
            <div>
              {videogame.name}

              <p>

                Genres:
                {videogame.genres.map(g => (
                  <span key={g}>
                    {nameGenres(g)}
                    <button onClick={() => filter('genres', g)}>
                      x
                    </button>
                  </span>
                ))}
              </p>
              <p>
                Platforms:
                {videogame.platforms.map(p => (
                  <span key={p}>
                    {p}
                    <button onClick={() => filter('platforms', p)}>
                      x
                    </button>
                  </span>
                ))}
              </p>
              <button>Create</button>
            </div>
          )
        }

      </form>
    </div>
  )
}

export default CreateVideogame