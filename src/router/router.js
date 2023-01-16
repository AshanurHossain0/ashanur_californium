const express = require("express")
const router = express.Router()
const urlController=require("../controllers/urlShortenController")

router.post("/url/shorten",urlController.shortenUrl)



router.all('*/', (req, res) => {
    res.status(400).send({ status: false, message: " path invalid" })
})

module.exports = router