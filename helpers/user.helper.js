// import Joi
const joi = require("joi");

// import mongodb driver
const ObjectId = require("mongodb").ObjectId;

// import db local folder
const db_1 = require("../shared/mongo");

// mongodb query
const helper = {
  find() {
    return db_1.users.find();
  },
  findById(_id) {
    return db_1.users.findOne({ _id: ObjectId(_id) });
  },
};

module.exports = helper;
