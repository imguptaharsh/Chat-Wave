const asyncHandler = require("express-async-handler");
const Chats = require("../models/chat");
const User = require("../models/user");
exports.accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // const chat=Chats.find((p)=>p.id===userId);
  console.log("userId");
  if (!userId) {
    console.log("UserId param not sent with request");
    res.sendStatus(400);
    throw new Error("User not found");
  }

  var isChat = await Chats.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
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
      const createdChat = await Chats.create(chatData);

      const FullChat = await Chats.findById({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(200).send(FullChat);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
      throw new Error(e.message);
    }
  }
});

exports.fetchChats = asyncHandler(async (req, res) => {
  try {
    Chats.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    throw new Error(e.message);
  }
});

exports.createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    console.log("Users param not sent with request");
    return res.sendStatus(400).send({ message: "Please Fill all the fields" });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send({ message: "Please add more than 2 users" });
  }
  users.push(req.users);
  try {
    const groupChat = await Chats.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.users,
    });
    const fullGroupChat = await Chats.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    throw new Error(e.message);
  }
});

exports.renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chats.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

exports.addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check weather user already added or not
  const chat = await Chats.findOne({ _id: chatId, users: { $in: [userId] } }); // to check users is there

  if (chat) {
    res.status(400);
    throw new Error("user is alrady member of the chat group");
  }
  const added = await Chats.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400);
    throw new Error("Chat is not found");
  } else {
    res.json(added);
  }
});

exports.removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chats.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(400);
    throw new Error("Chat is not found");
  } else {
    res.json(removed);
  }
});
