require('dotenv').config();
const axios = require('axios');
const { BASE_URL, GENRES_URL } = require('../constants');
const { Genre } = require('../db');

const { API_KEY } = process.env;

const getGenres = async (req,res,next) => {
    try {
        const findGenre = await Genre.findAll();
        if(findGenre.length<1){
            const genresApi = await axios.get(`${BASE_URL}${GENRES_URL}?key=${API_KEY}`);
            const genres = genresApi.data.results.map(g=>{
                return {name: g.name}
            });
    
            const addGenre = await Genre.bulkCreate(genres)
            res.send(addGenre)

        }else{
            res.send(findGenre)
        }

        
       
        
    } catch (error) {
        next(error)
    }
}

module.exports = {getGenres};