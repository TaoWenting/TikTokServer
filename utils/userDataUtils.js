const fs = require('fs').promises;
const path = require('path');
const userDataFile = path.join(__dirname, 'db.json');

async function readUserData() {
  try {
    const data = await fs.readFile(userDataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading user data:', error);
    return [];
  }
}

async function writeUserData(data) {
  try {
    await fs.writeFile(userDataFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing user data:', error);
  }
}

module.exports = {
  readUserData,
  writeUserData
};
