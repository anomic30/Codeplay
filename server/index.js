//implementing redis

const express = require('express');
const cors = require('cors');
const { Client, Repository } = require('redis-om');
const { userSchema } = require('./models/user');
const { Magic } = require('@magic-sdk/admin');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = async () => {
    try {
        const client = new Client();
        await client.open(
            'redis://admin:Codeplay-123@redis-17097.c289.us-west-1-2.ec2.cloud.redislabs.com:17097'
        );
        const userRepo = await new Repository(userSchema, client);
        await userRepo.dropIndex();
        await userRepo.createIndex();
        return userRepo;
    } catch (err) {
        console.log(err)
    }
}

const userRepo = connection();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Codeplay server v1.0.0!');
});

app.post('/login', async (req, res) => {
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

app.post('/register', async (req, res) => {
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
            const newUser = userRepo.createEntity()
            newUser.magic_id = req.body.magic_id
            newUser.email = req.body.email
            newUser.theme = req.body.theme
            newUser.codes = []

            console.log("Saving user");
            await userRepo.save(newUser);

            console.log("User saved");
            return res.status(200).json({ user: newUser, message: "User created" });
        }
    } catch (error) {
        console.log("User is not authenticated");
        return res.status(500).json({ error: error.message });
    }
});

// router.post('/createFile', authMiddleware, async (req, res) => {
//     const magic_id = req.magic_id;
//     const { code_id, code, file_name, total_lines, last_edited, created_at } = req.body;
//     const user = await User.findOne({ magic_id });
//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }
//     const newCode = {
//         code_id,
//         code,
//         file_name,
//         total_lines,
//         last_edited,
//         created_at
//     };
//     user.codes.push(newCode);
//     await user.save();
//     return res.status(200).json({ message: 'Code added successfully' });
// });

// router.patch('/patchCode', authMiddleware, async (req, res) => {
//     const magic_id = req.magic_id;
//     const { code_id, code, language, file_name, total_lines, last_edited } = req.body;
//     try {
//         const user = await User.findOne({ magic_id });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const codeToUpdate = user.codes.find(code => code.code_id === code_id);
//         if (!codeToUpdate) {
//             return res.status(404).json({ error: 'Code not found' });
//         }
//         codeToUpdate.code = code;
//         codeToUpdate.language = language;
//         codeToUpdate.file_name = file_name;
//         codeToUpdate.total_lines = total_lines;
//         codeToUpdate.last_edited = last_edited;
//         await user.save();
//         return res.status(200).json({ message: 'Code updated successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });

// router.get('/getCodes', authMiddleware, async (req, res) => {
//     const magic_id = req.magic_id;
//     try {
//         const user = await User.findOne({ magic_id });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         return res.status(200).json({ codes: user.codes, theme: user.theme });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

// router.delete('/deleteCode/:code_id', authMiddleware, async (req, res) => {
//     const magic_id = req.magic_id;
//     const { code_id } = req.params;
//     try {
//         const user = await User.findOne({ magic_id });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const codeToDelete = user.codes.find(code => code.code_id === code_id);
//         if (!codeToDelete) {
//             return res.status(404).json({ error: 'Code not found' });
//         }
//         user.codes = user.codes.filter(code => code.code_id !== code_id);
//         await user.save();
//         return res.status(200).json({ message: 'Code deleted successfully', codes: user.codes });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });

// router.patch('/setTheme', authMiddleware, async (req, res) => {
//     const magic_id = req.magic_id;
//     const { theme } = req.body;
//     try {
//         const user = await User.findOne({ magic_id });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         user.theme = theme;
//         await user.save();
//         return res.status(200).json({ message: 'Theme updated successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });


app.listen(5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
