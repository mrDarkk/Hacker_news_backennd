const router = require("express").Router();
const news = require('../controllers/news.controller.js');
const user = require('../controllers/user.controller.js');

// register route
router.post("/register", user.register);

// login route
router.post("/login", user.login);

// login route
// router.post('/addNews', news.create);

router.get('/getNews', news.findAll);

router.get('/news/:Id', news.findOne);

// router.put('/news/:Id', news.update);

// router.delete('/news/:Id', news.delete);


// app.get('/getAlluser', user.findAll);

module.exports = router;