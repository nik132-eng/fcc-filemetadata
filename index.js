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

// Set up a route for file upload
app.post('/api/fileanalyse', upload.single('file'), (req, res) => {
  // Extract file information
  const file = req.file;
  const fileName = file.originalname;
  const fileType = file.mimetype;
  const fileSize = file.size;

  // Construct response data
  const responseData = {
      name: fileName,
      type: fileType,
      size: fileSize
  };

  res.json(responseData);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
