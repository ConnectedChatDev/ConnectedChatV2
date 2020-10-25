var mysql = require('mysql');

var connCfg = {
    host: '127.0.0.1',
    user: 'webdbuser',
    password: 'gatogato',
    database: 'WebDB',
    port: 3306
};

class Database {

    _getConnection() {
        return mysql.createConnection(connCfg);
    }

    getUser(username, callback) {
        var connection = this._getConnection();
        try {

            connection.connect();

            connection.query(`SELECT * FROM Users WHERE username = '${username}';`, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    callback({
                        userName: results[0].username,
                        password: results[0].password
                    });
                }
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            connection.end();
        }
    }

    registerUser(username, password, email, callback) {
        var connection = this._getConnection();
        try {

            connection.connect();

            connection.query(`INSERT INTO Users (username, email, password) values ('${username}', '${email}', '${password}');`, function (error, results, fields) {
                if (!error) {
                    callback({
                        user: {
                            id: results.insertId,
                            userName: username,
                            email: email
                        },
                        success: true
                    })
                }
                else {
                    callback({
                        success: false,
                        error: error
                    })
                }
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            connection.end();
        }
    }
}

module.exports = Database;