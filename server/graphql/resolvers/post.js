const Post = require("../../models/post");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, ctx) {
      const newPost = new Post({
        body,
      });
      try {
        const post = await newPost.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
