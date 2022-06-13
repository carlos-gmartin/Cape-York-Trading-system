const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful")
})

//db.run(
//    'Create TABLE communities(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name Varchar(25) Not Null, Location Varchar(25) Not Null);'
//)


 //Table already exists
 
//db.run(
//   'Create table users(Id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName Varchar(25) Not Null, LastName varchar(25) Not Null, Email varchar(50) Not Null, Password varchar(50) Not Null );'
//)

//db.run('DROP TABLE communities');

  //Table already exists
  
  //db.run(
  //  'Create table items(Id INTEGER PRIMARY KEY AUTOINCREMENT, Community Varchar(25), ItemName Varchar(25) Not Null, ItemCost Varchar(25), ItemDescription Varchar(50), VendorName Varchar(25) Not Null, Contact Varchar(25));'
  //); 

  //Table already exists
  
  //db.run(
  //  'Create table transactions(Id INTEGER PRIMARY KEY AUTOINCREMENT,Buyer Varchar(25), Community Varchar(25), ItemName Varchar(25) Not Null, ItemCost Varchar(25), ItemDescription Varchar(50), VendorName Varchar(25) Not Null, Contact Varchar(25));'
  //); 

//db.run('INSERT into items VALUES(?,?,?,?,?,?,?)', [,'Calvin','Plane', '$1000', 'Turbo Prop Plane', 'Bob', 'Facebook'])

//db.run('INSERT into communities VALUES(?,?,?)',[,'Calvin','Australia']);

db.all(`
    SELECT * FROM communities
`,(err,results)=>{
    if(err) {return console.error(err.message)}
    console.log(results)
    for(var i = 0; i < results.length; i++) {
        console.log(results[i].Name);
    }
})

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

db.all(`
    SELECT * from transactions
`,(err,results)=>{
    if(err) {return console.error(err.message)}
    console.log(results)
})


module.exports = {db}