import express from 'express';
const router = express.Router();

const app = express();

app.listen(3000, ()=>{
    console.log('Example...')
})

router.get("/getItems", (req,res)=>{
    try{
        const items = models.Item.findAll();
        res.status(201).json(items);
    }catch(error){
        res.status(400).send(error.message);
    }
})

export default router;