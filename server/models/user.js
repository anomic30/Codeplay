// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Entity, Schema } = require('redis-om')

class User extends Entity {
    toJSON() {
        return {
            id: this.entityId,
            magic_id: this.magic_id,
            email: this.email,
            theme: this.theme,
        }
    }
}

const userSchema = new Schema(User, {
    magic_id: {
        type: 'string'
    },
    email: {
        type: 'string'
    },
    theme: {
        type: 'string'
    },
});

module.exports = userSchema;