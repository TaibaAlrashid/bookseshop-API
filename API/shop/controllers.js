const { Shop, Book } = require("../../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopFetch = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { excludes: ["createdAt", "updatedAt"] },
      include: {
        model: Book,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    const foundShop = await Shop.findOne({ where: { userId: req.user.id } });
    if (foundShop) {
      const err = new Error("You already own a Shop!!");
      err.status = 400;
      return next(err);
    }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.shopId = req.body.id;
      const newProduct = await Book.create(req.body);
      res.status(201).json(newProduct);
    } else {
      const err = new Error("Unauthorized.");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
