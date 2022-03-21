import express from "express";
import bodyParser from "body-parser";

import { getTags, deleteTag, editTag } from "../controllers/index.js";
import { createTag } from "../controllers/tags.controller.js";

const jsonParser = bodyParser.json();

const tagsRouter = express.Router();

tagsRouter.get("/", getTags);
tagsRouter.post("/", jsonParser, createTag);
tagsRouter.put("/:id", jsonParser, editTag);
tagsRouter.delete("/:id", deleteTag);

export default tagsRouter;
