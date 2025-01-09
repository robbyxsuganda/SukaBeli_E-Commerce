const ControllerAdmin = require("../controllers/ControllerAdmin");
const { isAdmin } = require("../middleware/authorization.js");
const router = require("express").Router();

const multer = require("multer");
const storage = multer.memoryStorage();
// Konfigurasi folder penyimpanan
const upload = multer({ storage: storage });

//READ
router.get("/", isAdmin, ControllerAdmin.readProducts); // done

//CREATE
router.get("/product/add", isAdmin, ControllerAdmin.showAddProductForm); //done
router.post("/product/add", upload.single("image"), isAdmin, ControllerAdmin.addProduct); //done

//UPDATE
router.get("/product/:id/edit", isAdmin, ControllerAdmin.showEditProductForm); //done
router.post("/product/:id/edit", upload.single("image"), isAdmin, ControllerAdmin.editProduct); //done

//DELETE
router.get("/product/:id/delete", isAdmin, ControllerAdmin.deleteProduct);

module.exports = router;
