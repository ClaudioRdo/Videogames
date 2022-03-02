require('dotenv').config();
const axios = require('axios');
const { BASE_URL, GAMES_URL } = require('../constants');
const { Videogame, Genre } = require('../db');

const { API_KEY } = process.env;

const getVideogameById = async (req, res, next) => {
    const { idVideogame } = req.params;

    try {
        if (idVideogame.length<10) {
            const videogame = await axios.get(`${BASE_URL}${GAMES_URL}/${idVideogame}?key=${API_KEY}`);
            if (videogame.data) {
                const {
                    id,
                    name,
                    description,
                    released,
                    rating,
                    background_image,
                    platforms,
                    genres
                } = videogame.data;

                const platformsVideogame = platforms
                    .map(p => p.platform)
                    .map(p => p.name);

                const genresVideogame = genres.map(g => g.name);

                const detailVideogame = {
                    id,
                    name,
                    description,
                    released,
                    rating,
                    image: background_image,
                    platforms: platformsVideogame,
                    genres: genresVideogame
                }
                
                res.send(detailVideogame)
            } else {
                res.status('404').send('The game is not found');
            }
        } else {
            const videogameDb = await Videogame.findByPk(idVideogame,{
                include: [{
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }],
                // attributes: ['name'],
                //     through: {
                //         attributes: []
                //     }
            }
            );
            res.send(videogameDb);
        }

    } catch (error) {
        next(error);
    }


}

const createVideogame = async (req, res, next) => {
    try {
        const {
            name,
            description,
            released,
            rating,
            genres,
            platforms
        } = req.body;

        const findVideogame = await Videogame.findOne({
            where: {
                name: name
            }
        });
        
        let pl = platforms.toString();
        
        //consultar  si existe  videojueego en api 
        if (!findVideogame) {
            const create = await Videogame.create({
                name,
                description,
                released,
                rating,
                platforms: pl
            })

            const addVideogame = await create.addGenre(genres);

            res.send(addVideogame);
        } else {
            res.send("The videogame already exist");
        }

    } catch (error) {
        next(error)
    }
}

module.exports = { getVideogameById, createVideogame };

