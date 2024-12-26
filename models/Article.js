const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleScema = new Schema({
  title: String,
  body: String,
  numberOfLike: Number,
});
// crate table in db
const Article = mongoose.model("Article", articleScema);

module.exports = Article;
