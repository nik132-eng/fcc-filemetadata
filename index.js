var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer');

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload.any(), function (req, res) {
  const files = req.files[0];
  const response = {
    name: files.originalname,
    type: files.mimetype,
    size: files.size
  }

  res.send(response);  
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
