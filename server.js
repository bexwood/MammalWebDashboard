//const app = require('./app');

//app.listen(8090);


var mysql = require('mysql');

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
        //data = JSON.parse(data);
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


// Functions to create:

function KPI1_images_provided(){
    sql_query = 'SELECT COUNT(person_id), person_id FROM mammalWeb.Photo6 GROUP BY person_id ORDER BY person_id';
    pull_data(sql_query, '1_images_provided.json');
    
  }

function KPI1_images_classified(){
    sql_query = 'SELECT COUNT(person_id), person_id FROM mammalWeb.Animal GROUP BY person_id ORDER BY person_id';
    pull_data(sql_query, '1_images_classified.json');
    
}

function KPI2_camera_days(){
    sql_query = 'SELECT COUNT(uploaded), uploaded FROM mammalWeb.Photo6 GROUP BY uploaded ORDER BY uploaded';
    pull_data(sql_query, '2_camera_days.json');
}

function KPI3_classification_events(){
  sql_query = 'SELECT COUNT(DISTINCT photo_id) FROM mammalWeb.Animal';
  pull_data(sql_query, '3_classification_events.json');
}
function KPI3_animals(){
  sql_query = 'SELECT COUNT(DISTINCT animal_id), species FROM mammalWeb.Animal GROUP BY species';
  pull_data(sql_query, '3_animals.json');
}

KPI1_images_provided()
KPI1_images_classified()
KPI2_camera_days()
KPI3_classification_events()
KPI3_animals()




