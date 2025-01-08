const ControllerCustomer = require("../controllers/ControllerCustomer");
const { isCustomer } = require("../middleware/authorization.js");

const router = require("express").Router();

//READ
router.get("/", isCustomer, ControllerCustomer.readProducts);
router.get("/product/cart", isCustomer, ControllerCustomer.readCarts); // done
router.get("/product/cart/checkout", isCustomer, ControllerCustomer.checkoutAllProduct);
router.get("/product/:id", isCustomer, ControllerCustomer.readProductDetail); // done

//CREATE
router.get("/product/:id/addCart", isCustomer, ControllerCustomer.addToCart); // done

//UPDATE
router.get("/product/:id/incrementStock", isCustomer, ControllerCustomer.incrementStock); // done
router.get("/product/:id/decrementStock", isCustomer, ControllerCustomer.decrementStock); // done

//DELETE
router.get("/product/:id/delete", isCustomer, ControllerCustomer.deleteCart); // done

module.exports = router;
