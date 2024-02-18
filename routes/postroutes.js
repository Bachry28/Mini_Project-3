const express = require("express");
const router = express.Router()
const uploadimage = require("../multer")

const postcontroller = require ('../controller/postcontroller')

router.get("/", postcontroller.getAllpost)
router.post("/", uploadimage.single('image'),postcontroller.createpost)
router.put("/:id/update",uploadimage.single('image'), postcontroller.updatePost)


router.route("/:id")
.get(postcontroller.getpostById)
.delete(postcontroller.deletePost)

module.exports = router;