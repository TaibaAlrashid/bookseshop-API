const { Book, Shop } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Book.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productFetch = async (req, res, next) => {
  try {
    const products = await Book.findAll({
      attributes: { excludes: ["shopId", "createdAt", "updatedAt"] },
      include: {
        model: Shop,
        as: "shop",
        attributes: ["name"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedProduct = await req.product.update(req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
