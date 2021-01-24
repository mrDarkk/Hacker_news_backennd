const router = require("express").Router();
const news = require('../controllers/news.controller.js');

// dashboard route
router.get("/", (req, res) => {
    res.json({
        error: null,
        data: {
            title: "My dashboard",
            content: "dashboard content",
            user: req.user,
        },
    });
});

// router.get("/", (req, res) => {
//     res.json({
//         error: null,
//         data: {
//             title: "My dashboard",
//             content: "dashboard content",
//             user: req.user,
//         },
//     });
// });

router.post('/addNews', news.create);

router.put('/news/:Id', news.update);

router.delete('/news/:Id', news.delete);

module.exports = router;