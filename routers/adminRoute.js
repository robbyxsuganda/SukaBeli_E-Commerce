const ControllerAdmin = require("../controllers/ControllerAdmin");
const { isAdmin } = require("../middleware/authorization.js");

const router = require("express").Router();

//READ
router.get("/", isAdmin, ControllerAdmin.readProducts);

//CREATE
router.get("/product/add", isAdmin, ControllerAdmin.showAddProductForm);
router.post("/product/add", isAdmin, ControllerAdmin.addProduct);

//UPDATE
router.get("/product/:id/edit", isAdmin, ControllerAdmin.showEditProductForm);
router.post("/product/:id/edit", isAdmin, ControllerAdmin.editProduct);

//DELETE
router.get("/product/:id/delete", isAdmin, ControllerAdmin.deleteProduct);

module.exports = router;
