const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')

app.use(expressLayouts)

//using app.use middleware to route all paths coming to root to go to routes
app.use("/", require("./routes"));

//setting up the views engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
