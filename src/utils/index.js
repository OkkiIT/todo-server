import fs from "fs/promises";
import { rootDir } from "../configs/index.js";

export const readDataFromFile = async (path) => {
  const data = await fs.readFile(rootDir + path);
  return JSON.parse(data);
};

export const saveDataToFile = async (path, data) => {
  await fs.writeFile(rootDir + path, data);
};

export const generateID = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
