const router = require("express").Router();
const productController = require('../controllers/productController');

const authentication = require("../middlewares/authentication");

const authorization  = require("../middlewares/authorizationAdmin")

router.get("/", productController.showProduct)
router.get("/getShoppingHistories", productController.getShoppingHistories);
router.get("/:id", productController.getOneProduct)

router.use(authentication)


router.post("/", authorization,productController.createProduct);

router.delete("/:id", authorization, productController.deleteProduct);

router.put("/:id", authorization, productController.editProduct);



module.exports = router;
