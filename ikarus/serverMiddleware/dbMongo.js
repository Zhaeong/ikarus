const { MongoClient, ObjectID } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb-zplyp.mongodb.net";

class MongoObj {
  constructor(url) {
    this.url = url;
  }

  async connect() {
    this.client = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await this.client.connect();
    this.database = this.client.db("ZhongFan");
    this.collection = this.database.collection("Daedalus");
  }

  close() {
    this.client.close();
  }
}
const client = new MongoClient(uri);

export default {
  getMain: async function() {
    let mongoObj = new MongoObj(uri);
    try {
      const query = { title: "MainText" };
      await mongoObj.connect();
      const mainText = await mongoObj.collection.findOne(query);

      return mainText["content"];
    } finally {
      mongoObj.close();
    }
  },
  insertFire: async function(sTitle, sContent) {
    let mongoObj = new MongoObj(uri);
    try {
      let date_ob = new Date();

      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
      let year = date_ob.getFullYear();

      // current hours
      let hours = date_ob.getHours();

      // current minutes
      let minutes = date_ob.getMinutes();

      // current seconds
      let seconds = date_ob.getSeconds();

      let dateTime =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      // prints date & time in YYYY-MM-DD HH:MM:SS format
      console.log("datebe: ", dateTime);
      var insertData = {
        title: sTitle,
        content: sContent,
        type: "Fire",
        date: dateTime
      };
      await mongoObj.connect();

      var response = await mongoObj.collection
        .insertOne(insertData)
        .catch(e => {
          console.log("PROMISE_ERROR_INSERT_FIRE", e);
          return "FAIL";
        });

      return response.insertedCount;
    } finally {
      mongoObj.close();
    }
  },
  editFire: async function(sID, sTitle, sContent) {
    let mongoObj = new MongoObj(uri);
    try {
      var idToUpdate = { _id: ObjectID(sID) };
      var updateData = { $set: { title: sTitle, content: sContent } };
      await mongoObj.connect();

      var response = await mongoObj.collection
        .updateOne(idToUpdate, updateData)
        .catch(e => {
          console.log("PROMISE_ERROR_INSERT_FIRE", e);
          return "FAIL";
        });

      return response.modifiedCount;
    } finally {
      mongoObj.close();
    }
  },
  selectFire: async function() {
    let mongoObj = new MongoObj(uri);
    try {
      await mongoObj.connect();

      const query = { type: "Fire" };
      //-1 means in descending order
      const options = { sort: { date: -1 } };
      var cursor = mongoObj.collection.find(query, options);
      var data = new Array();

      await cursor.forEach(doc => {
        data.push(doc);
      });
      return data;
    } finally {
      mongoObj.close();
    }
  },
  deleteFire: async function(sID) {
    let mongoObj = new MongoObj(uri);
    try {
      var idToDelete = { _id: ObjectID(sID) };
      await mongoObj.connect();

      var response = await mongoObj.collection
        .deleteOne(idToDelete)
        .catch(e => {
          console.log("PROMISE_ERROR_INSERT_FIRE", e);
          return "FAIL";
        });

      return response.deletedCount;
    } finally {
      mongoObj.close();
    }
  },
  getLogin: async function() {
    let mongoObj = new MongoObj(uri);
    try {
      const query = { title: "Pass" };
      await mongoObj.connect();
      const result = await mongoObj.collection.findOne(query);

      return result;
    } finally {
      mongoObj.close();
    }
  }
};
