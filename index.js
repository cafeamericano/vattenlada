//Requirements
var express = require("express");
var mongoose = require("mongoose");
var app = express();

//PORT
var PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Import DB models
var db = require("./models");

//Connect to database
var dbURL = process.env.MONGODB_URI || "mongodb://localhost/sample_geospatial";
mongoose.connect(dbURL, {
  useNewUrlParser: true
});

//Routes/////////////////////////////////////////////////////////
app.get("/", function(req, res) {
  res.send('Hello world.');
});

app.get("/shipwrecks", function(req, res) {
  db.Shipwreck.find({})
    // .sort({ scrapeTime: -1 })
    // .populate("comments")
    .then(function(queryResult) {
      res.json(queryResult);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// app.get("/api/articles", function(req, res) {
//   db.Article.find({})
//     .sort({ scrapeTime: -1 })
//     .populate("comments")
//     .then(function(queryResult) {
//       res.json(queryResult);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.get("/articles/:id", function(req, res) {
//   db.Article.find({ _id: req.params.id })
//     .sort({ scrapeTime: -1 })
//     .populate("comments")
//     .then(function(queryResult) {
//       res.render("articleExpanded", { record: queryResult });
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.get("/api/articles/:id", function(req, res) {
//   db.Article.find({ _id: req.params.id })
//     .sort({ scrapeTime: -1 })
//     .populate("comments")
//     .then(function(queryResult) {
//       res.json(queryResult);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.delete("/articles/:id", function(req, res) {
//   db.Article.find({ _id: req.params.id })
//     .remove()
//     .then(function() {
//       res.send("Article deleted.");
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.get("/comments", function(req, res) {
//   db.Comment.find({})
//     .then(function(queryResult) {
//       res.render("comments", { record: queryResult });
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.get("/comments/:articleid", function(req, res) {
//   console.log(req.params.articleid);
//   db.Comment.find({ articleId: req.params.articleid })
//     .sort({ createTime: -1 })
//     .then(function(queryResult) {
//       res.json(queryResult);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.delete("/comments/:id", function(req, res) {
//   db.Comment.find({ _id: req.params.id })
//     .remove()
//     .then(function() {
//       res.send("Comment deleted.");
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.get("/scrape", function(req, res) {
//   axios.get("https://9to5mac.com/").then(function(response) {
//     var $ = cheerio.load(response.data);
//     $("article").each(function(i, element) {
//       //Define how we'd like to structure each result object
//       var result = {};
//       result.headline = $(this)
//         .children("div")
//         .children("h1")
//         .children("a")
//         .text();
//       result.summary = $(this)
//         .children("div")
//         .children("div[itemprop='articleBody']")
//         .children("p")
//         .text();
//       result.url = $(this)
//         .children("div")
//         .children("h1")
//         .children("a")
//         .attr("href");
//       result.scrapeTime = moment.now();

//       //Define how unwanted text will be dropped
//       function chopOffUnwantedText() {
//         let fullText = result.summary;
//         let fullTextLength = result.summary.length;
//         let eliminateTextLength = "expand full story ".length + 1;
//         let keepTextLength = fullTextLength - eliminateTextLength;
//         var holdData = "";
//         for (var i = 0; i < keepTextLength; i++) {
//           holdData += fullText[i];
//         }
//         result.summary = holdData;
//       }

//       //Perform the removal of unwanted text
//       chopOffUnwantedText();

//       //Add in the result object to the database
//       db.Article.create({
//         headline: result.headline,
//         summary: result.summary,
//         url: result.url,
//         scrapeTime: result.scrapeTime
//       })
//         .then(function(dbArticle) {
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           console.log(err);
//         });
//     });
//     //Notify user on front-end that scrapping was performed
//     res.redirect("/articles");
//   });
// });

// app.post("/addanarticle", function(req, res) {
//   db.Article.create({
//     headline: req.body.headline,
//     summary: req.body.summary,
//     url: req.body.url
//   })
//     .then(function(dbArticle) {
//       console.log(dbArticle);
//       res.send("Added article.");
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// });

// app.post("/addacomment", function(req, res) {
//   db.Comment.create({
//     user: req.body.user,
//     commentText: req.body.commentText,
//     articleId: req.body.articleId,
//     createTime: moment.now()
//   })
//     .then(function(dbComment) {
//       return db.Article.findOneAndUpdate(
//         { _id: req.body.articleId },
//         { $push: { comments: dbComment._id } },
//         { new: true }
//       );
//     })
//     .then(function(dbArticle) {
//       console.log(dbArticle);
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// });

//Start server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});