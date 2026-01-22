const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createdGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatController");


const router = express.Router();

router.route("/").post(protect, accessChat); //done but only 1v1 not group
router.route("/").get(protect, fetchChats); //done
router.route("/group").post(protect, createdGroupChat); //done
router.route("/rename").put(protect, renameGroup); //done
router.route("/groupremove").put(protect, removeFromGroup); //front
router.route("/groupadd").put(protect, addToGroup); //front

module.exports = router;
