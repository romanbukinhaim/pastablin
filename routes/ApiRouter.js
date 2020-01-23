const express = require("express");
const ApiController = require("../controllers/ApiController.js");
const ApiRouter = express.Router();

ApiRouter.use("/get-cap-pasta", ApiController.getCap);
 
module.exports = ApiRouter;