/**
 * Upgrades all dependencies listed in `package.json`
 * in the npm scope `@bit`
 */

const fs = require('fs');
const child_process = require('child_process');

const filterRegex = /@bit\/twohats.*/;

fs.readFile('./package.json', function(err, data) {
  if (err) throw err;

  const dependencies = JSON.parse(data)['dependencies'];
  const bitDependencies = Object.keys(dependencies)
    .filter(val => filterRegex.test(val))
    .map(x => `${x}@latest`);

  if (bitDependencies.length > 0) {
    console.log('Upgrading ' + bitDependencies.join(' ') + '...');

    const childProcess = child_process.spawn('yarn', [
      'upgrade',
      ...bitDependencies,
    ]);

    childProcess.stdout.on('data', data => console.log(data.toString()));

    childProcess.stderr.on('data', data => console.error(data.toString()));

    childProcess.on('exit', code =>
      console.log('Child process exited with code ' + code.toString())
    );
  } else {
    console.log('Nothing to upgrade');
  }
});
