console.log('rerunning server')

var f = require('./server.js');

exports.rerunServer = async function rerun() {
    console.log('Pulling new data');
    await f.animals();
    await f.photo();
    await f.species();
    console.log('Pulled new data');
}
