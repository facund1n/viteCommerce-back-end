const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

router
  .get("/users", async (req, res) => {
    try {
      const allUsers = Users.find();
      res.status(200).send(allUsers);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .post("/login", async (req, res) => {
    const { body } = req;

    const emailMatches = await Users.findOne({ email: body.email });

    if (emailMatches === null) {
      return res.status(404).json({ message: "incorrect email or password" });
    }

    const unHashPassword = await bcrypt.compare(
      body.password,
      emailMatches.password
    );

    const unHashEmail = await bcrypt.compare(body.email, emailMatches.email);

    if (emailMatches || unHashPassword || unHashEmail === null) {
      return res.status(404).json({ message: "incorrect email or password" });
    } else {
      try {
        const jwtToken = jwt.sign(
          { id: emailMatches.id, email: emailMatches.email },
          process.env.JWT_SECRET
        );
        res.json({ message: "Logged in, redirecting...", token: jwtToken });
      } catch (error) {
        res.status(404).json({ message: error });
      }
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
    if (!emailAlreadyExist || !phoneAlreadyExist) {
      return res
        .status(404)
        .json({ error: true, message: "email o phone already registered" });
    } else {
      // bcrypt:
      const salt = await bcrypt.genSalt(6);
      const encryptedEmail = await bcrypt.hash(body.email, salt);
      const encryptedPassword = await bcrypt.hash(body.password, salt);
      const encryptedPhone = await bcrypt.hash(body.phone, salt);

      try {
        const newUser = new Users({
          email: encryptedEmail,
          password: encryptedPassword,
          phone: body.phone,
        });
        await newUser.save();
        //ver funcionamiento luego:
        newUser.password = body.password;

        res.status(200).json({
          newUser,
          message: "Successful registration, redirecting...",
        });
      } catch (error) {}
    }
  });

module.exports = router;
