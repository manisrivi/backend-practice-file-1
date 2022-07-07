const middleware = {
  logging(req, res, next) {
    console.log(`${new Date()} - ${req.method} - ${req.url}`);
    next();
  },
  maintenance(req, res, next){
    process.env.IS_MAINTENANCE == "true" ? res.send({ message: 'site is under maintenace' }) : next();
  }
};

module.exports = middleware;