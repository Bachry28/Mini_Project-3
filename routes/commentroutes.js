const express = require("express");
const router = express.Router()

const commentcontroller = require ("../controller/commentcontroller")

router.get("/", commentcontroller.getAllcomment)
router.post("/", commentcontroller.createcomment)
router.put("/:id/update", commentcontroller.updatecomment)


router.route("/:id")
.get(commentcontroller.getcommentById)
.delete(commentcontroller.deletecomment)

module.exports = router;