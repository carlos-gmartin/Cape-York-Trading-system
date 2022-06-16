/*
*   FileName: database.js
*   Description: This uses SQLITE which means it can run SQL commands on your local machine, without needing a database server.
*   To remove old tables we just need to drop them by using the 'DROP TABLE' command.
*   Adding a community can be done by: 'INSERT INTO communities VALUES()'.
*   All of these commands require db.run so that SQLlite can understand how to run them.
*   
*/

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
    console.log("connection successful")
})

// db.run(
//    'Create TABLE communities(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name Varchar(25) Not Null, Location Varchar(25) Not Null);'
// )

// //Table already exists
 
// db.run(
//   'Create table users(Id INTEGER PRIMARY KEY AUTOINCREMENT,Community Varchar(25), FirstName Varchar(25) Not Null, LastName varchar(25) Not Null, Email varchar(50) Not Null, Password varchar(50) Not Null );'
// )

// //Table already exists

// db.run(
//  'Create table items(Id INTEGER PRIMARY KEY AUTOINCREMENT, Community Varchar(25), ItemName Varchar(25) Not Null, ItemCost Varchar(25), ItemDescription Varchar(50), VendorName Varchar(25) Not Null, Contact Varchar(25));'
// ); 

// //Table already exists

// db.run(
//  'Create table transactions(Id INTEGER PRIMARY KEY AUTOINCREMENT,Buyer Varchar(25), Community Varchar(25), ItemName Varchar(25) Not Null, ItemCost Varchar(25), ItemDescription Varchar(50), VendorName Varchar(25) Not Null, Contact Varchar(25));'
// ); 

//db.run('INSERT into items VALUES(?,?,?,?,?,?,?)', [,'Calvin','Plane', '$1000', 'Turbo Prop Plane', 'Bob', 'Facebook'])

//db.run('INSERT into communities VALUES(?,?,?)',[,'Calvin','Australia']);

// db.all(`
//     SELECT * FROM communities
// `,(err,results)=>{
//     if(err) {return console.error(err.message)}
//     console.log(results)
//     for(var i = 0; i < results.length; i++) {
//         console.log(results[i].Name);
//     }
// })

// db.all(`
//     SELECT * from items
// `,(err,results)=>{
//     if(err) {return console.error(err.message)}
//     console.log(results)
// })



// db.all(`
//     SELECT * from users
// `,(err,results)=>{
//     if(err) {return console.error(err.message)}
//     console.log(results)
// })

// db.all(`
//     SELECT * from transactions
// `,(err,results)=>{
//     if(err) {return console.error(err.message)}
//     console.log(results)
// })


// DANGEROUS DO NOT USE UNLESS RESETING SYSTEM.

// Delete tables.
// db.run('DROP TABLE transactions');
// db.run('DROP TABLE communities');
// db.run('DROP TABLE users');


module.exports = {db}