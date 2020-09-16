const pool = require('../../databasePool');

class AccountTable {
    static storeAccount({ emailHash, passwordHash, name, address, phone }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO account("emailHash", "passwordHash", name, address, phone) VALUES($1, $2, $3, $4, $5)`,
                [emailHash, passwordHash, name, address, phone],
                (error, response) => {
                    if(error) return reject(error);

                    resolve();
                }
            );
        });
    }

    static getAccount({ emailHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, name, address, phone, "passwordHash", "sessionId" FROM account WHERE "emailHash" = $1`,
                [emailHash],
                (error, response) => {
                    if(error) reject(error);

                    resolve({ account: response.rows[0] });
                }
            )
        });
    }

    static updateSessionId({ sessionId, emailHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE account SET "sessionId" = $1 WHERE "emailHash" = $2`,
                [sessionId, emailHash],
                (error, response) => {
                    if(error) reject(error);

                    resolve();
                }
            )
        });
    }
}

module.exports = AccountTable;