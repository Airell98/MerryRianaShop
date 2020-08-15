<template>
  <div class="contentChild">
    <div class="back-button">
      <button @click="backToHome">
        <i class="fas fa-long-arrow-alt-left"></i>Kembali
      </button>
    </div>
    <hr />
    <div class="flexing">
      <div class="picture">
        <img :src="product.image_url" alt="foto" />
      </div>

      <div class="desc">
        <div class="desc-title">
          <h3>{{ product.name }}</h3>
        </div>
        <hr />
        <div class="explanation">
          <p>{{ product.desc }}</p>
        </div>
      </div>
    </div>

    <div class="harga">
        <h4>Rp. {{formatPrice(product.price)}}</h4>
        <button @click="addToCart(product)">ADD TO CART</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"
export default {
  name: "DetailCard",
  components: {},
  created() {
    if (this.$store.state.oneProduct.id == undefined) {
      this.$store.dispatch("getOneProductDetail", this.$route.params.id);
    }
  },
  data() {
    return {};
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
      formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    addToCart(product){
        if(localStorage.getItem("access_token")){
            this.$store.dispatch("addToCart", product.id)
        }else{
Swal.fire({
  position: 'top',
  icon: 'error',
  title: 'Login To Proceed',
  showConfirmButton: false,
  timer: 1500
})
        }
    }
  },
  computed: {
    product() {
      return this.$store.state.oneProduct;
    },
  
  }
};
</script>

<style scoped>
.contentChild {
  width: 90%;
  margin: auto;

  /* position: relative; */
}
.flexing {
  display: flex;
  justify-content: space-evenly;
}

.picture img {
  width: 550px;
  height: 500px;
}

.back-button button {
  background-color: rgb(168, 8, 8);
  font-size: 14px;
  color: white;
  border: none;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 4px;
}

.desc-title {
  text-align: center;
  color: rgb(53, 49, 49);
}

.explanation p {
  font-size: 18px;
  color: rgb(53, 49, 49);
  font-family: "Arimo", sans-serif;
  font-family: "Rubik", sans-serif;
}

.harga{
    text-align: end;
    display: flex;
    justify-content: flex-end;
}

.harga h4{
    font-size: 25px;
  color: rgb(53, 49, 49);
  margin-right: 15px;
}

.harga button {
  background-color: rgb(168, 8, 8);
  font-size: 14px;
  color: white;
  border: none;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 4px;
}

@media only screen and (max-width: 960px){
  .flexing {
  display: block;
  /* justify-content: space-evenly; */
  text-align: center;
}


.explanation{
  text-align: justify;
}
}


@media only screen and (max-width: 700px){
.picture img {
  width: 350px;
  height: 500px;
}
}


@media only screen and (max-width: 440px){
.picture img {
  width: 250px;
  height: 300px;
}
}


@media only screen and (max-width: 320px){
.picture img {
  width: 150px;
  height: 200px;
}

.harga h4{
  font-size: 16px
}


.harga button {
  background-color: rgb(168, 8, 8);
  font-size: 10px;
  color: white;
  border: none;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 4px;
}
}

</style>
