module.exports = function(sequelize, DataTypes) {
  var user_holder = sequelize.define("user_holder", {
    // Giving the user_holder model a name of type STRING
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  user_holder.associate = function(models) {

    user_holder.hasMany(models.Likes, {
      onDelete: "cascade"
    });
  };

  return user_holder;
};
