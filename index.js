require("dotenv").config();
const express = require("express");

const mongo = require("./shared/mongo");
const routes = require("./routes/index");
const middleware = require("./shared/middleware");


const PORT = process.env.PORT || 3001;
const app = express();

(async () => {
  try {
    await mongo.connect();

    // middleware
    app.use(express.json());
    app.use(middleware.logging);
    app.use(middleware.maintenance);
    console.log("middleware initiallized successfully");

    // routes
    app.get("/", (req, res) => res.send("Welcome to World"));
    app.use('/auth', routes.authRoutes);
    app.use("/users", routes.userRoutes);
    app.use("/posts", routes.postRoutes);
    // app.use("/comments", routes.commentRoutes);

    console.log("routes initiallized successfully");

    // port
    app.listen(process.env.PORT, () =>
      console.log(`server listening at port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log("error starting application - ", error.message);
  }
})();
