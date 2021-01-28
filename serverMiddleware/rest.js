const bodyParser = require("body-parser");
const app = require("express")();

const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://ikarus:ikarus@cluster0.6olk4.mongodb.net/daedalus?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("asfdsfsdfs");
});
app.get("/title", (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  client.connect(err => {
    var query = { title: "main" };
    client
      .db("daedalus")
      .collection("fire")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);

        res.send(result[0].content);
      });
    client.close();
  });
});

module.exports = app;
