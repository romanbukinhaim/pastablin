const Pasta = require("../models/Pasta.js");

exports.getCap = function(request, response){
    Pasta.find({
        isPublic: true,
        validUntil: {$gt: new Date()}
    })
    .sort({timestamp:-1})
    .limit(10)
    .exec((err, res) => {
        response.send(res.map(e => e.toDTO()));
    })
};