console.log('rerunning calculations')

const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.rerunCalc = async function rerun() {
    console.log('Starting calculations');
    const result = (await exec('python calculations.py'));
    console.log('Finished calculations');
    return result;
}