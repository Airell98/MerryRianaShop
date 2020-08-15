<template>
  <b-modal id="login" hide-footer>
    <template v-slot:modal-title>
      <div class="d-block  text-center">
        Login Form
      </div>
    </template>
    <div class="d-block">
      <!-- <h3>Password</h3> -->
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

      <b-form-group id="input-group-2" label="Password :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="onSubmit">Submit</b-button>
      <b-button variant="danger" style="margin-left: 10px;"  @click="resetForm">Reset</b-button>
      <GoogleSignIn/>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('login')"
      >Close Me</b-button
    >
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import GoogleSignIn from "../components/GoogleSignIn.vue";
export default {
  name: "Login",
  components: {
    GoogleSignIn
  },
  created() {},
  computed: {},
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //   evt.preventDefault();
      console.log("masuk onsubmit");
      axios({
        url: `${this.$store.state.baseUrl}/user/loginUser`,
        method: "POST",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(response => {
          console.log(response.data)
          if(response.data.role == "SuperAdmin"){
            localStorage.setItem("admin", true)
            this.$store.state.isAdmin = true

          }
          console.log(response.data);
          this.$bvModal.hide("login");
          Swal.fire(`Congratulion`, "Successfully logged in", "success");
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("name", response.data.name);
          this.$store.state.userName = response.data.name;
          this.form.email = "";
          this.form.password = "";
          this.$store.state.isLogin = true;
          this.$store.dispatch("getMyCart");
          if (this.$route.name == "Register" || this.$route.name == "Admin") {
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.form.email = "";
          this.form.password = "";
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          })
        });
    },
    resetForm(){
      this.form = {
        name: "",
        password : "",
      }
    }
  }
};
</script>

<style></style>
