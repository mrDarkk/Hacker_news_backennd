const router = require("express").Router();
const news = require('../controllers/news.controller.js');

// login route
router.post('/addNews', news.create);

router.get('/getNews', news.findAll);

router.get('/news/:Id', news.findOne);

router.put('/news/:Id', news.update);

router.delete('/news/:Id', news.delete);


// app.get('/getAlluser', user.findAll);

module.exports = router;