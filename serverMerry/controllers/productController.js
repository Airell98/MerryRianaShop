const { User, Product, ShoppingHistory } = require("../models");

class ProductController {
  static createProduct(req, res, next) {
    const userId = req.userData.id;
    const { image_url, name, price, stock, category, desc } = req.body;

    console.log(req.body);

    Product.create({
      image_url,
      name,
      price: Number(price),
      stock,
      category,
      desc,
      UserId: userId
    })
      .then((data) => {
        res.status(201).json({
          product: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static editProduct(req, res, next) {
    const { id } = req.params;

    const { img_url, name, price, stock, category, desc, } = req.body;
    Product.update(
      {
        img_url,
        name,
        price,
        stock,
        category,
        desc,
      },
      {
        where: {
          id: Number(id),
        },
      }
    )
      .then((data) => {
        if (data == 1) {
          res.status(200).json({
            product: data,
          });
        } else {
          next({ name: "DATA_NOT_FOUND" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteProduct(req, res, next) {
    const { id } = req.params;
    Product.destroy({ where: { id } })
      .then((data) => {
        if (data !== 0) {
          res.status(200).json({
            product: data,
          });
        } else {
          next({ name: "DATA_NOT_FOUND" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static showProduct(req, res, next) {
    Product.findAll()
      .then((data) => {
        res.status(200).json({
          product: data,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getOneProduct(req,res,next){
    Product.findOne({where:{
      id: req.params.id
    }})
    .then((data)=>{
      res.status(200).json({
        product:data
      })
    }).catch(err=>{
      next(err)
    })
  }

static getShoppingHistories(req,res,next){
    console.log('masuk shopping history')
  ShoppingHistory.findAll({include:[User, Product]}).then((data)=>{
    res.status(200).json({
      order:data
    })
  }).catch(err=>{
    next(err)
  })
}

}

module.exports = ProductController;
