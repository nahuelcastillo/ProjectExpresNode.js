const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const book = books

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(!isValid(username)){
    users.push({"username":username,"password":password});
   return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 

  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  res.send(JSON.stringify(books, null, 4))

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const num = req.params.isbn;

  let book = books[num]
  
  res.send(book)

  return res.status(300).json({message: "Yet to be implemented"});
 });
  


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authr = req.params.author;
  const keys = Object.keys(books);
  let authorBooks = [];

    for (const keys in books) {
        if (books[keys].author === authr) {
            authorBooks.push(books[keys]);
        }
    }
    if (authorBooks.length === 0) {
      return res.status(404).json({message: "No books found for the provided author"});
  } else {
      return res.status(200).json(authorBooks);
  }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books);
  let authorBooks = [];

  for (const keys in books) {
      if (books[keys].title === title) {
          authorBooks.push(books[keys]);
      }}
  
  res.send(authorBooks)



  return res.status(300).json({message: "Yet to be implemented"});
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const num = req.params.isbn;
  
  let book = books[num]
  
  res.send(book.reviews)


  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
