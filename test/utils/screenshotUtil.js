const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const { CONST } = require('../constants');
const CONFIG = require('./testconfig.json');

const takeScreenshot = async (page, stepName) => {
  const gitTag = CONFIG.gitTag;
  await page.screenshot({
    path: `${CONST.screenshotPath}/${gitTag}/${stepName}.png`,
    type: 'png',
  });
  await page.waitFor(300);
};

/**
 * @param {string} path1 - path to image file 1
 * @param {string} path2 - path to image file 2
 * @param {string} diffPath - path to create diff image file
 */
const compareScreenshots = async (path1, path2, diffPath) => {
  const img1 = fs
    .createReadStream(path1)
    .pipe(new PNG())
    .on('parsed', doneReading);
  const img2 = fs
    .createReadStream(path2)
    .pipe(new PNG())
    .on('parsed', doneReading);
  let filesRead = 0;

  function doneReading() {
    if (++filesRead < 2) return;
    var diff = new PNG({ width: img1.width, height: img1.height });

    pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
      threshold: 0.1,
    });

    diff.pack().pipe(fs.createWriteStream(diffPath));
  }
};

const compareAllScreenshots = async () => {
  const currShots = fs.readdirSync(CONFIG.screenshotDir).sort();
  let count = 0;
  for (i = 0; i < currShots.length; i++) {
    const diffPath = `${CONFIG.diffDir}/${currShots[i]}`;
    const currentSnapPath = `${CONFIG.screenshotDir}/${currShots[i]}`;
    const lastSnapPath = `${CONFIG.lastScreenshotDir}/${currShots[i]}`;
    if (fs.existsSync(lastSnapPath)) {
      await compareScreenshots(currentSnapPath, lastSnapPath, diffPath);
      count++;
    }
  }
  console.log('Compared screenshots:', count);
};

module.exports = { compareAllScreenshots, takeScreenshot };
