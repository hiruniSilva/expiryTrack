import express from "express";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/index').default);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});






