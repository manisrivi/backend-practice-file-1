const helper = require("../helpers/auth.helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const service = {
  async register(req, res) {
    try {
      // data validation
      const user = await helper.validateSignUp(req.body);
      delete user.cPassword;
      // user existing validation
      const userExists = await helper.findByEmail(user.email);
      if (userExists)
        return res.status(400).send({ error: "user already exist" });
      // generate password
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
      // insert user
      const { insertId } = await helper.createUser(user);
      res.send({ message: "user registerd successfully", userId: insertId });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      // data validation
      const user = await helper.validateLogin(req.body);
      // user exist validation
      const dbUser = await helper.findByEmail(user.email);
      if (!dbUser) return res.status(400).send({ error: "user doesn't exist" });
      // password validation
      const isSame = await bcrypt.compare(user.password, dbUser.password);
      if (!isSame) return res.status(401).send({ error: "wrong password" });
      // Generate auth validation
      const authToken = await jwt.sign(
        { _id: dbUser._id, email: dbUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );
      res.send({ message: "user login in successfully", authToken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports = service;
