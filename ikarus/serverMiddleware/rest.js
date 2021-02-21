const bodyParser = require("body-parser");
const app = require("express")();

/*
postgres://wooduqmm:V_Fzp8pzrdwC8EKKy7-HqgaMIPbc4YsB@ziggy.db.elephantsql.com:5432/wooduqmm
*/
var db = require("./dbMongo.js").default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("asfdsfsdfs");
});
app.get("/title", (req, res) => {
  db.getMain()
    .then(result => {
      res.send(result);
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

app.post("/edit", (req, res) => {
  console.log("got in this", req.body);
  console.log("got in this", req.body.title);

  db.editFire(req.body.id, req.body.title, req.body.content).then(result => {
    res.send("Rows:" + result);
  });
});
app.post("/delete", (req, res) => {
  db.deleteFire(req.body.id).then(result => {
    res.send("Rows:" + result);
  });
});

app.post("/login", (req, res) => {
  db.getLogin().then(result => {
    let submitPass = req.body.password;
    let response = { User: "ERROR" };
    if (submitPass == result.password) {
      response.User = result.name;
    }
    res.send(response);
  });
});

app.get("/fire", (req, res) => {
  db.selectFire()
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log("Something Went Wrong:", error);
    });
});

module.exports = app;
