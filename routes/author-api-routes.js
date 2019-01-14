var db = require("../models");

module.exports = function(app) {
  app.get("/api/Users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Likes
    db.user_holder.findAll({
      include: [db.Likes]
    }).then(function(dbuser_holder) {
      res.json(dbuser_holder);
    });
  });

  app.get("/api/Users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Likes
    db.user_holder.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Likes]
    }).then(function(dbuser_holder) {
      res.json(dbuser_holder);
    });
  });

  app.post("/api/Users", function(req, res) {
    db.user_holder.create(req.body).then(function(dbuser_holder) {
      res.json(dbuser_holder);
    });
  });

  app.delete("/api/Users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
