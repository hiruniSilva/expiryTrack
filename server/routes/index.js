import express from "express";

const router = express.Router();

router.get('/', (req, res)=> res.send("welcome"))
router.use('/expiryTracker', require("./expiryTracker").default)

export default router;