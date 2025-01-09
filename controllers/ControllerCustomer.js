const { Product, User, Category, ProductsCategory, Profile, Cart } = require("../models/index.js");
const { Op } = require("sequelize");
const rupiahFormatter = require("../helpers/rupiahFormatter.js");

class ControllerCustomer {
  static async readProducts(req, res) {
    try {
      const { search, CategoryId } = req.query;

      const options = {
        include: [
          {
            model: User,
            require: true,
          },
        ],
        order: [["createdAt", "ASC"]],
      };
      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const products = await Product.findAll(options);

      const categories = await Category.findAll({
        include: {
          model: Product,
          through: ProductsCategory,
        },
      });

      // if (CategoryId) {
      //   options.where = {
      //     name: category,
      //   };
      // }
      // res.send(categories);

      res.render("customer/index.ejs", { products, rupiahFormatter, categories });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async readCarts(req, res) {
    try {
      const carts = await Cart.findAll({
        include: {
          model: Product,
          attributes: ["id", "name", "price", "description", "stock"],
        },
        where: {
          stockProduct: {
            [Op.gt]: 0,
          },
        },
        order: [["createdAt", "DESC"]],
      });

      res.render("customer/carts.ejs", { carts, rupiahFormatter });
      // res.send("Menampilkan carts");]
    } catch (error) {
      res.send(error);
    }
  }

  static async checkoutAllProduct(req, res) {
    try {
      const carts = await Cart.findAll({
        include: [Product, User],
        where: {
          UserId: req.session.userId,
        },
      });

      if (carts.length === 0) {
        const error = "Keranjang Belanja kamu kosong silahkan belanja terlebih dahulu!";
        return res.redirect(`/customer/product/cart?error=${error}`);
      }

      const stockIsReady = carts.map((c) => {
        if (c.stockProduct > c.Product.stock) {
          return false;
        } else {
          return true;
        }
      });

      if (stockIsReady[0] === false) {
        const error = `Mohon maaf, stok saat ini belum mencukupi untuk memenuhi permintaan Anda`;
        return res.redirect(`/customer/product/cart?error=${error}`);
      }

      // res.send(carts);

      res.render(`customer/checkout.ejs`, { carts, rupiahFormatter });
      // res.send("Membeli semua product dicarts dan mengupdate data");
    } catch (error) {
      res.send(error);
    }
  }

  static async buy(req, res) {
    try {
      res.redirect("/customer");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }

  static async readProductDetail(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          id: id,
        },
        include: [Category, User],
      });
      res.render("customer/productDetail.ejs", { product, rupiahFormatter });
      // res.send("Membeli semua product dicarts dan mengupdate data");
    } catch (error) {
      res.send(error);
    }
  }

  static async addToCart(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.session;

      const findCart = await Cart.findOne({
        where: { ProductId: id, UserId: userId },
        include: {
          model: Product,
          attributes: ["id", "name", "price", "description", "stock"],
        },
      });

      if (findCart) {
        await Cart.increment(
          { stockProduct: 1 },
          {
            where: { ProductId: id, UserId: userId },
          }
        );
      } else {
        await Cart.create({
          UserId: userId,
          ProductId: id,
          stockProduct: 1,
        });
      }

      res.redirect(`/customer/product/${id}`);
      // res.send("Menambahkan product kedalam cart");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }

  static async incrementStock(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.session;

      await Cart.increment({ stockProduct: 1 }, { where: { ProductId: id, UserId: userId } });

      res.redirect("/customer/product/cart");
      // res.send("Mengurangi jumlah stock pada cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async decrementStock(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.session;

      await Cart.increment({ stockProduct: -1 }, { where: { ProductId: id, UserId: userId } });

      res.redirect("/customer/product/cart");
      // res.send("Mengurangi jumlah stock pada cart");
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.session;

      await Cart.destroy({
        where: {
          ProductId: id,
          UserId: userId,
        },
      });

      res.redirect("/customer/product/cart");
      // res.send("Menghapus data di cart");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerCustomer;
