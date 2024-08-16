var db = require('oracledb');
var config = require('../../config/dbconfig');

const query = (sql, opt, func) => {
    return new Promise(async (resolve, reject) => {
        await db.getConnection(config, async (err, conn) => {
            if (err) {
                console.error(err.message);
            }

            await conn.execute(sql, [], opt, async (err, result) => {
                if (err) {
                    console.error(err.message);
                }

                await conn.close(err => {
                    if (err) {
                        console.error(err.message);
                    }

                    resolve(func(result));
                });
            });
        });
    });
};

module.exports = { query };
