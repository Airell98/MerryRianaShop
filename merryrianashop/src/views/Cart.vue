<template>
  <div id="cart">
    <div class="forMargin"></div>
    <div id="content">
      <div class="contentChild">

        <div class="forCard" v-if="this.$store.state.cart.length > 0">
          <CartCard
            v-for="(product, idx) in allCards"
            :key="idx"
            :product="product"
          />
        </div>

        <div  class="empty-card"  @click="goToHome"  v-else >
            <img src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png" alt="foto">
        </div>

        <div class="details"   v-if="this.$store.state.cart.length > 0">
          <div class="detail-wrapper">
            <div class="detail-header">
              <p>Shopping Summary</p>
            </div>

            <div class="detail-info">
              <div class="left-side">
                <p>Total Price:</p>
                <p>Delivery Charge:</p>
                <p>Send To:</p>
                <h5 style="margin-top: 40px; color: rgb(168, 8, 8);">
                  Total Charge:
                </h5>
              </div>

              <div class="right-side">
                <p>Rp. {{ formatPrice(totalPrice) }}</p>
                <p>Rp. {{ formatPrice(selected) }}</p>
                <b-form-select
                  v-model="selected"
                  :options="options"
                ></b-form-select>
                <h5 style="margin-top: 22px; color: rgb(168, 8, 8);">
                  Rp. {{ formatPrice(totalCharge) }}
                </h5>
              </div>
            </div>

            <div class="checkout-button">
              <button @click="checkOut">ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="forMargin"></div>
  </div>
</template>

<script>
import CartCard from "../components/CartCard.vue";
import Swal from 'sweetalert2'
export default {
  name: "Cart",
  components: {
    CartCard
  },
  data() {
    return {
      // deliveryCharge:0,
      selected: 0,

      options: [
        { value: 32000, text: "Bandung" },
        { value: 12000, text: "Depok" },
        { value: 15000, text: "Bekasi" },
        { value: 21000, text: "Tangerang" },
        { value: 47999, text: "Banten" },
        { value: 75000, text: "Pekalongan" },
        { value: 21000, text: "Ujung Genteng" },
        { value: 47000, text: "Jepara" },
        { value: 700000, text: "Ambon" },
        { value: 500000, text: "Aceh" }
      ]
    };
  },

  created() {
    if (!localStorage.access_token) {
      this.$router.push("/");
    } else {
      this.$store.dispatch("getMyCart");
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    checkOut() {
      if (
        this.selected == null ||
        this.selected == undefined ||
        this.selected == 0
      ) {
        Swal.fire(`You haven't set the delivery destination`);
      } else if (this.$store.state.cart.length == 0) {
        Swal.fire(`You haven't chosen any product yet`);
      } else {
        this.$store.dispatch("checkOut", this.$store.state.cart);
        this.selected = 0;
      }
    },
    goToHome(){
      console.log('msuk go to home')
      this.$router.push("/")
    }
  },

  computed: {
    allCards() {
      return this.$store.state.cart;
    },
    totalPrice() {
      let counter = 0;
      this.allCards.forEach(element => {
        counter += element.totalPrice;
      });
      //* element.qty

      return counter;
    },
    totalCharge() {
      return this.totalPrice + this.selected;
    }
  }
};
</script>

<style scoped>
#cart {
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

.contentChild {
  width: 98%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.details {
  border: 2px solid rgb(41, 39, 39);
  border-radius: 4px;
  max-width: 400px;
  height: 400px;
}

.detail-header {
  border-bottom: 1.5px solid rgb(41, 39, 39);
  text-align: center;
  padding: 8px 0px;
  font-size: 20px;
  background-color: whitesmoke;
}

.detail-info {
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.right-side {
  font-size: 18px;
}

.checkout-button {
  text-align: center;
}

.checkout-button button {
  background-color: rgb(168, 8, 8); /* Green */
  border: none;
  color: rgb(255, 253, 253);
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  font-size: 18px;
  border-radius: 4px;
  box-sizing: border-box;
}

.empty-card{

  text-align: center;
  flex: 2;

}

.forCard{
  height: 420px;
  overflow: scroll;
}

.empty-card img{
  cursor: pointer;
  /* width:500px; */
  height: 400px;
}

@media only screen and (max-width:940px){
  .contentChild {
  /* width: 90%; */
  /* margin: auto; */
  display: inline-block;
  /* justify-content: space-between; */
}

.details{
  margin: auto;
}

}


@media only screen and (max-width:940px){
 

.forCard {
max-width: 90%;
margin: auto;
margin-bottom: 15px;

}



}


</style>
