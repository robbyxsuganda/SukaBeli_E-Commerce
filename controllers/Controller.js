const { Product, User, Category, ProductsCategory, Profile } = require("../models/index.js");
const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const rupiahFormatter = require("../helpers/rupiahFormatter.js");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_Y/YZ4FXQ7A1LZgggMCB1pqcgIWA=",
  privateKey: "private_CvjVhs5BI8eR1hsdqi+eVHnsTbs=",
  urlEndpoint: "https://ik.imagekit.io/dm8xthnq9/",
});

class Controller {
  static async readProfile(req, res) {
    try {
      const userProfile = await User.findOne({
        include: Profile,
        where: {
          id: req.session.userId,
        },
      });

      res.render("profile.ejs", { userProfile });
    } catch (error) {
      res.send(error);
    }
  }

  static async showEditProfileForm(req, res) {
    try {
      let errors;
      if (req.query.errors) {
        errors = req.query.errors.split(",");
      }

      const userProfile = await User.findOne({
        include: Profile,
        where: {
          id: req.session.userId,
        },
      });

      res.render("editProfile.ejs", { userProfile, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async editProfile(req, res) {
    try {
      const { name, email, phoneNumber, address } = req.body;

      const data = await imagekit.upload({
        file: req.file.buffer, //required
        fileName: req.file.originalname, //required
      });

      await User.update(
        { email, name },
        {
          where: {
            id: req.session.userId,
          },
        }
      );

      await Profile.update(
        { phoneNumber, address, photo: data.url },
        {
          where: {
            UserId: req.session.userId,
          },
        }
      );

      res.redirect("/profile");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const erorrs = error.errors.map((er) => {
          return er.message;
        });
        res.redirect(`/profile?errors=${erorrs}`);
      } else {
        res.send(error);
      }
    }
  }

  static async showLogin(req, res) {
    try {
      const { error } = req.query;
      res.render("login.ejs", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (isValidPassword) {
          req.session.user = { id: user.id, role: user.role, email: user.email };
          req.session.userId = user.id;
          req.session.email = user.email;
          if (user.role === "Admin") {
            return res.redirect("/admin");
          } else if (user.role === "Customer") {
            return res.redirect("/customer");
          } else {
            return res.redirect("/");
          }
        } else {
          const error = "Email / Password Salah!";
          return res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = "Email / Password Salah!";
        return res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async showRegister(req, res) {
    try {
      let errors;
      if (req.query.errors) {
        errors = req.query.errors.split(",");
      }
      res.render("register.ejs", { errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const newUser = await User.create({
        name,
        email,
        password,
        role,
      });

      await Profile.create({
        phoneNumber: "",
        address: "",
        photo: "https://i.pinimg.com/736x/f1/e6/3c/f1e63cfd56fcf2b10be4444ee5963ca9.jpg",
        UserId: newUser.id,
      });

      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const erorrs = error.errors.map((er) => {
          return er.message;
        });
        res.redirect(`/register?errors=${erorrs}`);
      } else {
        res.send(error);
      }
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static async readProducts(req, res) {
    try {
      const { search } = req.query;

      const options = {
        include: User,
        order: [["createdAt", "DESC"]],
      };

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const products = await Product.findAll(options);
      const categories = await Category.findAll();

      res.render("index.ejs", { products, rupiahFormatter, categories });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;

// const categoriesProducts = await Category.findAll({
//   include: {
//     model: Product,
//     through: ProductsCategory,
//   },
//   where: {
//     id: CategoryId,
//   },
// });
