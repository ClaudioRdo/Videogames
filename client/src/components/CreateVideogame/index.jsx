import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { validateDate, validateName, validateRating, validateDescription } from '../../helpers/validations';
import { createVideogame, getVideogames } from '../../redux/actions';
import style from './CreateVideogame.module.css';

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
        name: '',
        rating: '',
        released: '',
        description: ''
    })

    const [button, setButton] = useState(true);

    useEffect(() => {
        videogame.name
            && videogame.description
            && videogame.platforms.length > 0
            && videogame.genres.length > 0
            && Object.keys(errors.rating).length === 0
            && Object.keys(errors.description).length === 0
            && Object.keys(errors.name).length===0
            && Object.keys(errors.released).length === 0
            ? setButton(false)
            : setButton(true)
    }, [videogame, errors])

    const handleChange = (e) => {
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'name')
            setErrors({
                ...errors,
                name: validateName(e.target.value)
            });

        if (e.target.name === 'rating')
            setErrors({
                ...errors,
                rating: validateRating(e.target.value)
            })

        if (e.target.name === 'released') {
            setErrors({
                ...errors,
                released: validateDate(e.target.value)
            })
        }

        if (e.target.name === 'description') {
            setErrors({
                ...errors,
                description: validateDescription(e.target.value)
            })
        }

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
        setVideogame({
            name: '',
            rating: '',
            released: '',
            description: '',
            genres: [],
            platforms: ''
        });
        dispatch(getVideogames());
        alert('Videogame created')
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
        ? p.platforms
        : p.platforms.split(','));

    platforms.map(pl => pl
        .map(p => !allPlatforms
            .includes(p)
            ? allPlatforms.push(p)
            : false)
    )


    const optionsPlatforms = allPlatforms.map(p => (
        <option value={p} key={p}>{p}</option>
    )
    );

    const nameGenres = (id) => {
        const name = genres.filter(g => g.id === Number(id)).map(g => g.name)
        return name
    };

    return (
        <div className={style.wrapper}>
            <h2>CREATE VIDEOGAME</h2>
            <form onSubmit={handleSubmit} className={style.formCreate}>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    name='name'
                    placeholder='Enter the name'
                    value={videogame.name}
                    onChange={handleChange}
                    id='name'
                />
                {errors.name.length === 0 && videogame.name.length === 0 && (
                    <span className={style.warning}>*Name is required</span>
                )}
                {errors.name.length > 0 && (<span className={style.danger}>{errors.name}</span>)}

                <label htmlFor='description'>Description:</label>
                <textarea
                    name='description'
                    onChange={handleChange}
                    value={videogame.description}
                    id='description'>
                </textarea>
                {errors.description.length === 0 && videogame.description.length === 0 && (
                    <span className={style.warning}>*Description is required</span>
                )}
                {errors.description.length > 0 && (<span className={style.danger}>{errors.description}</span>)}
                <label htmlFor='released'>Released Date:</label>
                <input
                    type='text'
                    name='released'
                    placeholder='Enter the date'
                    value={videogame.released}
                    onChange={handleChange}
                    id='released' />
                {errors.released.length > 0 && (<span className={style.danger}>{errors.released}</span>)}

                <label htmlFor='rating'>Rating:</label>
                <input
                    type='text'
                    name='rating'
                    placeholder='Enter the rating: 1 to 5'
                    value={videogame.rating}
                    onChange={handleChange}
                    id='rating' />
                {errors.rating.length > 0 && (<span className={style.danger}>{errors.rating}</span>)}
                <label htmlFor='genres'>Genres:</label>
                <select name='genres' defaultValue={''} onChange={handleSelect} id='genres'>
                    <option value=''>Select Genres</option>
                    {optionGenres}
                </select>
                {videogame.genres.length === 0 && (<span className={style.warning}>Select at least 1 genre</span>)}
                <label htmlFor='platforms'>Platforms:</label>
                <select name='platforms' defaultValue={'All'} onChange={handleSelect} id='platforms'>
                    <option value=''>Select platforms</option>
                    {optionsPlatforms}
                </select>
                {videogame.platforms.length === 0 && (<span className={style.warning}>Select at least 1 platform</span>)}

                <button disabled={button}> Create</button>
            </form>

            {
                (videogame.name &&
                    videogame.description &&
                    videogame.platforms.length > 0 &&
                    videogame.genres.length > 0) && (
                    <div className={style.created}>
                        <h3>{videogame.name}</h3>
                        <p>Description: 
                        <span>{videogame.description}</span>
                        </p>
                        <p>Release date: 
                        <span>{videogame.released}</span>
                        </p>
                        <p>Rating: 
                        <span>{videogame.rating}</span>
                        </p>

                        <p>Genres: 
                            {videogame.genres.map(g => (
                                <span key={g}>
                                    {nameGenres(g)}
                                    <button onClick={() => filter('genres', g)}>
                                        x
                                    </button>
                                </span>
                            ))}
                        </p>

                        <p>Platforms: 
                            {videogame.platforms.map(p => (
                                <span key={p}>
                                    {p}
                                    <button onClick={() => filter('platforms', p)}>
                                        x
                                    </button>
                                </span>
                            ))}
                        </p>


                    </div>
                )
            }
        </div>
    )
}

export default CreateVideogame