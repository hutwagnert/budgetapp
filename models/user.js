module.exports = function(sequelize, DataTypes) {
  var user_holder = sequelize.define("user_holder", {
    // Giving the user_holder model a name of type STRING
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email:DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    newuser: { type: DataTypes.BOOLEAN, defaultValue: true }
  });

  user_holder.associate = function(models) {

    user_holder.hasMany(models.Likes, {
      onDelete: "cascade"
    });
  };

  return user_holder;
};
