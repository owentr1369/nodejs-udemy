const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");

const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please upload an image with jpg, jpeg or png format")
      );
    }
    cb(undefined, true);
  },
});

const errorMiddleware = (err, req, res, next) => {
  res.status(500).send({ error: err.message });
};

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();
  try {
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({
      message: "Logged out successfully",
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({
      message: "Logged out from all devices",
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const allowedUpdates = ["name", "email", "age", "password"];
  try {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    const user = await User.findById(req.user._id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }
    req.user.avatar = req.file.buffer;
    await req.user.save();
    // Only send user data that includes avatar if you want to confirm avatar is set
    // But by default, toJSON method in user model removes avatar for security/bandwidth
    // To explicitly include avatar, you can send it separately:
    res.send({ user: req.user, avatar: req.user.avatar });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
