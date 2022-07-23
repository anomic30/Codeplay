const express = require('express');
const cors = require('cors');
const connection = require('./db');
const users = require('./routes/users');

connection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", users);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Codeplay server v1.0.0!');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});