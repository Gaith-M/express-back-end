const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    publicID: Number,
    title: String,
    body: String,
    replys: Array,
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;