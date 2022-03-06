console.log('rerunning calculations')

var child_process = require('child_process');

child_process.exec('python calculations.py', function (err){
    if (err) {
        console.log("child processes failed with error code: " + err);
    } else {
        console.log('Calculation data saved.')
    }
});