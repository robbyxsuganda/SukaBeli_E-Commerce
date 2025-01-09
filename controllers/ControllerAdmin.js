const { Product, User, Category, ProductsCategory, Profile, Cart } = require("../models/index.js");
const { Op } = require("sequelize");
const rupiahFormatter = require("../helpers/rupiahFormatter.js");

class ControllerAdmin {
  static async readProducts(req, res) {
    try {
      const userWithProducts = await Product.findAll({
        where: {
          UserId: req.session.userId,
        },
      });

      // res.send("Menampilkan semua product milik si admin");
      res.render("admin/index.ejs", { userWithProducts });
    } catch (error) {
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
      res.render("admin/addProductForm.ejs");
      // res.send("Menampilkan form untuk tambah product");
    } catch (error) {
      res.send(error);
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, description, price, stock } = req.body;
      res.send(name, description, price, stock);
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
