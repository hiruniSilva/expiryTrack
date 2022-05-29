import express from "express";
import {validateToken} from "../middleware/auth";
import models from "../models";

const router = express.Router();

router.get('/all', async(req,res) => {
    try{
        const users = await models.User.findAll({include: { all: true }});
        res.status(200).json(users.map(user=>user.toUserJson()));
    }catch(error){
        res.status(400).send(error.message);
    }
})

router.post('/addUser', async(req,res) => {
    try{
        const{fullname, email, password, roles } = req.body;

        const isValid = models.User.validateUserData({
			fullname,
			email,
			password,
			roles,
		});
        if (!isValid) throw new Error("Invalid Data");
        const user = await models.User.create({
			fullname,
			email,
			roles,
			passwordHash: await models.User.hashPassword(password),
		});
    }catch(error){
        res.status(400).send(error.message);
    }
})

router.get("/current", validateToken, async(req,res) => {
    const user = await models.User.findOne({
        where: {
            id: req.user.id
        }
    });
    res.send(user? user.toUserJson(): null)
});

export default router;