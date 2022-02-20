const {Router} = require('express');
const { getVideogameById, createVideogame } = require('../controllers/controllerVideogame');

const router = Router();

router.get('/:idVideogame',getVideogameById);
router.post('/',createVideogame);

module.exports= router;