const ControllerCustomer = require("../controllers/ControllerCustomer");
const { isCustomer } = require("../middleware/authorization.js");

const router = require("express").Router();

//READ
router.get("/", isCustomer, ControllerCustomer.readProducts);
router.get("/product/cart", isCustomer, ControllerCustomer.readCarts);
router.get("/product/cart/checkout", isCustomer, ControllerCustomer.checkoutAllProduct);
router.get("/product/:id", isCustomer, ControllerCustomer.readProductDetail);

//CREATE
router.get("/product/:id/addCart", isCustomer, ControllerCustomer.addToCart);

//UPDATE
router.get("/product/:id/incrementStock", isCustomer, ControllerCustomer.incrementStock);
router.get("/product/:id/decrementStock", isCustomer, ControllerCustomer.decrementStock);

//DELETE
router.get("/product/:id/delete", isCustomer);

module.exports = router;
