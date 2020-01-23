const Pasta = require("../models/Pasta.js");
const moment = require("moment");

exports.addPasta = function(request, response){
    response.render("addPasta");
};

exports.searchPasta = function(request, response){
    let words = request.query.words;
    Pasta.find({ $text: { $search: words }, validUntil: {$gt: new Date()}, isPublic: true}, (err, res) => {
        response.render("searchePasta", {
            search_result: res.map(e => e.toDTO()),
            words: words
        });
    })
};

exports.getPasta = function(request, response){
    let link = request.params["link"]
    Pasta.findOne({_id: Pasta.decryptLink(link), validUntil: {$gt: new Date()}}, (err, res) => {
        if (err || !res) response.status(404).send("Not Found")
        else response.render("pasta", res);
    })
}

exports.postPasta = function(request, response){
    if(!request.body) return response.sendStatus(400);
    const title = request.body.title;
    const text = request.body.text;
    const isPublic = request.body.isPublic == "on" ? true : false;
    const duration = request.body.duration;
    const pasta = new Pasta({
        title: title, 
        text: text, 
        isPublic: isPublic,
        timestamp: new Date(),
        validUntil: duration > 0 ? moment().add(duration, "minutes") : null
    });

    pasta.save((err) => {
        if(err) response.status(400).send(err.message);
        else response.redirect(`/pasta/${pasta.encryptLink()}`);
    });
};