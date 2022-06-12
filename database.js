const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful")
})

/** 
 Table already exists
db.run(
    'Create table users(Id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName Varchar(25) Not Null, LastName varchar(25) Not Null, Email varchar(50) Not Null, Password varchar(50) Not Null );'
)
*/

db.all(`
    SELECT * from users
`,(err,results)=>{
    if(err) {return console.error(err.message)}
    console.log(results)
})


module.exports = {db}