var mysql = require("mysql");

var connPool = mysql.createPool({
//   connectionLimit: 5,
  host: "cse-mysql-classes-01.cse.umn.edu",
  user: "C4131F22U54",
  database: "C4131F22U54",
  password: "howdy"
});


function getContactForm(category){
    return new Promise((resolve, reject) => {
        if (category == "All") {
            const sql = "select * from contactForm"
            connPool.query(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        } else {
            const sql = "select * from contactForm where category=?"
            connPool.query(sql, [category], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        }
    })
};

exports.getContactForm = getContactForm;

function addContactForm(title, email, username, link, category, message){
    return new Promise((resolve, reject) => {
        const sql = "insert into contactForm (title, email, username, link, category, message) values (?, ?, ?, ?, ?, ?)";
        connPool.query(sql, [title, email, username, link, category, message], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
};

exports.addContactForm = addContactForm;
