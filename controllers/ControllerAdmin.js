const { Product, User, Category, ProductsCategory } = require("../models/index.js");
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
        order: [["createdAt", "DESC"]],
      });

      res.render("admin/index.ejs", { userWithProducts, rupiahFormatter });
    } catch (error) {
      res.send(error);
    }
  }

  static async showAddProductForm(req, res) {
    try {
      let errors;
      if (req.query.errors) {
        errors = req.query.errors.split(",");
      }
      const categories = await Category.findAll();
      res.render("admin/addProductForm.ejs", { categories, errors });
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
      console.log(error);

      if (error.name === "SequelizeValidationError") {
        const erorrs = error.errors.map((er) => {
          return er.message;
        });
        res.redirect(`/admin/product/add?errors=${erorrs}`);
      } else {
        res.send(error);
      }
    }
  }

  static async showEditProductForm(req, res) {
    try {
      const { id } = req.params;
      const categories = await Category.findAll();
      const product = await Product.findByPk(id);
      res.render("admin/editProductForm.ejs", { categories, product });
    } catch (error) {
      res.send(error);
    }
  }

  static async editProduct(req, res) {
    try {
      const { id } = req.params;

      const { name, price, stock, CategoryId, description } = req.body;

      const data = await imagekit.upload({
        file: req.file.buffer, //required
        fileName: req.file.originalname, //required
      });

      await Product.update(
        {
          name,
          price,
          stock,
          description,
          image: data.url,
          UserId: req.session.userId,
        },
        {
          where: {
            id: id,
          },
        }
      );

      await ProductsCategory.update(
        {
          CategoryId: CategoryId,
        },
        {
          where: {
            ProductId: id,
          },
        }
      );

      res.redirect("/admin");
    } catch (error) {

      res.send(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.destroy({
        where: {
          id: id,
        },
      });
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerAdmin;
