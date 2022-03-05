var mysql = require('mysql');
var exports = module.exports = {};    

var con = mysql.createConnection({
    host: "mammalwebdb.ccrk30vfkswu.eu-west-2.rds.amazonaws.com",
    user: "admin",
    password: "MammalWebAdminDB",
    database: "mammalWeb",
    debug: false
  });


function pull_data(sql_query, filename) { 
  con.connect(function(err) {
      if (err) throw err;});
  con.query(sql_query, function (err, result, fields) {
        if (err) throw err;
        const fs = require('fs');
        data = JSON.stringify(result, null, 1);
        fs.writeFile(filename, data, (err) => {
          if (err) {
              throw err;
          }
        });
        console.log("JSON data is saved.");
  });
  con.end();
  
         //  reconnect in order to prevent the"Cannot enqueue Handshake after invoking quit"
  con = mysql.createConnection({
          host: "mammalwebdb.ccrk30vfkswu.eu-west-2.rds.amazonaws.com",
          user: "admin",
          password: "MammalWebAdminDB",
          database: "mammalWeb"
        });    
};


// Functions to create JSON files:

exports.animals = function animalsFile(){
  sql_query = 'SELECT person_id, timestamp, species FROM mammalWeb.Animal';
  pull_data(sql_query, 'animal.json');
}

exports.photo = function photoFile(){
  sql_query = 'SELECT person_id, taken, sequence_num FROM mammalWeb.Photo6';
  pull_data(sql_query, 'photo.json');
}

exports.species = function speciesFile(){
  sql_query = 'SELECT option_id, option_name FROM mammalWeb.Options';
  pull_data(sql_query, 'species.json');
}

//Functions to upload a new JSON file:

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

function addFile(filename){
  const  fs = require('fs');
  var fileString = fs.readFileSync(filename).toString();
  var data= JSON.parse(fileString);
  addData(data)
}

//Run functions to create the JSON files

//animalsFile()
//photoFile()
//speciesFile()
//addFile('file2.json')
