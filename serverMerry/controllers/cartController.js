const { Product, User, Cart, ShoppingHistory } = require("../models");

class CartController {
  static createCart(req, res, next) {
    let { id, qty } = req.body;
    let finalQty;
    let barang;
    let totalHarga;
    let IdProduct
    Product.findOne({
      where: {
        id,
      },
    }).then((product) => {
       IdProduct = product.id;
      if (!product) {
        next({ name: "DATA_NOT_FOUND" });
      } else if (product.stock == 0) {
        next({ name: "OUT_OF_STOCK" });
      } else if (qty > product.stock) {
        next({ name: "INSUFFICIENT_STOCK" });
      } else {
         barang = product;
         totalHarga = product.price * qty;
        Cart.findOne({
          where: {
            UserId: req.userData.id,
            ProductId: IdProduct,
          },
        })
          .then((data) => {
            if (data) {
              finalQty = data.qty + qty;
              if (finalQty > barang.stock) {
                next({ name: "INSUFFICIENT_STOCK" });
              } else {
                Cart.update(
                  {
                    totalPrice: totalHarga,
                    qty: finalQty,
                  },
                  {
                    where: {
                      UserId: req.userData.id,
                      ProductId: IdProduct,
                    },
                  }
                ).then((data) => {
                  res.status(200).json({
                    cart: data,
                    product: barang,
                  });
                });
              }
            } else {
              return Cart.create({
                UserId: req.userData.id,
                ProductId: IdProduct,
                qty: qty,
                totalPrice: totalHarga,
              }).then((data) => {
                console.log("berhasil update cart");
                res.status(201).json({
                  cart: data,
                  product: barang,
                });
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  static myCart(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.userData.id,
      },
      include: [Product, User],
      order: [["id", "ASC"]],
    })
      .then((data) => {
        res.status(200).json({
          cart: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateInCart(req, res, next) {
    let { productId, qty } = req.body;

    Product.findOne({
      where: {
        id: productId,
      },
    })
      .then((product) => {
        let totalHarga = product.price * qty;
        return Cart.update(
          {
            qty: qty,
            totalPrice: totalHarga,
          },
          {
            where: {
              UserId: req.userData.id,
              ProductId: productId,
            },
          }
        );
      })
      .then((data) => {
        res.status(200).json({
          data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteCart(req, res, next) {
    const { productId } = req.body;
    Cart.destroy({
      where: {
        UserId: req.userData.id,
        ProductId: productId,
      },
    })
      .then((sukses) => {
        res.status(200).json({
          product: sukses,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static checkOut(req, res, next) {
    let productArr = req.body.product;
    let filterCart = [];
    let daftarId = [];
    let benda = [];
    let kotak = [];
    let obj = {};
    let stock = "";
    let grammar = "";
    let counter = 0;


    Product.findAll()
      .then((product) => {
        for (let i = 0; i < productArr.length; i++) {
          if (counter == 1) {
            break;
          }
          for (let j = 0; j < product.length; j++) {
            if (productArr[i].ProductId == product[j].id) {
              if (product[j].stock <= 1) {
                stock = "stock";
                grammar = "has";
              } else {
                stock = "stocks";
                grammar = "have";
              }
              if (productArr[i].qty > product[j].stock) {
                obj.error = `INSUFFICIENT_STOCK FOR ${product[j].name}`;
                obj.message = `${product[j].name} only ${grammar} ${product[j].stock} ${stock} left`;
                counter += 1;
                break;
              } else if (product[j].stock == 0) {
                obj.error = `OUT_OF_STOCK`;
                obj.message = `${product[j].name} is currently running out of stock`;
                counter += 1;
                break;
              }
            }
          }
        }
        if (counter >= 1) {
          res.status(400).json(obj);
        } else {
          Cart.findAll({
            where: {
              UserId: req.userData.id,
            },
            include: [Product, User],
          })
            .then((dapat) => {
              filterCart = dapat;
              for (let i = 0; i < productArr.length; i++) {
                daftarId.push(productArr[i].Product.id);
                ShoppingHistory.create({
                  UserId: productArr[i].UserId,
                  ProductId: productArr[i].ProductId,
                  totalPrice: productArr[i].totalPrice,
                  qty: productArr[i].qty,
                }).then((response) => {
                  Cart.destroy({
                    where: {
                      UserId: productArr[i].UserId,
                      ProductId: productArr[i].ProductId,
                    },
                  });
                });
              }
            })
            .then((response) => {
              for (let i = 0; i < daftarId.length; i++) {
                benda.push(Product.findAll({ where: { id: daftarId[i] } }));
              }
              return Promise.all(benda);
            })
            .then((data) => {
              kotak = data;

              for (let i = 0; i < kotak.length; i++) {
                for (let j = 0; j < filterCart.length; j++) {
                  if (kotak[i][0].dataValues.id == filterCart[j].Product.id) {
                    kotak[i][0].dataValues.stock -= filterCart[j].qty;
                  }
                }
              }

              for (let i = 0; i < kotak.length; i++) {
                Product.update(
                  {
                    stock: kotak[i][0].dataValues.stock,
                  },
                  {
                    where: {
                      id: kotak[i][0].dataValues.id,
                    },
                  }
                );
              }
            })
            .then((sukses) => {
              res.status(200).json({
                msg: "Checkout succeeded",
              });
            });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CartController;
