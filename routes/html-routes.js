var path = require("path");

var db = require("../models");

module.exports = function(app) {


  app.get("/comment", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/comment.html"));
  });

  app.get("/cat", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/cat.html"))
  });
 
};