const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: User.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      message: "User Registered Successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      password: user.password,
      token: generateToken(user._id),
      message: "User Logged In Successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// /api/user?search=abc    // search query
exports.getAllUsers = asyncHandler(async (req, res) => {
  const search = req.query.search
    ? //   console.log(search);
      //   res.send(search);
      {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(search).find({ _id: { $ne: req.user._id } })
  res.send(users);
});
