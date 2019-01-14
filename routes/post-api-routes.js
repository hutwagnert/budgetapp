// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Likess
  app.get("/api/likes", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Likes.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbLikes) {
      res.json(dbLikes);
    });
  });

  // Get route for retrieving a single Likes
  app.get("/api/Likes/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Likes.findOne({
      where: {
        id: req.params.id
      },
      include: [db.user_holder]
    }).then(function(dbLikes) {
      res.json(dbLikes);
    });
  });

  // Likes route for saving a new Likes
  app.post("/api/Likess", function(req, res) {
    db.Likes.create(req.body).then(function(dbLikes) {
      res.json(dbLikes);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/Likes/:id", function(req, res) {
    db.Likes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLikes) {
      res.json(dbLikes);
    });
  });

  // PUT route for updating Likess
  app.put("/api/Likes", function(req, res) {
    db.Likes.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLikes) {
      res.json(dbLikes);
    });
  });
};
