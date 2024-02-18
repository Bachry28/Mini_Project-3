const express = require("express");
const userlogincontroller = require('../controller/userlogincontroller')
const router = express.Router();
const uploadimage = require("../multer")
const path = require ('path')


router.post(
  "/login",
  userlogincontroller.createUserLogin
);


module.exports = router;