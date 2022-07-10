const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    replys: Array,
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;