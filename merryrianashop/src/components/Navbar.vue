<template>
  <div class="my-navbar">
    <div class="nav-wrapper">
      <div class="title">
        <h3
          style="color: rgb(168, 8, 8); font-family: 'Patua One', cursive; cursor:pointer;"
          @click="titleClick"
        >
          MerryRiana Shop
        </h3>
        <div class="admin-text" v-if="this.$store.state.isAdmin">
          <h5>Admin</h5>
          <i class="fas fa-chevron-down"></i>
          <div class="dropdown-content">
            <a href="#" @click="adminPage">Admin</a>
          </div>
        </div>
      </div>

      <div class="pages">
        <router-link to="/">Home</router-link>
        <!-- <router-link to="/about">About</router-link> -->
        <router-link to="/category/book">Book</router-link>
        <router-link to="/category/fashion">Fashion</router-link>
        <router-link to="/category/snack">Snack</router-link>
      </div>

      <div v-if="this.$store.state.isLogin" class="all-icons">
        <div class="name" style="margin-right: 30px; display:flex;">
          <em>{{ nama }}</em>
          <div style="margin-left: 10px;">
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="dropdown-content">
            <a href="#" @click="logOut">Log Out</a>
          </div>
        </div>
        <div class="theIcon" @click="goToCart">
          <i class="fa fa-shopping-cart cartIcon"></i>
          <p>Cart: {{ this.$store.state.cart.length }}</p>
        </div>
      </div>

      <div class="nav-buttons" v-if="!this.$store.state.isLogin">
        <b-button variant="danger" class="theButton" @click="registerPage"
          >Register</b-button
        >
        <b-button
          @click="$bvModal.show('login')"
          variant="info"
          class="theButton"
          >Login</b-button
        >
      </div>
      <Login />
    </div>

    <div class="my-toggle">
      <b-navbar
        toggleable
        style="background-color:red;  border-radius: 10px 10px 0px 0px;"
        class="the-toggle"
        v-if="this.$store.state.isLogin"
      >
        <div style="display:flex;">
          <b-navbar-brand href="#" class="title2"
            ><span style="  color: white; ">MerryRiana Shop</span>
          </b-navbar-brand>

          <b-navbar-toggle target="navbar-toggle-collapse">
            <template v-slot:default="{ expanded }">
              <span>{{ nama }}</span>
              <b-icon v-if="expanded" icon="chevron-bar-up">
                <span>{{ nama }}</span></b-icon
              >
              <b-icon v-else icon="chevron-bar-down">
                <span>{{ nama }}</span></b-icon
              >
            </template>
          </b-navbar-toggle>
        </div>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <router-link to="/" style="color: black;"
                >Home</router-link
              ></b-nav-item
            >
            <!-- <b-nav-item href="#">
              <router-link to="/about" style="color: black;"
                >About</router-link
              ></b-nav-item
            > -->
            <b-nav-item href="#">
              <router-link to="/category/book" style="color: black;"
                >Book</router-link
              ></b-nav-item
            >
            <b-nav-item href="#">
              <router-link to="/category/fashion" style="color: black;"
                >Fashion</router-link
              ></b-nav-item
            >
            <b-nav-item href="#">
              <router-link to="/category/snack" style="color: black;"
                >Snack</router-link
              ></b-nav-item
            >
            <b-nav-item href="#">
              <i class="fa fa-shopping-cart cartIcon fa-2x"></i>
              <span style="font-size: 20px; font-weight: bold;"
                >Cart: {{ this.$store.state.cart.length }}</span
              >
            </b-nav-item>
            <!--        
          <p>Cart: {{ cart }}</p> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div class="my-toggle2">
      <b-navbar
        toggleable
        style="background-color:red;  border-radius: 10px 10px 0px 0px;"
        class="the-toggle"
        v-if="!this.$store.state.isLogin"
      >
        <div style="display:flex;">
          <b-navbar-brand href="#" class="title2"
            ><span style="  color: white; ">MerryRiana Shop</span>
          </b-navbar-brand>

          <b-navbar-toggle target="navbar-toggle-collapse">
            <template v-slot:default="{ expanded }">
              <b-icon v-if="expanded" icon="chevron-bar-up"> </b-icon>
              <b-icon v-else icon="chevron-bar-down"> </b-icon>
            </template>
          </b-navbar-toggle>
        </div>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" @click="registerPage"> Register</b-nav-item>
            <b-nav-item href="#" @click="$bvModal.show('bv-modal-example')">
              Login</b-nav-item
            >

            <!--        
          <p>Cart: {{ cart }}</p> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from "sweetalert2";
