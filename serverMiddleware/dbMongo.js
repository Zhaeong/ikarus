const { MongoClient, ObjectID } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb-zplyp.mongodb.net";

class MongoObj {
  constructor(url) {
    this.url = url;
  }

  async connect() {
    this.client = new MongoClient(this.url);
    await this.client.connect();
    this.database = this.client.db("ZhongFan");
    this.collection = this.database.collection("Daedalus");
  }

  close() {
    this.client.close();
  }
}
const client = new MongoClient(uri);

async function getCollection() {
  await client.connect();
  const database = client.db("ZhongFan");
  const collection = database.collection("Daedalus");

  return collection;
}
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
      var insertData = { title: sTitle, content: sContent, type: "Fire" };
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
      const options = { sort: { title: 1 } };
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
  }
};
