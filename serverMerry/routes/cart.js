const router = require("express").Router();

const cartController = require('../controllers/cartController');

const authentication = require('../middlewares/authentication');

router.use(authentication);

router.get("/", cartController.myCart)

router.post("/", cartController.createCart);

router.post("/checkOut", cartController.checkOut);

router.put("/", cartController.updateInCart);

router.delete("/", cartController.deleteCart);

module.exports = router;
