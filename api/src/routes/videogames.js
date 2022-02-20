const { Router } = require('express');
const { getVideogames} = require('../controllers/controllerVideogames');

const router = Router();

router.get('/',getVideogames);


module.exports= router;