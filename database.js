const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful")
})


 //Table already exists
 
//db.run(
//   'Create table users(Id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName Varchar(25) Not Null, LastName varchar(25) Not Null, Email varchar(50) Not Null, Password varchar(50) Not Null );'
//)

//db.run('DROP TABLE items');

  //Table already exists
  
  //db.run(
  //  'Create table items(Id INTEGER PRIMARY KEY AUTOINCREMENT, Community Varchar(25), ItemName Varchar(25) Not Null, ItemCost Varchar(25), ItemDescription Varchar(50), VendorName Varchar(25) Not Null, Contact Varchar(25));'
  //); 

//db.run('INSERT into items VALUES(?,?,?,?,?,?,?)', [,'plane','Ranger Station', '$1000', 'Turbo Prop Plane', 'Bob', 'Facebook'])

db.all(`
    SELECT * from items
`,(err,results)=>{
    if(err) {return console.error(err.message)}
    console.log(results)
})



db.all(`
    SELECT * from users
`,(err,results)=>{
    if(err) {return console.error(err.message)}
    console.log(results)
})


module.exports = {db}