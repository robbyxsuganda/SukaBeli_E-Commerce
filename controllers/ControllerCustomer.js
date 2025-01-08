const { Op } = require("sequelize");
const rupiahFormatter = require("../helpers/rupiahFormatter.js");
const { Product, User } = require("../models/index.js");

class ControllerCustomer {
  static async readProducts(req, res) {
    try {
      // res.send(products);
      // res.send("Menampilkan semua product yang ada");
      const { search } = req.query;

      const options = {};

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      const products = await Product.findAll(options);
      res.render("customer/index.ejs", { products, rupiahFormatter });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async readCarts(req, res) {
    try {
      // res.send("Menampilkan carts");
      res.render("customer/carts.ejs");
    } catch (error) {
      res.send(error);
    }
  }

  static async checkoutAllProduct(req, res) {
    try {
      res.send("Membeli semua product dicarts dan mengupdate data");
    } catch (error) {
      res.send(error);
    }
  }

  static async readProductDetail(req, res) {
    try {
      
      res.render("customer/productDetail.ejs");
      // res.send("Membeli semua product dicarts dan mengupdate data");
    } catch (error) {
      res.send(error);
    }
  }

  static async addToCart(req, res) {
    try {
      res.send("Menambahkan product kedalam cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async incrementStock(req, res) {
    try {
      res.send("Mengurangi jumlah stock pada cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async decrementStock(req, res) {
    try {
      res.send("Mengurangi jumlah stock pada cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteFromCart(req, res) {
    try {
      res.send("Menghapus data di cart");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerCustomer;
