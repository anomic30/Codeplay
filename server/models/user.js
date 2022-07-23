const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        default: 'User',
    },
    magic_id: {
        type: String,
        required: true,
    },
    codes: [
        {
            code: {
                type: String,
                required: true,
            },
            file_name: {
                type: String,
                required: true,
            },
            total_lines: {
                type: Number,
                required: true,
            },
            last_edited: {
                type: Date,
                required: true,
            },
            created_at: {
                type: Date,
                required: true,
            }
        }
    ]
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;