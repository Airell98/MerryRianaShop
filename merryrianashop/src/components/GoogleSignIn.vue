<template>
  <button v-google-signin-button="clientId" class="google-signin-button">
    Google
  </button>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios"
import Swal from "sweetalert2"
export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId:
      "706011335996-o1co16npukrba33f5t24cf4vu2404n61.apps.googleusercontent.com"
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      
      
      return axios({
        method: "post",
        url: `${this.$store.state.baseUrl}/user/google-sign-in`,
        data: {
          access_token: idToken,
        },
      })
        .then(({ data }) => {
            this.$bvModal.hide("login");
            Swal.fire(`Congratulion`, "Successfully logged in", "success");
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("name", data.user.name);
          this.$store.state.userName = data.user.name;
          
          this.$store.state.isLogin = true;
          this.$store.dispatch("getMyCart");
          if (this.$route.name == "Register" || this.$route.name == "Admin") {
            this.$router.push("/");
          }
          })
        .catch((err)=>{
          console.log(err, 'dari line 46')
           Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "failed Google Login",
          });
        })
    },
    OnGoogleAuthFail(error) {
      Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something Went Error",
          });
      console.log(error, 'line 60');
    }
  }
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: rgba(235, 121, 86, 0.945);
  height: 38px;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 18px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* border: none; */
  margin-left: 10px;
   
}
</style>
