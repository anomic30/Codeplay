const User = require('../models/user');
const express = require('express');
const router = express.Router();
const { Magic } = require('@magic-sdk/admin');
require('dotenv').config();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

router.post('/login', async (req, res) => {
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

module.exports = router;