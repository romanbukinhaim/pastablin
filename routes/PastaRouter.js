const express = require("express");
const PastaController = require("../controllers/PastaController.js");
const PastaRouter = express.Router();

PastaRouter.use("/pasta/search", PastaController.searchPasta);
PastaRouter.use("/postPasta", PastaController.postPasta);
PastaRouter.use("/pasta/:link", PastaController.getPasta);
PastaRouter.use("/", PastaController.addPasta);
 
module.exports = PastaRouter;