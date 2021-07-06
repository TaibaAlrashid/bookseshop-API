const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 3 },
      defaultValue: 5,
    },
    Description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Book, { source: ["name"] });
  return Book;
};
