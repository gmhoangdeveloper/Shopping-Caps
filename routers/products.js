const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Products = require("../models/products");
const jwtfile = require("../jsonwebtoken/jsonwebtoken");

router.get("/", async (req, res) => {
  const email_search = req.query.title;
  const { page, limit } = req.query;

  try {
    if (email_search !== undefined) {
      const posts = await Products.find();
      const product = await posts.filter((posts) => {
        return (
          posts.title.toLowerCase().indexOf(email_search.toLowerCase()) !== -1
        );
      });
      const paginate = await Products.paginate(
        { title: product[0].title },
        {
          // page: 1,
          // limit: 5,
          sort: { price: "asc" },
        }
      );
      res.json({ paginate, Hoang: "DONE" });
    } else {
      const paginate = await Products
        .paginate
        // {},
        // {
        //   // page: page !== undefined ? page : 1,
        //   // limit: limit !== undefined ? limit : 5,
        //   sort: { price: "asc" },
        // }
        ();
      res.json(paginate);
    }
  } catch (err) {
    res.status(500).send({ message: "Error in Not Search Product ." });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const products = await Products.findById(req.params.productId);
    const paginate = await Products.paginate({ _id: products["_id"] });
    res.json(paginate);
  } catch (err) {
    res.json({ message: err, Hoang: "EROR" });
  }
});

router.post("/", async (req, res) => {
  const products = new Products({
    // id: req.body.title,
    title: req.body.title,
    description: req.body.description,
    image1: req.body.image1,
    image2: req.body.image2,
    price: req.body.price,
    quantity: req.body.quantity,
    size: req.body.size,
    status: req.body.status,
  });
  try {
    const savedProducts = await products.save();
    res.json(savedProducts);
  } catch (err) {
    res.status(500).send({ message: "Error in Create Product." });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const product = await Products.findById(req.params.productId);
    if (product) {
      product.title = req.body.title;
      product.description = req.body.description;
      product.image1 = req.body.image1;
      product.image2 = req.body.image2;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.size = req.body.size;
      product.status = req.body.status;
      // product.rating = req.body.rating;
      // product.numReviews = req.body.numReviews;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.status(201).send({
          message: "New Product Updated",
          data: updatedProduct,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Error in Updated Product." });
  }
});
router.delete("/:productId", async (req, res) => {
  try {
    const removedPost = await Products.remove({ _id: req.params.productId });
    res.json(removedPost);
  } catch (err) {
    res.status(500).send({ message: "Error in Delete Product." });
  }
});

module.exports = router;
