const News = require('../model/news.model');

exports.create = (req, res) => {

    // creat a notes
    const news = new News({
        heading: req.body.heading,
        content: req.body.content,
        URL: req.body.URL,
        email: req.body.email
    });

    // Save news in database
    news.save()
        .then(data => {
            res.send(news);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while"
            });
        });
};

exports.findAll = (req, res) => {
    News.find()
        .then(news => {
            res.send(news);
            //console.log(news);
            // res.render('home', { news: news });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while"
            });
        });
};

exports.findOne = (req, res) => {
    News.findById(req.params.Id)
        .then(news => {
            if (!news) {
                return res.status(404).send({
                    message: "News not found with id " + req.params.Id
                });
            }
            res.send(news);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "News not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving News with id " + req.params.Id
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "News content can not be empty"
        });
    }

    // Find note and update it with the request body
    News.findByIdAndUpdate(req.params.Id, {
            heading: req.body.heading,
            content: req.body.content,
            URL: req.body.URL,
            email: req.body.email
        }, { new: true })
        .then(news => {
            if (!news) {
                return res.status(404).send({
                    message: "News not found with id " + req.params.Id
                });
            }
            res.send(news);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "news not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error updating news with id " + req.params.Id
            });
        });
};

exports.delete = (req, res) => {
    News.findByIdAndRemove(req.params.Id)
        .then(news => {
            if (!news) {
                return res.status(404).send({
                    message: "news not found with id " + req.params.Id
                });
            }
            res.send({ message: "news deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "news not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.Id
            });
        });
};