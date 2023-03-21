const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
//extract styles and scripts form sub pages to layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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
