const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller.js")

router.post("/createAuthor",controller.createAuthor);
router.post("/createPublisher",controller.createPublisher);
router.post("/createBook",controller.createBook);
router.get("/getBook",controller.getBook);
router.put("/updateCover",controller.updateCover);
router.put("/updatePrice",controller.updatePrice);


module.exports = router;