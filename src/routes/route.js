const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook",controller.createBook)
router.post("/createAuthor",controller.createAuthor)
router.get("/getBhagatBooks",controller.getBhagatBooks)
router.get("/findAuthorAndUpdatePrice",controller.findAuthorAndUpdatePrice)
router.get("/getAuthors",controller.getAuthors)

module.exports = router;