const helper = require("../helpers/post.helper");
const userHelper = require("../helpers/user.helper");

const service = {
  async getAllPosts(req, res) {
    try {
      const data = await helper.find();
      res.send(data);
    } catch (error) {
      console.log("error -", error.message);
      res.status(500).send({ error: "cannot fetch all data" });
    }
  },
  async getPostById(req, res) {
    try {
      const data = await helper.findById(req.params.id);
      res.send(data);
    } catch (error) {
      console.log("error -", error.message);
      res.status(500).send({ error: `cannot fetch thid id ${req.params.id}` });
    }
  },
  async createPost(req, res) {
    try {
      // data validation
      const post = await helper.validate(req.body);
      // user validation
      const user = await userHelper.findById(post.userId);
      if (!user) return res.status(400).send({ error: "user invalid" });
      // Insert data
      const insertedData = await helper.create(post);
      res.send(insertedData);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
  async updatePost(req, res) {
    try {
      // data validation
      const newPost = await helper.validate(req.body);
      // Post validation
      const oldPost = await helper.findById(req.params.id);
      if (!oldPost) return res.status(400).send({ error: "post invalid" });
      // user validation
      const user = await userHelper.findById(newPost.userId);
      if (!user) return res.status(400).send({ error: "user invalid" });
      // update data
      const { value } = await helper.update({ _id: oldPost._id, ...newPost });
      res.send(value);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
  async deletePost(req, res) {
    try {
      // Post validation
      const post = await helper.findById(req.params.id);
      if (!post) return res.status(400).send({ error: "post invalid" });

      await helper.deleteById(post._id);
      res.end();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports = service;
