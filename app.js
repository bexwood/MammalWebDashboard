const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
const rc = require("./rerunCalc");
const rs = require("./rerunServer");


app.use(express.json());
app.use(fileUpload({
  createParentPath: true
}));
app.use(express.static('uploads'))

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//start app
//const port = process.env.PORT || 3000;

/*app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);*/

/* GET home page. */
app.use(express.static(`${__dirname}`));
app.get('/', function(req, res) {
    //res.render('index', { title: 'Express' });
    //res.sendFile('./Template.html');
    res.sendFile(`${__dirname}/Template.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
    });
  });

app.get('/data',  async (req, res) => {
  await rs.rerunServer();
  await rc.rerunCalc();
  res.send(fs.readFileSync('calculations.json').toString('utf8'));
})

app.get('/dataUpload', async (req, res) => {
  res.send(fs.readFileSync('./uploads/uploadData.json').toString('utf8'));
})

app.post('/upload', function (req, resp) {
  if (!req.files) {
    return resp.status(400).send("No files were uploaded.");
  }
    let file = req.files.file;
    let path = 'uploads/uploadData.json';

    file.mv(path, (err) => {
      if (err) {
        resp.status(500).send(err);
      }
     // resp.send({ status: "success", path: path });
      resp.redirect('./')
    });
});


module.exports = app;