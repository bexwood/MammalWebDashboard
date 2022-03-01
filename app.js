const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('client'));
app.use(express.json());


/* GET home page. */
app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });
app.post('/upload', function (req, resp) {
    const file = fs.readFile(req.files.file.path, function(err, data){
        if (err) {
            throw err;
        }
      });
    var json = JSON.stringify(file);
    var data= JSON.parse(json);
    addData(data);
});

function addData(file){
    if(file[0].hasOwnProperty('sequence_num')){
      const  fs = require('fs');
      var fileString = fs.readFileSync('photo1.json').toString();
      var original= JSON.parse(fileString);
      for(var i = 0; i < file.length; i++) {
        var obj = file[i];
        original.push(obj);
      }
      var final = JSON.stringify(original, null, 1);
      fs.writeFile('photo1.json', final, (err) => {
        if (err) {
            throw err;
        }
      });
    }
    if(file[0].hasOwnProperty('species')){
      const  fs = require('fs');
      var fileString = fs.readFileSync('animal1.json').toString();
      var original= JSON.parse(fileString);
      for(var i = 0; i < file.length; i++) {
        var obj = file[i];
        original.push(obj);
      }
      var final = JSON.stringify(original, null, 1);
      fs.writeFile('animal1.json', final, (err) => {
        if (err) {
            throw err;
        }
      });
    }
}

  module.exports = app;