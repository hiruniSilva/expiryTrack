import express from "express";
import models from "../models";

const router = express.Router();

router.get("/getItems", async (req, res) => {
  try {
    const items = await models.Item.findAll();
    res.status(201).json(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/addItems", async (req, res) => {
  try {
    const { itemName, expiryDate } = req.body;
    const isValid = models.Item.validateItemData({
      itemName,
      expiryDate
    });
    if(!isValid) throw new Error("Invalid Data. Please try again !!!");
    const addItem = await models.Item.create({
      itemName : itemName,
      expiryDate: expiryDate
    })

    res.status(201).json(addItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


export default router;
