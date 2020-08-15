const router = require("express").Router();
const userController = require('../controllers/userController');

const authentication = require("../middlewares/authentication");

router.post("/registerUser", userController.registerUser);
router.post("/registerAdmin", userController.registerAdmin);

router.post("/loginAdmin", userController.loginAdmin);
router.post("/loginUser", userController.loginUser);
router.post('/google-sign-in', userController.google_sign_in)

router.use(authentication)

router.get("/getAllUsers", userController.getAllUsers)


module.exports = router;
