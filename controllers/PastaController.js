const Pasta = require("../models/Pasta.js");
const moment = require("moment");

exports.addPasta = function(request, response){
    response.render("addPasta");
};

exports.getPasta = function(request, response){
    let link = request.params["link"]
    Pasta.findOne({_id: Pasta.decryptLink(link)}, (err, res) => {
        if (err || !res.isRelevant()) response.status(404).send("Not Found")
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
        if(err) return console.log(err);
        response.redirect(`/pasta/${pasta.encryptLink()}`);
    });
};