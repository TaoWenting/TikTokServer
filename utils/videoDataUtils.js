const fs = require('fs').promises;
const path = require('path');
const dbFile = path.join(__dirname, '../db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], videos: [] };
  }
}

async function writeDb(data) {
  try {
    await fs.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database:', error);
  }
}

async function readUserData() {
  const db = await readDb();
  return db.users;
}

async function writeUserData(users) {
  const db = await readDb();
  db.users = users;
  await writeDb(db);
}

async function readVideoData() {
  const db = await readDb();
  return db.videos;
}

async function writeVideoData(videos) {
  const db = await readDb();
  db.videos = videos;
  await writeDb(db);
}

module.exports = {
  readUserData,
  writeUserData,
  readVideoData,
  writeVideoData,
};
