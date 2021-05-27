import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: {
        type: String,
        unique : true,
        required: true
    },
    isFolder: {
        type: Boolean,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});
const Note = mongoose.model('notes', noteSchema);

export default Note;    