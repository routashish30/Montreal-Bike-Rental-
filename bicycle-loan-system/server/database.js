const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bicycle-loan-system'
});

const query = (statement) => {
    return new Promise((resolve, reject) => {
        connection.query(statement, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

connection.connect();

module.exports = query;