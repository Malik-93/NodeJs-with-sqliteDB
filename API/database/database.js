const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sample.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error('DB Connection Error:', err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// CREATE
// db.run(`CREATE TABLE if not exists user (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text, 
//             email text UNIQUE, 
//             password text, 
//             CONSTRAINT email_unique UNIQUE (email))`, (err) => {
//         if (err) {
//             return console.log('Error During creating user table in db: ', err)
//         } else {
    
//             // INSERT
//             var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
//             db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
//             db.run(insert, ["user", "user@example.com", md5("user123456")])
//         }

//     });

module.exports = db