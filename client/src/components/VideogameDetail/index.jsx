import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { clearVideogameDetail, getVideogameById } from '../../redux/actions';

const DetailVideogame = () => {
    const { idVideogame } = useParams();
    const dispatch = useDispatch();

    const detailVideogame = useSelector(state => state.videogameDetail);

    useEffect(() => {
        dispatch(getVideogameById(idVideogame))
        return () => {
            dispatch(clearVideogameDetail())
        }
    }, [dispatch, idVideogame])

    return (
        <div>
            {
                detailVideogame && (
                    <h1>{detailVideogame.name}</h1>

                )
            }
        </div>
    )
}

export default DetailVideogame