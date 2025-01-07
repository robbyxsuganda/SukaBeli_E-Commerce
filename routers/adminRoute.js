const ControllerAdmin = require("../controllers/ControllerAdmin");

const router = require("express").Router();

//READ
router.get("/", ControllerAdmin.readProducts);

//CREATE
router.get("/product/add", ControllerAdmin.showAddProductForm);
router.post("/product/add", ControllerAdmin.addProduct);

//UPDATE
router.get("/product/:id/edit", ControllerAdmin.showEditProductForm);
router.post("/product/:id/edit", ControllerAdmin.editProduct);

//DELETE
router.get("/product/:id/delete", ControllerAdmin.deleteProduct);

module.exports = router;
