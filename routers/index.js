const router = require("express").Router();
const Controller = require("../controllers/Controller");
const adminRoute = require("./adminRoute");
const customerRoute = require("./customerRoute");
const { isAdmin, isCustomer, isLoggedIn } = require("../middleware/authorization.js");

//LOGIN
router.get("/login", Controller.showLogin);
router.post("/login", Controller.login);

//REGISTER
router.get("/register", Controller.showRegister);
router.post("/register", Controller.register);

router.get("/", Controller.readProducts);

router.use(isLoggedIn);
router.get("/logout", Controller.logout);

router.use(isAdmin, adminRoute);
router.use(isCustomer, customerRoute);
router.get("/profile", Controller.readProfile);

//LOGOUT

module.exports = router;
