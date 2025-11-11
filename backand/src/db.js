const Database = require('better-sqlite3')
const path = require('path')
const dataDir = path.join(__dirname, '..', 'data')
const dbPath = path.join(dataDir, 'clinica.db')
const fs = require('fs')
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, {recursive:true})
const db = new Database(dbPath)
module.exports = db
