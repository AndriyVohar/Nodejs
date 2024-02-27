const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//uuid
const { v4: uuidv4 } = require("uuid");

app.get("/", (req, res) => {
  fs.readFile(__dirname + "/" + "books.json", "utf-8", (err, data) => {
    const books = JSON.parse(data);
    res.status(200).json(books);
  });
});

app.get("/:id", (req, res) => {
  fs.readFile(__dirname + "/" + "books.json", "utf-8", (err, data) => {
    let bookId = req.params.id;
    const books = JSON.parse(data);
    const book = books.find((book) => book.id === bookId); // Use strict equality

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).send("Book Not Found");
    }
  });
});

app.post("/", (req, res) => {
  fs.readFile(__dirname + "/books.json", "utf8", (err, data) => {
    let books = JSON.parse(data);
    const newBook = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      publisher_address: req.body.publisher_address,
      price: req.body.price,
      bookstore: req.body.bookstore,
    };
    books.push(newBook);
    fs.writeFile(
      __dirname + "/books.json",
      JSON.stringify(books, null, 2),
      "utf8",
      (err) => {
        if (err) {
          res.status(500).send("Problem while write in file");
        }
        res.status(201).send("Created");
      }
    );
  });
});

app.put("/:id", (req, res) => {
  fs.readFile(__dirname + "/books.json", "utf8", (err, data) => {
    let bookId = req.params.id;
    let books = JSON.parse(data);
    const book = books.find((book) => book.id === bookId);
    const bookIndex = books.findIndex((book) => book.id === bookId);
    books[bookIndex] = {
      ...book,
      ...req.body,
    };
    fs.writeFile(
      __dirname + "/books.json",
      JSON.stringify(books, null, 2),
      "utf8",
      (err) => {
        if (err) {
          res.status(500).send("Problem while write in file");
        }
        res.status(200).send("Updated");
      }
    );
  });
});

app.delete("/:id", (req, res) => {
  fs.readFile(__dirname + "/books.json", "utf8", (err, data) => {
    let bookId = req.params.id;
    let books = JSON.parse(data);
    books = books.filter((book) => book.id !== req.params.id);
    fs.writeFile(
      __dirname + "/books.json",
      JSON.stringify(books, null, 2),
      "utf8",
      (err) => {
        if (err) {
          res.status(500).send("Problem while write in file");
        }
        res.status(200).send("Deleted");
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