import Login from "../components/Login";
export default {
  name: "Home",
  components: {
    Login
  },
  data() {
    return {};
  },
  created() {
    if (localStorage.access_token) {
      this.$store.state.isLogin = true;
      this.$store.state.userName = localStorage.name
    
    }
  },
  computed: {
    // cart() {
    //   return this.$store.state.cart.length;
    // },
      nama() {
      
      let str = "";
      for (let i = 0; i < this.$store.state.userName.length; i++) {
        if (this.$store.state.userName[i] == " ") {
          break;
        }
        if (i == 0) str += this.$store.state.userName[i].toUpperCase();
        else {
          str += this.$store.state.userName[i];
        }
      }
      console.log(str)
      return str;
    },
  },
  methods: {
    titleClick() {
      if (this.$route.name !== "Home") {
        this.$router.push("/");
      }
    },
  
    goToCart() {
      if (this.$router.name !== "Cart") {
        this.$router.push("/cart");
      }
    },
    registerPage() {
      if (this.$route.name != "Register") {
        this.$router.push("/register");
      }
    },
    logOut() {
      Swal.fire({
        title: `<span style="font-size: 20px; text-align:center; color: red;">Signing Out</span>`,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "Nope"
      }).then(result => {
        if (result.value) {
          localStorage.clear();
          this.$store.state.isLogin = false;
          this.$store.state.isAdmin = false;
          if (this.$route.name == "Cart" || this.$route.name == "Admin") {
            this.$router.push("/");
          }
        }
      });
    },
    adminPage() {
      this.$router.push("/admin");
    }
  }
};
</script>

<style scoped>
.my-navbar {
  margin-top: 20px;
  position: sticky;
  top: 0px;
  z-index: 2;
}

.my-toggle {
  display: none;
}

.my-toggle2 {
  display: none;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 10px 10px 0px 0px;
}
.title {
  display: flex;
  justify-content: center;
}

.admin-text {
  margin-top: 5px;
  margin-left: 10px;
  display: flex;
  cursor: pointer;
  position: relative;
}

.admin-text i {
  margin-top: 5px;
}

.title2 {
  font-family: "Patua One", "cursive";
}

.pages a.router-link-exact-active {
  color: red;
  text-decoration: underline;
}

.pages a {
  color: rgb(87, 80, 80);
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;
}
.pages {
  margin-top: 5px;
  /* margin-right: 30px; */
}

.theButton {
  margin-left: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.category a {
  color: rgb(87, 80, 80);
  text-decoration: none;
  margin-left: 5px;
  font-weight: bold;
}
.category {
  margin-top: 5px;
  /* margin-left: 10px; */
}
.all-icons {
  display: flex;
  justify-content: space-evenly;
}

.cartIcon {
  color: rgb(168, 8, 8);
  margin-top: 4px;
  margin-right: 7px;
}

.theIcon {
  display: flex;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 20px;
  /* box-sizing: border-box; */
}

.dropdown-content a {
  color: black;
  padding: 3px 5px;
  text-decoration: none;
  display: block;
  text-align: left;
  box-sizing: border-box;
}

.name {
  position: relative;
  cursor: pointer;
}

.name:hover,
.admin-text:hover .dropdown-content {
  display: block;
}

.name:hover .dropdown-content {
  display: block;
}

/* b-navbar-nav{
  margin-bottom: 100px;
} */

@media only screen and (max-width: 950px) {
  .all-icons {
    margin-top: 5px;
  }
  .cartIcon {
    color: rgb(168, 8, 8);
    margin-top: 2px;
    margin-right: 7px;
  }
}

@media only screen and (max-width: 800px) {
  .nav-wrapper {
    display: block;
    text-align: center;
  }

  /* .title {
    display: block;
  } */

  .pages {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .all-icons {
    /* margin-top: 100px; */
    justify-content: center;
    background-color: rgb(168, 8, 8);
    max-width: 190px;
    padding: 10px;
    text-align: center;
    margin: auto;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .cartIcon {
    color: white;
  }
}

@media only screen and (max-width: 300px) {
  .pages {
    display: none;
    font-size: 15px;
  }

  .all-icons {
    display: none;
  }

  .my-toggle {
    display: inline-block;
    /* width: 300px;  */
  }

  .my-toggle2 {
    display: block;
  }

  .nav-wrapper {
    display: none;
  }
}
</style>
