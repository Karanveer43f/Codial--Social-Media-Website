const express = require("express");
const app = express();
const port = 8000;

//using app.get middleware to route all paths coming to root to go to routes
app.get("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
