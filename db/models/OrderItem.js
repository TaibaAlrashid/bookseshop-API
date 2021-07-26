module.exports = (sequelize, DataTypes) => {
  return sequelize.define("OrderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
  });
};
