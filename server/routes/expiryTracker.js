import express from "express";
import models from "../models";

const router = express.Router();

router.get("/getItems", async(req, res) => {
  try {
    const items = await models.Item.findAll();
    res.status(201).json(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;