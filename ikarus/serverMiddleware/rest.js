const bodyParser = require("body-parser");
const app = require("express")();
const https = require("https");
var cors = require("cors");

/*
postgres://wooduqmm:V_Fzp8pzrdwC8EKKy7-HqgaMIPbc4YsB@ziggy.db.elephantsql.com:5432/wooduqmm
*/
var db = require("./dbMongo.js").default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
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
  db.insertFire(req.body.title, req.body.content).then(result => {
    res.send("Rows:" + result);
  });
});

app.post("/edit", (req, res) => {
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
app.get("/edgar", (req, res) => {
  let edgarBaseURL = "https://www.sec.gov/Archives/edgar/data";
  //edgar company id and document number
  let cik = "/732717/000073271721000015";

  let filingsURL = edgarBaseURL + cik + "/index.json";

  const reques = https.get(filingsURL, result => {
    console.log(`statusCode: ${result.statusCode}`);

    let output = "";
    result.on("data", d => {
      //    process.stdout.write(d);
      output += d;
    });

    result.on("end", () => {
      //console.log(output);
      let outputJson = JSON.stringify(output);
      res.send(outputJson);
      console.log(outputJson);
    });
  });

  reques.on("error", error => {
    console.error(error);
  });

  reques.end();
});

module.exports = app;
