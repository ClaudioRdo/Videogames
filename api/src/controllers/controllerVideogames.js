require("dotenv").config();
const axios = require('axios');

const { BASE_URL, GAMES_URL, SEARCH_GAME_URL } = require('../constants');
const { Videogame, Genre, Op } = require("../db");

const { API_KEY } = process.env;

const getVideogames = async (req, res, next) => {

    const { name } = req.query;
    if (!name) {
        try {
            let videogamesApi=[];
            let videogames = await axios.get(`${BASE_URL}${GAMES_URL}?key=${API_KEY}`);
            
            for(let i=0; i < 2; i++ ){
                //videogames.push(await axios.get(videogames.data.next));
                const currentVideogame = videogames.data.results.map(v => {
                    return {
                        id: v.id,
                        name: v.name,
                        image: v.background_image,
                        rating: v.rating,
                        platforms: v.platforms
                            .map(p => p.platform.name),
                        genres: v.genres.map(g => {
                            return g.name
                        })
                    }
                });
                videogamesApi = [...videogamesApi,...currentVideogame];

                videogames = await axios.get(videogames.data.next)
            }
            


            const videogamesDb = await Videogame.findAll({
                attributes: ['id', 'name','rating','platforms'],
                include: [{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            });
            
            res.send([...videogamesApi, ...videogamesDb]);
        } catch (error) {
            next(error)
        }
    } else {
        try {
            const videogames = await axios.get(`${BASE_URL}${SEARCH_GAME_URL}${name}&key=${API_KEY}`);
            const videogamesApi = videogames.data.results.map(v => {
                return {
                    id: v.id,
                    name: v.name,
                    image: v.background_image,
                    rating: v.rating,
                    platforms: v.platforms
                        .map(p => p.platform.name),
                    genres: v.genres.map(g => {
                        return {
                            name: g.name
                        }
                    })
                }
            });

            const videogamesDb = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                },
                attributes: ['id', 'name', 'rating'],
                include: [{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })

            const allVideogames = [...videogamesDb, ...videogamesApi].splice(0,15);

            if (allVideogames.length > 0)
                res.send(allVideogames);
            else
                res.send("The game is not found");

        } catch (error) {
            next(error)
        }
    }

}



module.exports = {
    getVideogames
};
