const User = require('../models/user');
const express = require('express');
const router = express.Router();
const { Magic } = require('@magic-sdk/admin');
const authMiddleware = require('../middlewares/authMiddleware');
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

router.post('/register', async (req, res) => {
    try {
        console.log("User register called")
        const didToken = req.headers.authorization.substring(7);
        await magic.token.validate(didToken);
        console.log("User is authenticated");

        console.log("Finding user if it exists");
        const user = await User.findOne({ magic_id: req.body.magic_id });
        if (user) {
            console.log("User already exists");
            return res.status(200).json({ user: user, message: "User already exists" });
        } else {
            console.log("User does not exist");
            const newUser = new User({
                magic_id: req.body.magic_id,
                email: req.body.email,
                codes: [],
            });
            console.log("Saving user");
            await newUser.save();
            console.log("User saved");
            return res.status(200).json({ user: newUser, message: "User created" });
        }
    } catch (error) {
        console.log("User is not authenticated");
        return res.status(500).json({ error: error.message });
    }
});

router.post('/createFile', authMiddleware, async (req, res) => {
    const magic_id = req.magic_id;
    const { code_id, code, file_name, total_lines, last_edited, created_at } = req.body;
    const user = await User.findOne({ magic_id });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const newCode = {
        code_id,
        code,
        file_name,
        total_lines,
        last_edited,
        created_at
    };
    user.codes.push(newCode);
    await user.save();
    return res.status(200).json({ message: 'Code added successfully' });
});

router.patch('/patchCode', authMiddleware, async (req, res) => {
    const magic_id = req.magic_id;
    const { code_id, code, language, file_name, total_lines, last_edited } = req.body;
    try {
        const user = await User.findOne({ magic_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const codeToUpdate = user.codes.find(code => code.code_id === code_id);
        if (!codeToUpdate) {
            return res.status(404).json({ error: 'Code not found' });
        }
        codeToUpdate.code = code;
        codeToUpdate.language = language;
        codeToUpdate.file_name = file_name;
        codeToUpdate.total_lines = total_lines;
        codeToUpdate.last_edited = last_edited;
        await user.save();
        return res.status(200).json({ message: 'Code updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/getCodes', authMiddleware, async (req, res) => {
    const magic_id = req.magic_id;
    try {
        const user = await User.findOne({ magic_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ codes: user.codes, theme: user.theme });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.delete('/deleteCode/:code_id', authMiddleware, async (req, res) => {
    const magic_id = req.magic_id;
    const { code_id } = req.params;
    try {
        const user = await User.findOne({ magic_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const codeToDelete = user.codes.find(code => code.code_id === code_id);
        if (!codeToDelete) {
            return res.status(404).json({ error: 'Code not found' });
        }
        user.codes = user.codes.filter(code => code.code_id !== code_id);
        await user.save();
        return res.status(200).json({ message: 'Code deleted successfully', codes: user.codes });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.patch('/setTheme', authMiddleware, async (req, res) => {
    const magic_id = req.magic_id;
    const { theme } = req.body;
    try {
        const user = await User.findOne({ magic_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.theme = theme;
        await user.save();
        return res.status(200).json({ message: 'Theme updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;