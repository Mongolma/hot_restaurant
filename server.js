
// Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// List of reserved tables
var tablelist = [];

// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Displays reserved tables and waiting list
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays reservation form
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays JSON reserved table list
app.get("/api/tables", function (req, res) {
  console.log(tablelist);
  res.status(200).json(tablelist);
});

// Displays JSON information of customers in the waiting list
app.get("/api/waitlist", function(req, res){
  let tables = [];
  if(tablelist.length > 5){
    tables = tablelist.slice(5);
  }
  res.status(200).json(tables);
})

// Clears JSON table list
app.get("/api/cleartable", function(req, res){
  tablelist = [];
  res.status(200).json(tablelist);
})

// Create reserve post route - takes in JSON input
app.post("/api/reserve", function (req, res) {
  tablelist.push(
    {
      customerName: req.body.customerName || "",
      phoneNumber: req.body.phoneNumber || "",
      customerEmail: req.body.customerEmail || "",
      customerID: req.body.customerID || ""
    }
  );
  if(tablelist.length > 5){
    res.status(200).send("You are added to the waiting list!");
  }else{
    res.status(200).send("Your table is reserved!");
  }
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
