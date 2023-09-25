import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  descriptionEN: {
    type: String,
    required: [true, "Please provide a string"],
  },
  descriptionMN: {
    type: String,
    required: [true, "Please provide a string"],
  },
  coverImg: {
    type: String,
    required: [true, "Please provide an image"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
  },
  authorImg: {
    type: String,
    required: [true, "Please provide an author image"],
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
