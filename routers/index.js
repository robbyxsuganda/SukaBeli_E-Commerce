const router = require("express").Router();
const Controller = require("../controllers/Controller");
const adminRoute = require("./adminRoute");
const customerRoute = require("./customerRoute");

// router.use(adminRoute);
router.use(customerRoute);
router.get("/profile", Controller.readProfile);

module.exports = router;
