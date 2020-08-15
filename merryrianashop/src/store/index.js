import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // isLogin: false,
    baseUrl: "https://merryrianashop.herokuapp.com",
    allProducts: [],
    productsByCategory: [],
    oneProduct: {},
    cart: [],
    isLogin: false,
    users: [],
    orders: [],
    isAdmin: false,
    productDetail:{},
    userName: "",
  },
  mutations: {
    getAllProductsMutation(state, payload) {
      state.allProducts = payload;
    },
    getOneProductMutation(state, payload) {
      state.oneProduct = payload;
    },
    addToCartMutation(state, payload) {
      state.cart = payload;
    },
    orderDone(state, _) {
      state.cart = [];
    },
    productsByCategoryMutation(state, payload) {
      state.productsByCategory = payload;
    },
    getAllUsersMutation(state, payload) {
      state.users = payload;
    },
    getAllOrdersMutation(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    getAllProducts(context, _) {
      axios({
        url: `${this.state.baseUrl}/product`,
        method: "GET"
      })
        .then(response => {
        
          context.commit("getAllProductsMutation", response.data.product);
        })
        .catch(err => {
          Swal.fire("Something went wrong");
        });
    },
    getOneProduct(context, id) {
      axios({
        url: `${this.state.baseUrl}/product/${id}`,
        method: "GET"
      })
        .then(response => {
          context.commit("getOneProductMutation", response.data.product);
          router.push({ path: `/detail/${response.data.product.id}` });
        })
        .catch(err => {
          Swal.fire("Something went wrong");
        });
    },

    getOneProductDetail(context, id) {
      axios({
        url: `${this.state.baseUrl}/product/${id}`,
        method: "GET"
      })
        .then(response => {
          context.commit("getOneProductMutation", response.data.product);
        })
        .catch(err => {
          Swal.fire("Something went wrong");
        });
    },

    getMyCart(context, _) {
      axios({
        url: `${this.state.baseUrl}/cart`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          context.commit("addToCartMutation", response.data.cart);
        })
        .catch(err => {
          
          Swal.fire("Something Went Wrong");
        });
    },

    addToCart(_, id) {
      axios({
        url: `${this.state.baseUrl}/cart`,
        method: "POST",
        data: {
          qty: 1,
          id
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          //  context.commit("addToCartMutation", response.data)
          this.dispatch("getMyCart");
          Swal.fire({
            title: `<h4 style="text-align: center;"><span style="color:rgb(168,8,8);">${response.data.product.name}</span> has been successfully added to your cart</h4>`,
            text: "Wanna take a look?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sure",
            cancelButtonText: "Keep Shopping"
          }).then(result => {
            if (result.value) {
              console.log(result.value);
              router.push({ name: "Cart" });
            } else {
              router.push({ name: "Home" });
            }
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Something Went Wrong");
        });
    },
    addToCartForHome(_, id) {
      axios({
        url: `${this.state.baseUrl}/cart`,
        method: "POST",
        data: {
          qty: 1,
          id
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          //  context.commit("addToCartMutation", response.data)
          this.dispatch("getMyCart");
          Swal.fire({
            title: `<h4 style="text-align: center;"><span style="color:rgb(168,8,8);">${response.data.product.name}</span> has been successfully added to your cart</h4>`,
            text: "Wanna take a look?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sure",
            cancelButtonText: "Keep Shopping"
          }).then(result => {
            if (result.value) {
             
              router.push({ name: "Cart" });
            }
          });
        })
        .catch(err => {
         
          Swal.fire("Something Went Wrong");
        });
    },
    updateProductInCart(context, data) {
      console.log(data);
      axios({
        url: `${this.state.baseUrl}/cart`,
        method: "PUT",
        data: {
          qty: data.qty,
          productId: data.id
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          this.dispatch("getMyCart");
        })
        .catch(err => {
          Swal.fire("Something Went Wrong");
        });
    },
    deleteCartById(_, productId) {
      axios({
        url: `${this.state.baseUrl}/cart`,
        method: "DELETE",
        data: {
          productId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.dispatch("getMyCart");
        })
        .catch(err => {
          Swal.fire("Something Went Wrong");
        });
    },
    checkOut(context, data) {
      axios({
        url: `${this.state.baseUrl}/cart/checkout`,
        method: "POST",
        data: {
          product: data
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          Swal.fire({
            imageUrl:
              "https://agusmupla.files.wordpress.com/2016/04/merry-riana.png?w=360",
            imageHeight: 320,
            imageAlt: "A tall image",
            title: `<span style="text-align:center;">Thank you for ordering at <span style="color:rgb(168,8,8)">MerryRiana Shop</span></span>`,
         
            confirmButtonColor: "rgb(168,8,8)"
          });
          context.commit("orderDone");
        })
        .catch(err => {
          Swal.fire("Something Went Wrong");
        });
    },
    getAllProductsByCategory(context, category) {
      axios({
        url: `${this.state.baseUrl}/product/${category}`,
        method: "GET"
      })
        .then(response => {
          Swal.fire("productsByCategoryMutation");
        })
        .catch(err => {
          Swal.fire("Something Went Wrong");
        });
    },
    userRegister(_, data) {
      return axios({
        url: `${this.state.baseUrl}/user/registerUser`,
        method: "POST",
        data: {
          name: data.name,
          password: data.password,
          email: data.email
        }
      });
    },
    getAllUsers(context, _) {
      axios({
        url: `${this.state.baseUrl}/user/getAllUsers`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          
          context.commit("getAllUsersMutation", response.data);
        })
        .catch(err => {
          Swal.fire("Something Went Wrong");
        });
    },
    getAllOrders(context, _) {
      axios({
        url: `${this.state.baseUrl}/product/getShoppingHistories`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
         
          context.commit("getAllOrdersMutation", response.data.order);
        })
        .catch(err => {
          Swal.fire("Something Went Wrong");
        });
    },
    addProduct(context, payload) {
      axios({
        url: `${this.state.baseUrl}/product`,
        method: "POST",
        data: {
          name: payload.name,
          image_url: payload.image_url,
          stock: payload.stock,
          price: payload.price,
          desc: payload.desc,
          category: payload.category
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          Swal.fire("Product successfully added")
          this.dispatch("getAllProducts");
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },
    editProduct(_,payload){
      return axios({
        url: `${this.state.baseUrl}/product/${payload.id}`,
        method: "PUT",
        data: {
          name: payload.name,
          image_url: payload.image_url,
          stock: payload.stock,
          price: payload.price,
          desc: payload.desc,
          category: payload.category
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
    },
    hapus(_,id){
      console.log(id, '=========')
      return axios({
        url: `${this.state.baseUrl}/product/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      }).then((data)=>{
        this.dispatch("getAllProducts")
      }).catch(err=>{
        Swal.fire("Something Went Wrong")
      })
    }
  },
  modules: {}
});
