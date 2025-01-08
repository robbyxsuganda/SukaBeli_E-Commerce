const ControllerCustomer = require("../controllers/ControllerCustomer");

const router = require("express").Router();

//READ
router.get("/product/cart", ControllerCustomer.readCarts);
router.get("/product/cart/checkout", ControllerCustomer.checkoutAllProduct);
router.get("/product/:id", ControllerCustomer.readProductDetail);

//CREATE
router.get("/product/:id/addCart", ControllerCustomer.addToCart);

//UPDATE
router.get("/product/:id/incrementStock", ControllerCustomer.incrementStock);
router.get("/product/:id/decrementStock", ControllerCustomer.decrementStock);

//DELETE
router.get("/product/:id/delete");

module.exports = router;
