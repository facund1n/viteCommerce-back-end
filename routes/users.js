const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

router
  .get("/users", async (req, res) => {
    try {
      const allUsers = await Users.find();
      res.status(200).send(allUsers);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .post("/login", async (req, res) => {
    const { body } = req;

    const emailMatches = await Users.findOne({
      email: body.email,
    });

    const unHashPassword = await bcrypt.compare(
      body.password,
      emailMatches.password
    );

    if (emailMatches && unHashPassword) {
      try {
        const jwtToken = jwt.sign(
          {
            id: emailMatches._id,
            email: emailMatches.email,
            name: emailMatches.name,
            phone: emailMatches.phone,
          },
          process.env.JWT_SECRET
        );
        res.json({
          message: "Logged in, redirecting...",
          name: emailMatches.name,
          token: jwtToken,
        });
      } catch (error) {
        res.status(404).json({ message: error });
      }
    } else {
      return res.status(404).json({ message: "incorrect credentials" });
    }
  })
  .post("/register", async (req, res) => {
    const { body } = req;

    const emailAlreadyExist = await Users.findOne({
      email: body.email,
    });

    const phoneAlreadyExist = await Users.findOne({
      phone: body.phone,
    });

    // ver si luego separamos las validaciones,
    if (emailAlreadyExist || phoneAlreadyExist) {
      return res
        .status(404)
        .json({ message: "email o phone already registered" });
    } else {
      // bcrypt:
      const salt = await bcrypt.genSalt(6);
      const encryptedPassword = await bcrypt.hash(body.password, salt);

      try {
        const newUser = new Users({
          name: body.name,
          email: body.email,
          password: encryptedPassword,
          phone: body.phone,
          isAdmin: false,
        });
        await newUser.save();
        res.status(200).json({
          newUser,
          message: "Successful registration, redirecting...",
        });
      } catch (error) {
        res.status(404).json({ error, message: "Operation failed." });
      }
    }
  });

module.exports = router;
