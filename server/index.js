const express = require('express');
const cors = require('cors');
const { Magic } = require('@magic-sdk/admin');
require('dotenv').config();

const app = express();
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to Codeplay server v1.0.0!');
});

app.post('/api/user/login', async (req, res) => {
    try {
        console.log("User login called")
        const didToken = req.headers.authorization.substring(7);
        await magic.token.validate(didToken);
        console.log("User is authenticated");
        return res.status(200).json({ authenticated: true });
    } catch (error) {
        console.log("User is not authenticated");
        return res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});