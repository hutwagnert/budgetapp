module.exports = function(sequelize, DataTypes) {
  var Likes = sequelize.define("Likes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Likes.associate = function(models) {
    // We're saying that a Likes should belong to an Author
    // A Likes can't be created without an Author due to the foreign key constraint
    Likes.belongsTo(models.user_holder, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Likes;
};
