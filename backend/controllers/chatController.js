const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not send with request");
        return res.sendStatus(400);

    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $eleMatch: { $eq: req.user._id } } },
            { users: { $eleMatch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createChat = await Chat.create(ChatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "password");

            res.send(200).send(FullChat);
        } catch (error) {
            res.send(400);
            throw new Error(error.message);
        }
    }
});

module.exports = { accessChat };