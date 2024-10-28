import express, { Application } from "express";
import { authRoute, categoryRoute, orderRoute, productRoute } from "../routes";
import cors from "cors";
const App = async (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/assets", express.static("assets"));

  app.use("/category", categoryRoute);
  app.use("/product", productRoute);
  app.use("/auth", authRoute);
  app.use("/order", orderRoute);

  return app;
};

export default App;
