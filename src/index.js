import express from "express";
import cors from "cors";
import { tagsRouter, todosRouter } from "./routes/index.js";

const app = express();
const port = 8080;

app.use(cors());

app.use("/todos", todosRouter);
app.use("/tags", tagsRouter);

app.listen(port, async () => {
  console.log("server has been started ");
});
