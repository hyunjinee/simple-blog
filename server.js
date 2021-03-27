const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 5000;
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
const dbURL = process.env.URL;
console.log(typeof dbURL);
console.log(dbURL);

// "mongodb://localhost/blog"
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

// app.listen(process.env.PORT || 5000);
