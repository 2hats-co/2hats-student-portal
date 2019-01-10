const gitHash = require('git-rev-sync');
const fs = require('fs');
const { CONST } = require('./constants');

function initiateTestConfig(viewport = { width: 1200, height: 800 }) {
  const gitTag = gitHash.short();
  //Read previous testconfig.json
  const prevTestConfig = JSON.parse(
    fs.readFileSync(`${CONST.testPath}/testconfig.json`, 'utf8')
  );
  //If gitTag changed, update values
  const prevGitTag = prevTestConfig.gitTag;
  let lastGitTag = prevTestConfig.lastGitTag || 'testbd3a164';
  if (prevGitTag !== gitTag) {
    lastGitTag = prevGitTag;
  }
  //Create screenshot directory
  const dir = `${CONST.screenshotPath}/${gitTag}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  //Create screenshot difference directory
  const diffDir = `${CONST.screenshotPath}/diff-${lastGitTag}-${gitTag}`;
  if (!fs.existsSync(diffDir)) fs.mkdirSync(diffDir);
  const lastDir = `${CONST.screenshotPath}/${lastGitTag}`;
  //Create testconfig.json
  const data = JSON.stringify({
    lastGitTag,
    gitTag,
    timestamp: new Date().getTime(),
    viewport,
    screenshotDir: dir,
    lastScreenshotDir: lastDir,
    diffDir,
  });
  fs.writeFileSync(`${CONST.testPath}/testconfig.json`, data, 'utf8');
}

module.exports = { initiateTestConfig };
