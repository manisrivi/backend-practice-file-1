const helper = require("../helpers/user.helper");

const service = {
  async getAllUsers(req, res) {
    try {
      const data = await helper.find().toArray();
      res.send(data);
    } catch (error) {
      console.log("error-", error.message);
      res.status(500).send({ error: "cannot fetch all data" });
    }
  },
  async getUsersById(req, res) {
    try {
        const data = await helper.findById(req.params.id);
        res.send(data);   
    } catch (error) {
        console.log('error-', error.message);
        res.status(500).send({error: `cannot fetch this id ${req.params.id}`})
    }
  },
};

module.exports = service;