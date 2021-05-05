import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isFolder: {
        type: Boolean,
        required: true
    },
    content: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'notes'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'notes'
    }]
});
const Note = mongoose.model('notes', noteSchema);

export default Note;