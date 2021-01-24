const router = require("express").Router();
const news = require('../controllers/news.controller.js');
const user = require('../controllers/user.controller.js');

// public  route

// register route
router.post("/register", user.register);

// login route
router.post("/login", user.login);

router.get('/getNews', news.findAll);

router.get('/news/:Id', news.findOne);

module.exports = router;