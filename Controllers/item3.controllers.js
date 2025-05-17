import db from "../utils/firebase.js";

export const getItems = async (req, res) => {
  const items = await db.collection("items").get();
  const list = [];
  items.forEach((doc) => list.push({ id: doc.id, name: doc.data().name }));
  res.json(items);
};

export const getItem = async (req, res) => {
  const item = await db.collection("items").doc(req.params.id).get();
  res.json(item.data());
};

export const postItem = async (req, res) => {
    const item = await db.collection("items").add(req.body);
    res.json({id: item.id, name: req.body.name, price: req.body.price});
};

export const putItem = async (req, res) => {
  await db.collection("items").doc(req.params.id).update(req.body);
  res.json({id: item.id, name: req.body.name, price: req.body.price});
};

export const deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "item eliminado" });
};