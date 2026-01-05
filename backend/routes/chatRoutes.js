const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createdGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatController");


const router = express.Router();

router.route("/").post(protect, accessChat); //frontend
router.route("/").get(protect, fetchChats); //done
router.route("/group").post(protect, createdGroupChat); //front 
router.route("/rename").put(protect, renameGroup); //front
router.route("/groupremove").put(protect, removeFromGroup); //front
router.route("/groupadd").put(protect, addToGroup); //front

module.exports = router;
