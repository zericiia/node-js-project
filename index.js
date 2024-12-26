const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article.js");
// odm
mongoose
  .connect(
    "mongodb+srv://karimbrahimi102:CuryiZJ5xPfH3G1h@cluster1.xwgbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => {
    console.log("db connected succefully");
  })
  .catch((error) => {
    console.log("error with connecting with the db", error);
  });
//

app.use(express.json());
app.get("/hello", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/hi", (req, res) => {
  res.send("npx nodmon");
});
app.post("/test", (req, res) => {
  res.send("test");
});
app.delete("/delete", (req, res) => {
  res.send("delete");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// path  parameters
app.get("/getSomme/:number1/:number2", (req, res) => {
  let number1 = req.params.number1;
  let number2 = req.params.number2;
  let total = Number(number1) + Number(number2);
  res.send(`${total}`);
});

app.get("/sayhello", (req, res) => {
  // console.log(req.body);
  // console.log(req.query);

  // res.send(`hello my name is ${req.body.name} and i am ${req.body.age}`);
  res.json({
    name: req.body.name,
    age: req.body.age,
    number: req.query.number,
  });
});

app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i < 100; i++) {
    numbers += i + "-";
  }
  // res.sendFile(__dirname + "/views/numbers.ejs");
  res.render("numbers.ejs", {
    name: "test",
    numbers: numbers,
  });
});
// ========ARTICLES ENDPOINT
app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const articleTitle = req.body.title;
  const articleBody = req.body.body;

  // res.send(`${articleTitle} ${articleBody}`);
  // return;
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLike = 22;

  await newArticle.save();

  res.json(newArticle);
});
// retrive articles form db

app.get("/articles", async (req, res) => {
  const article = await Article.find();
  res.send(article);
});
// delete
app.delete("/article/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(articleId);
    res.json(article);
    return;
  } catch (error) {
    console.log("error with deleting the article", error);
    res.json("error with deleting the article", error);
  }
});

//
app.get("/getArticles", async (req, res) => {
  const articles = await Article.find();

  res.render("allArticles.ejs", {
    allArticles: articles,
  });
});
