const Pasta = require("../models/Pasta.js");

exports.addPasta = function(request, response){
    response.render("addPasta");
};

exports.getPasta = function(request, response){
    let link = request.params["link"]
    Pasta.findOne({_id: Pasta.decryptLink(link)}, (err, res) => {
        if (err) response.status(404).send("Not Found")
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
        duration: duration, 
        timestamp: new Date()
    });

    pasta.save((err) => {
        if(err) return console.log(err);
        response.redirect(`/pasta/${pasta.encryptLink()}`);
    });
};