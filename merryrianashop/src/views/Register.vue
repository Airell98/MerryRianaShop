<template>
  <div id="home">
    <div class="forMargin"></div>
    <div id="content">
      <div class="contentChild">
        <div class="wrapper">
          <div class="register-form">
            <div class="d-block  text-center">
              <h3>Register Form</h3>
            </div>
            <hr />

            <div class="d-block">
              <!-- Name -->

              <b-form-group id="input-group-1" label="Name" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>

              <!-- Email -->
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <!-- Password -->

              <b-form-group
                id="input-group-2"
                label="Password :"
                label-for="input-2"
              >
                <b-input
                type="password"
                  v-model="form.password"
                  :state="validation"
                  id="feedback-user"
                ></b-input>
                <b-form-invalid-feedback :state="validation">
                  Your user ID must be 5-12 characters long.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                  Looks Good.
                </b-form-valid-feedback>
              </b-form-group>
              <div class="forButton">
                <b-button variant="primary" class="textInButton" @click="onSubmit">Submit</b-button>
                <b-button variant="danger"  class="textInButton" style="margin-left: 10px;" @click="resetform"
                  >Reset</b-button
                >
              </div>
            </div>
          </div>

          <div class="picture">
            <img
              src="https://image.winudf.com/v2/image1/Y29tLm1lcnJ5cmlhbmEuZ29vZ2xlX3NjcmVlbl8wXzE1NTMyNjU0MzVfMDIy/screen-0.jpg?fakeurl=1&type=.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="forMargin"></div>
    </div>
     <div class="forMargin"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from "sweetalert2";

export default {
  name: "Register",
  components: {},
  created() {
    if (localStorage.access_token) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    };
  },

  computed: {
    validation() {
      return this.form.password.length > 4 && this.form.password.length < 13;
    }
  },
  methods: {
    onSubmit() {
     
      if (this.form.password.length > 13 || this.form.password.length < 4) {
        
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Your password must be 5-12 characters long.",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.$store
          .dispatch("userRegister", this.form)
          .then(response => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("email", response.data.user.email);
            this.$store.state.userName = response.data.name;
            this.$store.state.isLogin = true;
            this.$router.push("/");
            this.form = {
              name: "",
              email: "",
              password: ""
            };
            Swal.fire({
              imageUrl:
                "https://cf.shopee.co.id/file/34af9ef9e1983f2b6ad1c0469c2f680e_tn",
              imageHeight: 320,
              imageAlt: "A tall image",
              title: "Congratulations",
              html: `Hi <span style="color:rgb(168,8,8)">${response.data.user.name.toUpperCase()}</span>`,
              confirmButtonColor: "rgb(168,8,8)"
            });
          })
          .catch(err => {
            Swal.fire({
              position: "top",
              title: "Error!",
              text: err.response.data.message,
              icon: "error",
              confirmButtonText: "OK",
              timer: 1500
            });
          });
      }
    },
    resetform(){
      for(let key in this.form){
        this.form[key] = "";
      }
    }
  }
};
</script>

<style scoped>
#home {
  background-color: #d6d7da;
  margin-bottom: 40px;
  border-radius: 0px 0px 4px 4px;
}

.forMargin {
  height: 30px;
}

#content {
  background-color: white;
  width: 95%;
  margin: auto;
  border-radius: 4px;
  padding: 15px;
  box-sizing: border-box;
  /* position: relative; */
}

.wrapper {
  display: flex;
  justify-content: space-evenly;
}

.register-form {
  padding: 20px;
  border: 2px solid rgb(168, 8, 8);
  border-radius: 5px;
}

.mainTitle {
  text-align: center;
  color: rgb(87, 80, 80);
}

.contentChild {
  width: 90%;
  margin: auto;
}

.picture img {
  height: 500px;
}

.forCards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
}

@media only screen and (max-width: 664px) {
  .forCards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
  }
}

@media only screen and (max-width: 797px){
    .picture{
        display: none;
    }
}


@media only screen and (max-width: 276px){
    .textInButton{
        font-size: 10px;
    }
}




</style>
