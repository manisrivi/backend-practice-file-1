// import joi
const joi = require("joi");

// import monogodb driver
const ObjectId = require("mongodb").ObjectId;

// import db in local folder
const db_1 = require("../shared/mongo");

// import userHelper
const userHelper = require("../helpers/user.helper");

// validate the createPost
const schema = joi.object({
  userId: joi.string().required(),
  title: joi.string().max(100).required(),
  body: joi.string().max(500).required(),
});

// helper => Its helps to written a mongodb query
const helper = {
  validate(post) {
    try {
      return schema.validateAsync(post);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },

  find() {
    return db_1.posts.find().toArray();
  },

  findById(_id) {
    return db_1.posts.findOne({ _id: ObjectId(_id) });
  },
  create(post) {
    return db_1.posts.insertOne(post);
  },
  update({ _id, ...post }) {
    return db_1.posts.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: post },
      { returnDocument: "after" }
    );
  },
  deleteById(_id) {
    return db_1.posts.deleteOne({ _id: ObjectId(_id) });
  },
};

// export helper
module.exports = helper;
