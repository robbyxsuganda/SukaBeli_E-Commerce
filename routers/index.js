const router = require("express").Router();
const Controller = require("../controllers/Controller");
const adminRoute = require("./adminRoute");
const customerRoute = require("./customerRoute");
const { isLoggedIn } = require("../middleware/authorization.js");

//LOGIN
router.get("/login", Controller.showLogin); //done
router.post("/login", Controller.login); // done

//REGISTER
router.get("/register", Controller.showRegister); // done
router.post("/register", Controller.register); // done

router.get("/", Controller.readProducts);

router.use(isLoggedIn);

router.get("/logout", Controller.logout); // done
router.get("/profile", Controller.readProfile);
router.use("/customer", customerRoute);
router.use("/admin", adminRoute);

//LOGOUT

module.exports = router;
