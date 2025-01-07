class ControllerCustomer {
  static async readProducts(req, res) {
    try {
      res.send("Menampilkan semua product yang ada");
    } catch (error) {
      res.send(error);
    }
  }

  static async readCarts(req, res) {
    try {
      res.send("Menampilkan carts");
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
      res.send("Membeli semua product dicarts dan mengupdate data");
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
