const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const userController= require("../controllers/userController")
const productController= require("../controllers/productController")
const commonMW = require ("../middlewares/commonMiddlewares")
const checkMW=require('../middlewares/checkOrder')
const orderController=require('../controllers/orderController')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createProduct",productController.createProduct)
router.post("/createUser",commonMW.headerValidation,userController.createUser)
router.post("/orderPurchase",checkMW.addFreeUser,commonMW.headerValidation,orderController.orderPurchase)


module.exports = router;