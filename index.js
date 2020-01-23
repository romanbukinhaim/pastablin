const express = require("express");
const expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const moment = require("moment");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

const PastaRouter = require("./routes/PastaRouter.js");
const ApiRouter = require("./routes/ApiRouter.js");
app.use("/api", ApiRouter);
app.use("/", PastaRouter);

let port = 3000;
mongoose.connect("mongodb://localhost:27017/PastaBlin", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(port, function(){
        console.log(`Server started on ${port} port`)
    });
});

app.engine('hbs', expressHbs({
        layoutsDir: 'views/layouts',
        defaultLayout: 'layout',
        extname: 'hbs',
        partialsDir: ["views/partials", "public"],
        helpers: {
            dateFormatUTC: function(date){
                return moment(date).utcOffset(420).format('DD.MM.YYYY HH:mm');
            }
        }
    })
);
app.set('view engine', 'hbs');

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});