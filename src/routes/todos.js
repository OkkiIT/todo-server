import express from "express";
import bodyParser from "body-parser";

import {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
} from "../controllers/index.js";

const jsonParser = bodyParser.json();

const todosRouter = express.Router();

todosRouter.get("/", getTodos);
todosRouter.post("/", jsonParser, createTodo);
todosRouter.put("/:id", jsonParser, editTodo);
todosRouter.delete("/:id", deleteTodo);

export default todosRouter;
