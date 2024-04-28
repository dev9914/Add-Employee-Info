const mongoose = require('mongoose');
const { Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Phone:{
        type: Number,
        required: true,
    },
    Address:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Notes', NotesSchema);