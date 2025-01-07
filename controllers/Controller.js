class Controller {
  static async readProfile(req, res) {
    try {
      res.render("profile.ejs");
      // res.send("Menampilkan data users lengkap join dengan profiles");
    } catch (error) {
      res.send(error);
    }
  }
}
module.exports = Controller;
