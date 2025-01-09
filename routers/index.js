const router = require("express").Router();
const Controller = require("../controllers/Controller");
const adminRoute = require("./adminRoute");
const customerRoute = require("./customerRoute");
const { isLoggedIn } = require("../middleware/authorization.js");

const multer = require("multer");
const storage = multer.memoryStorage();
// Konfigurasi folder penyimpanan
const upload = multer({ storage: storage });

//LOGIN
router.get("/login", Controller.showLogin); //done
router.post("/login", Controller.login); // done

//REGISTER
router.get("/register", Controller.showRegister); // done
router.post("/register", Controller.register); // done

router.get("/", Controller.readProducts);

router.use(isLoggedIn);

router.get("/logout", Controller.logout); // done
router.get("/profile", Controller.readProfile); //done

router.get("/profile/:id/edit", Controller.showEditProfileForm); // done
router.post("/profile/:id/edit", upload.single("photo"), Controller.editProfile); //done

router.use("/customer", customerRoute);
router.use("/admin", adminRoute);

//LOGOUT

module.exports = router;
