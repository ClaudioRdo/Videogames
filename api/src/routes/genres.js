const { Router } = require('express');
const {getGenres} = require('../controllers/controllerGenres');

const router = Router();

router.get('/', getGenres);

module.exports = router;