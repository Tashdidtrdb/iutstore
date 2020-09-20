const { Pool } = require('pg');
const databaseConfig = require('./configs/databaseConfig');

const pool = new Pool(databaseConfig);

module.exports = pool;