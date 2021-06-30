let products = require("../../products");
const slugify = require("slugify");

exports.productFetch = (req, res) => {
  res.json(products);
};

exports.productDelete = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product Not Found." });
  }
};

exports.productCreate = (req, res) => {
  const id = products.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = {
    id,
    slug,
    ...req.body,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.productUpdate = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    for (const key in req.body) foundProduct[key] = req.body[key];
    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product Not Found." });
  }
};
