import express from "express";
const router = express.Router();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/index').default);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use('/api', require('./routes/index').default);




