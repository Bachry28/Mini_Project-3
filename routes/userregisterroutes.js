const express = require("express");
const userregistercontroller = require("../controller/userregistercontroller");
const router = express.Router();
const uploadimage = require ('../multer')


router.post(
  "/register", uploadimage.single('foto'), 
  userregistercontroller.createUserRegister
);

module.exports = router;