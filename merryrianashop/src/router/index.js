import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Cart from "../views/Cart.vue";
import Category from "../views/Category.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
// import UserTable from "../views/UserTable.vue";
// import OrderTable from "../views/OrderTable.vue";
// import ProductTable from "../views/ProductTable.vue";
// import AddProduct from "../views/AddProduct.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
  
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/category/:category",
    name: "Category",
    component: Category
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  { path: "/admin", name: "Admin", component: Admin }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
