console.log('rerunning calculations')

var child_process = require('child_process');

exports.rerunCalc = async function rerun() {
    console.log('Starting calculations');
    const result = (await child_process.exec('python calculations.py'));
    console.log('Finished calculations');
    return result;
}
