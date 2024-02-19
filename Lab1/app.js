const express = require('express')
const app = express()
const port = 3000

const fs = require("fs")
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  fs.readFile(__dirname+'/'+'books.json','utf-8',(err,data)=>{
    var books = JSON.parse( data );
    res.end(JSON.stringify(books));
  })
})

app.get('/:id', (req, res) => {
  fs.readFile(__dirname+'/'+'books.json','utf-8',(err,data)=>{
    var books = JSON.parse( data );
    var book = books[req.params.id-1]
    res.end(JSON.stringify(book));
  })
})

app.post('/', (req,res) => {
  fs.readFile( __dirname + "/books.json", 'utf8', (err, data) => {
    let books = JSON.parse( data );
    const newBook = {
      "title": req.body.title,
      "author": req.body.author,
      "year": req.body.year,
      "publisher_address": req.body.publisher_address,
      "price": req.body.price,
      "bookstore": req.body.bookstore
    };
    books.push(newBook);
    fs.writeFile(__dirname+'/books.json', JSON.stringify(books,null,2),'utf8',(err)=>{
      if(err){
        res.status(500).send('Problem while write in file')
      }
      res.status(201).send('Created')
    })
 });
})

app.put('/:id', (req,res)=>{
  fs.readFile( __dirname + "/books.json", 'utf8', (err, data) => {
    let books = JSON.parse( data );
    books[req.params.id-1] = req.body;
    fs.writeFile(__dirname+'/books.json', JSON.stringify(books,null,2),'utf8',(err)=>{
      if(err){
        res.status(500).send('Problem while write in file')
      }
      res.status(200).send('Updated')
    })
 });
})

app.delete('/:id', (req,res)=>{
  fs.readFile( __dirname + "/books.json", 'utf8', (err, data) => {
    let books = JSON.parse( data )
    delete books[req.params.id-1]
    books = books.filter(Boolean)
    fs.writeFile(__dirname+'/books.json', JSON.stringify(books,null,2),'utf8',(err)=>{
      if(err){
        res.status(500).send('Problem while write in file')
      }
      res.status(200).send('Deleted')
    })
 });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
