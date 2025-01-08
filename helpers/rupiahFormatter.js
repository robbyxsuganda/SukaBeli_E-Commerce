function rupiahFormatter(money) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(money);
}

module.exports = rupiahFormatter;
