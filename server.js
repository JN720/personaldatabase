const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer();
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config()

const credentials = './credentials.pem'
const client = new MongoClient(process.env.MONGODB_URL, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});

client.connect();
const database = client.db("PersonalWebsite");
const voiceDB = database.collection("voice")
const letterDB = database.collection("letter");
console.log('Connected to DB');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
letterMiddleware = upload.fields([{name : "image"}]);
audioMiddleware = upload.fields([{name : "audio"}]);
app.use(express.static('public'));

app.post('/letter', [letterMiddleware], (req, res) => {
    try {
      image = req.files.image[0];
      doc = {
        "filename" : image.originalname,
        "size" : image.size,
        "date" : Date.now(),
        "file" : image.buffer
      }
      letterDB.insertOne(doc);
    } catch(e) {
      res.send({
        "message" : e.message
      });
      return;
    }
    res.send({
      "message" : "Added " + req.files.image[0].originalname
    });
})

app.post('/voice', [audioMiddleware], (req, res) => {
  try {
    sound = req.files.audio[0];
    doc = {
      "filename" : sound.originalname,
      "size" : sound.size,
      "duration" : null,
      "date" : Date.now(),
      "file" : sound.buffer
    }
    voiceDB.insertOne(doc);
  } catch(e) {
    res.send({
      "message" : e.message
    });
    return;
  }
  res.send({
    "message" : "Added " + req.files.audio[0].originalname
  });
})

const port = process.env.PORT | 4000
app.listen(port, () => {
    console.log(`Initialized, listening on port ${port}`)
})