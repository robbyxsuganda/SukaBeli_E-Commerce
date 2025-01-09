const { Product, User, Category, ProductsCategory, Profile, Cart } = require("../models/index.js");
const { Op } = require("sequelize");
const rupiahFormatter = require("../helpers/rupiahFormatter.js");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_Y/YZ4FXQ7A1LZgggMCB1pqcgIWA=",
  privateKey: "private_CvjVhs5BI8eR1hsdqi+eVHnsTbs=",
  urlEndpoint: "https://ik.imagekit.io/dm8xthnq9/",
});

class ControllerAdmin {
  static async readProducts(req, res) {
    try {
      const userWithProducts = await Product.findAll({
        where: {
          UserId: req.session.userId,
        },
      });

      // res.send("Menampilkan semua product milik si admin");
      res.render("admin/index.ejs", { userWithProducts, rupiahFormatter });
    } catch (error) {
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("admin/addProductForm.ejs", { categories });
      // res.send("Menampilkan form untuk tambah product");
    } catch (error) {
      res.send(error);
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, price, stock, description, CategoryId } = req.body;

      const data = await imagekit.upload({
        file: req.file.buffer, //required
        fileName: req.file.originalname, //required
      });

      const newProduct = await Product.create({
        name,
        price,
        stock,
        description,
        image: data.url,
        UserId: req.session.userId,
      });

      await ProductsCategory.create({
        CategoryId: CategoryId,
        ProductId: newProduct.id,
      });
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  }

  static async showEditProductForm(req, res) {
    try {
      res.send("Menampilkan form untuk edit product");
    } catch (error) {
      res.send(error);
    }
  }

  static async editProduct(req, res) {
    try {
      res.send("Mengupdate data ke database");
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      res.send("Menghapus data di database");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerAdmin;
