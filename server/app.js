import express from "express";
import cors from "cors";
import { client } from "./utils/db.js";
import productRoute from "./routes/productRoute.js";

const init = async () => {
  await client.connect();
  const app = express();
  const port = 4001;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/products", productRoute);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
};
init();