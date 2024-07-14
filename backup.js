// var express = require("express");
// var cors = require("cors");
// var app = express();
// var bodyParser = require("body-parser");

// app.use(cors());
// app.use(bodyParser.json());

// const port = "8081";
// const host = "localhost";
// const { MongoClient } = require("mongodb");
// const url = "mongodb://127.0.0.1:27017"; // Corrected localhost address
// const dbName = "gallas_detailing";
// const client = new MongoClient(url);

// app.listen(port, () => {
//   console.log("App listening at http://%s:%s", host, port);
// });

// app.post("/addTicket", async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db(dbName); // Move db initialization here
//     const values = Object.values(req.body);
//     const newDocument = {
//       "name": values[0],
//       "phone": values[1],
//       "email": values[2],
//       "make": values[3],
//       "model": values[4],
//       "year": values[5],
//       "service": values[6],
//       "additional_comments": values[7],
//     };
//     const results = await db.collection("tickets").insertOne(newDocument);
//     res.status(200).send(results);
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).send({ error: 'An internal server error occurred' });
//   } finally {
//     await client.close();
//   }
// });
