const router = require("express").Router();

const user = require("./user");

const cart = require("./cart");

const product = require("./product");


router.use("/user", user);

router.use("/product", product);


router.use('/cart', cart)

module.exports = router;
