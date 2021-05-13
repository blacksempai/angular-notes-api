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
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'notes'
    },
    children:{
        type:[{ 
            type: Schema.Types.ObjectId,
            ref: 'notes'
        }],
        default: undefined
    } 
});
const Note = mongoose.model('notes', noteSchema);

export default Note;    