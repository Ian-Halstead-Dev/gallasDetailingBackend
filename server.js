var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "https://gallasdetailingbackend.onrender.com";
const { MongoClient, ObjectId } = require("mongodb");
const url = process.env.databaseURL; // Updated connection string
const dbName = "customerTickets";
const client = new MongoClient(url);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

// Add Ticket
app.post("/addTicket", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const values = Object.values(req.body);
    const newDocument = {
      name: values[0],
      phone: values[1],
      email: values[2],
      make: values[3],
      model: values[4],
      year: values[5],
      service: values[6],
      additional_comments: values[7],
    };
    const results = await db.collection("tickets").insertOne(newDocument);
    res.status(200).send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  } finally {
    await client.close();
  }
});

// Read All Tickets
app.get("/tickets", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const tickets = await db.collection("tickets").find().toArray();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  } finally {
    await client.close();
  }
});

// Update Ticket
app.put("/tickets/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const { id } = req.params;
    const updatedData = req.body;
    const result = await db
      .collection("tickets")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    if (result.matchedCount === 0) {
      res.status(404).send({ error: "Ticket not found" });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  } finally {
    await client.close();
  }
});

// Delete Ticket
app.delete("/tickets/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const { id } = req.params;
    const result = await db
      .collection("tickets")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).send({ error: "Ticket not found" });
    } else {
      res.status(200).send({ message: "Ticket deleted" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  } finally {
    await client.close();
  }
});

// Login
app.post("/loginAdmin", async (req, res) => {
  try {
    const values = Object.values(req.body);
    const newDocument = {
      password: values[0],
    };
    console.log(newDocument.password);
    if (newDocument.password === "password123") {
      res.status(200).send();
    } else {
      res.status(401).send({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});
