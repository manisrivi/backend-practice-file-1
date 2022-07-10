const joi = require("joi");
const ObjectId = require("mongodb").ObjectId;
const db_1 = require("../shared/mongo");

const signUpSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
  cPassword: joi.ref("password"),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
});

const helper = {
  validateSignUp(user) {
    try {
      return signUpSchema.validateAsync(user);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  validateLogin(user) {
    try {
      return loginSchema.validateAsync(user);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  findByEmail(email) {
    return db_1.users.findOne({ email });
  },
  createUser(user) {
    return db_1.users.insertOne(user);
  },
};

module.exports = helper;
