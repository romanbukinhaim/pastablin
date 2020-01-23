const Pasta = require("../models/Pasta.js");

exports.getCap = function(request, response){
    Pasta.find({isPublic: true}).sort({timestamp:-1}).limit(5).exec((err, res) => {
        response.send(res.map(e => e.toDTO()));
    })
};