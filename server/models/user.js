module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize,
    },
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
  };

  return User;
};
