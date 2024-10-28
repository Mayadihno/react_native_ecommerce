import express from "express";
import App from "./services/ExpressApp";
import connectToDatabase from "./services/db";
require("dotenv").config();

const StartServer = async () => {
  const app = express();
  connectToDatabase();
  await App(app);

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on localhost:${process.env.PORT}`);
  });
};

StartServer();
