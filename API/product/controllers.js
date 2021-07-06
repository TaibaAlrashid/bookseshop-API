const slugify = require("slugify");
const { Book } = require("../../db/models");

exports.productFetch = async (req, res) => {
  try {
    const products = await Book.findAll({
      attributes: { excludes: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productDelete = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Book.findByPk(productId);
    if (foundProduct) {
      foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product Not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    const newProduct = await Book.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productUpdate = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Book.findByPk(productId);
    if (foundProduct) {
      foundProduct.update();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product Not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
