import {
  readDataFromFile,
  generateID,
  saveDataToFile,
} from "../utils/index.js";

export const getTags = async (req, res) => {
  const data = await readDataFromFile("/data/tags.json");
  res.send({
    data,
  });
};

export const createTag = async (req, res) => {
  const tags = await readDataFromFile("/data/tags.json");
  const regExp = /#[0-9A-Za-zА-Яа-яё]+/g;
  let arrOfNewTags = req.body.text.match(regExp);
  if (arrOfNewTags !== null) {
    arrOfNewTags.forEach((item) => {
      const newTag = {
        text: item,
        id: generateID(),
      };
      tags.push(newTag);
    });

    const filteredArr = tags.filter(
      (v, i, a) => a.findIndex((t) => t.text === v.text) === i
    );

    await saveDataToFile("/data/tags.json", JSON.stringify(filteredArr));

    res.send({ data: filteredArr });
  }
};

export const editTag = async (req, res) => {
  const tags = await readDataFromFile("/data/tags.json");

  const oldTag = tags.find((item) => item.id === req.params.id);
  const newTag = {
    ...oldTag,
    ...req.body,
  };

  const indexOfTag = tags.findIndex((item) => item.id === req.params.id);
  tags.splice(indexOfTag, 1, newTag);
  await saveDataToFile("/data/tags.json", JSON.stringify(tags));

  res.send({
    data: newTag,
  });
};

export const deleteTag = async (req, res) => {
  const tags = await readDataFromFile("/data/tags.json");

  const indexOfDeletedTag = tags.findIndex((item) => item.id === req.params.id);

  const deletedTag = tags.splice(indexOfDeletedTag, 1)[0];
  await saveDataToFile("/data/tags.json", JSON.stringify(tags));

  res.send({
    data: deletedTag,
  });
};
