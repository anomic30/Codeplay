const { Entity, Schema } = require('redis-om')

class Code extends Entity {
    toJSON() {
        return {
            magic_id: this.magic_id,
            code_id: this.code_id,
            code: this.code,
            language: this.language,
            file_name: this.file_name,
            total_lines: this.total_lines,
            last_edited: this.last_edited,
            created_at: this.created_at,
        }
    }
}

const codeSchema = new Schema(Code, {
    magic_id: {
        type: 'string',
    },
    code_id: {
        type: 'string'
    },
    code: {
        type: 'string'
    },
    language: {
        type: 'string'
    },
    file_name: {
        type: 'string'
    },
    total_lines: {
        type: 'number'
    },
    last_edited: {
        type: 'date'
    },
    created_at: {
        type: 'date'
    }
});

module.exports = codeSchema