import express from "express";
import logger from "./logger.js";

const app = express();

app.get("/", (req, res) => {
  logger.info("Hello World");
  logger.error("Error");

  res.send("Hello Worldss");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
