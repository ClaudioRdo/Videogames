import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { clearVideogameDetail, getVideogameById } from '../../redux/actions';
import notImg from '../../assets/noimage.png'
import { Loading } from '../Loading';
import style from './VideogameDetail.module.css'

const DetailVideogame = () => {
    const { idVideogame } = useParams();
    const dispatch = useDispatch();

    const detailVideogame = useSelector(state => state.videogameDetail);

    useEffect(() => {
        dispatch(getVideogameById(idVideogame))
        return () => {
            dispatch(clearVideogameDetail())
        }
    }, [dispatch, idVideogame]);



    return (

        <>
            {
                Object.keys(detailVideogame).length ? (
                    <div className={style.wrapper}>
                        <h2>{detailVideogame.name}</h2>
                        <img src={detailVideogame.image || notImg} alt={detailVideogame.name} className={style.img}/>
                        <p> Description:</p><span className={style.span}>{detailVideogame.description}</span>
                        <p>Realease date:</p><span className={style.span} >{detailVideogame.released}</span>
                        <p>Rating:</p><span className={style.span}>{detailVideogame.rating}</span>
                        <p>Genres:</p>
                            <ul>{detailVideogame.genres.map(g => (
                                <li key={g}>{g}</li>
                            )
                            )}
                            </ul>
                        <p>Platforms:</p>
                            <ul>
                                {detailVideogame.platforms.map(p=>(
                                    <li key={p}>{p}</li>
                                ))}
                            </ul>
                        

                    </div>

                ) : (
                    <Loading />
                )
            }
        </>
    )
}

export default DetailVideogame