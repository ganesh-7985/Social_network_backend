const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { parentId, circleId, content } = req.body;
    const post = await Post.create({ content, parent: parentId, circle: circleId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const replyToPost = async (req, res) => {
  try {
    const { parentId, circleId, content, parentPostId } = req.body;
    const reply = await Post.create({ content, parent: parentId, circle: circleId, isReply: true, parentPost: parentPostId });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPost, replyToPost };