const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    publicID: String,
    title: String,
    body: String,
    authorId: mongoose.ObjectId
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;