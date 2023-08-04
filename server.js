const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const upload = multer();

dotenv.config()

const credentials = './credentials.txt'
const client = new MongoClient(process.env.MONGODB_URL, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});

async function connect() {
  try {
    await client.connect();
    const database = client.db("PersonalWebsite");
    const voiceDB = database.cpllection("voice")
    const letterDB = database.collection("letter");
  } finally {
    await client.close();
  }
}

connect().catch(console.dir);

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(upload.fields([{name : "image"}]))
app.use(express.static('public'));

app.post('/letter', (req, res) => {
    //const formData = new FormData()
    //formData.append("image", req.files['image'][0])
    //console.log(formData)
    res.send('a');
})

const port = 4000
app.listen(port, () => {
    console.log(`Initialized, listening on port ${port}`)
})