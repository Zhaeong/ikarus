const bodyParser = require("body-parser");
const app = require("express")();

/*
postgres://wooduqmm:V_Fzp8pzrdwC8EKKy7-HqgaMIPbc4YsB@ziggy.db.elephantsql.com:5432/wooduqmm
*/
var db = require("./db.js").default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("asfdsfsdfs");
});
app.get("/title", (req, res) => {
  console.log("in titlie");

  console.log(db.tester);

  db.sendQuery("SELECT content FROM statics WHERE title = 'Main'")
    .then(result => {
      var content = result[0]["content"];
      res.send(content);
    })
    .catch(error => {
      console.log("Something Went Wrong:", error);
    });
});

app.post("/add", (req, res) => {
  console.log("got in this", req.body);
  console.log("got in this", req.body.title);

  db.insertFire(req.body.title, req.body.content).then(result => {
    res.send("Rows:" + result);
  });
});

module.exports = app;
