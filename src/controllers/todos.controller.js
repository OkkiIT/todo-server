import {
  readDataFromFile,
  generateID,
  saveDataToFile,
} from "../utils/index.js";

export const getTodos = async (req, res) => {
  const data = await readDataFromFile("/data/todos.json");
  res.send({
    data,
  });
};

export const createTodo = async (req, res) => {
  const todos = await readDataFromFile("/data/todos.json");
  const text = req.body.text;

  const newTodo = {
    text,
    id: generateID(),
  };

  todos.unshift(newTodo);

  await saveDataToFile("/data/todos.json", JSON.stringify(todos));

  res.send({
    data: newTodo,
  });
};

export const deleteTodo = async (req, res) => {
  const todos = await readDataFromFile("/data/todos.json");

  const indexOfDeletedTodo = todos.findIndex(
    (item) => item.id === req.params.id
  );

  const deletedTodo = todos.splice(indexOfDeletedTodo, 1)[0];
  await saveDataToFile("/data/todos.json", JSON.stringify(todos));

  res.send({
    data: deletedTodo,
  });
};

export const editTodo = async (req, res) => {
  const todos = await readDataFromFile("/data/todos.json");

  const oldTodo = todos.find((item) => item.id === req.params.id);
  const newTodo = {
    ...oldTodo,
    ...req.body,
  };

  const indexOfTodo = todos.findIndex((item) => item.id === req.params.id);
  todos.splice(indexOfTodo, 1, newTodo);
  await saveDataToFile("/data/todos.json", JSON.stringify(todos));

  res.send({
    data: newTodo,
  });
};
