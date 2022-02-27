import axios from 'axios';

import { constantsFront } from '../../constants';
import {
    CLEAR_VIDEOGAME_DETAIL,
    FILTERED_VIDEOGAMES, 
    FILTER_CURRENT_VIDEOGAMES, 
    GET_GENRES, 
    GET_VIDEOGAMES, 
    GET_VIDEOGAME_BY_ID, 
    GET_VIDEOGAME_BY_NAME, 
    ORDER_VIDEOGAMES,
    CREATE_VIDEOGAME
} from './actionsTypes';

export const getVideogames = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(constantsFront.GET_VIDEOGAMES);
            return dispatch ({type: GET_VIDEOGAMES, payload: res.data});
        } catch (error) {
            console.log(error)
        }
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(constantsFront.GET_GENRES);
            dispatch ({type: GET_GENRES, payload: res.data});
        } catch (error) {
            console.log(error)
        }
    }
}

export const getVideogameById = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${constantsFront.GET_VIDEOGAME}/${id}`);
            dispatch ({type: GET_VIDEOGAME_BY_ID, payload: res.data});
        } catch (error) {
            console.log(error)
        }
    }
}

export const getVideogameByName = (name) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${constantsFront.GET_VIDEOGAMES}/?name=${name}`);
            dispatch({type: GET_VIDEOGAME_BY_NAME,payload:res.data});
        } catch (error) {
            console.log(error)
        }
    }
}

export const filteredVideogames = (key, values) => {
    
    return {
        type: FILTERED_VIDEOGAMES,
        payload: {
            key,
            values
        }
    }
}

export const filterByCurrentsVideogames = (key,value) => {
    return {
        type: FILTER_CURRENT_VIDEOGAMES,
        payload: {
            key,
            value
        }
    }
}

export const orderVideogames = (key, order) => {
    return {
        type: ORDER_VIDEOGAMES,
        payload: {
            key,
            order
        }
    }
}

export const clearVideogameDetail = () => {
    return {
        type: CLEAR_VIDEOGAME_DETAIL
    }
}

export const createVideogame = (videogame) => {
    return async (dispatch) => {
       try {
           const res = axios.post(`${constantsFront.GET_VIDEOGAME}`, videogame);
           dispatch({type: CREATE_VIDEOGAME, payload: res.data})
       } catch (error) {
           console.log(error)
       }
    }
}