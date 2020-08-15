<template>
  <div class="cart-card">
    <div class="wrapper">
      <div class="picture">
        <img :src="product.Product.image_url" alt="foto" />
      </div>

      <div class="detail">
        <div class="price-name">
          <h3>{{ product.Product.name }}</h3>
          <h3 style="color: rgb(168, 8, 8); font-size: 30px;" class="price">
            Rp. {{ formatPrice(product.totalPrice) }}
          </h3>
        </div>
        <div class="amount">
          <i
            class="fa fa-trash fa-2x"
            aria-hidden="true"
            @click="hapus(product)"
          ></i>
          <i
            class="fa fa-minus-square my-2"
            aria-hidden="true"
            @click="kurang"
          ></i>
          <input
            min="0"
            class="inputStock"
            v-model="stockBeli"
            type="number"
            style="text-align:center; border:none;"
          />
          <i
            class="fa fa-plus-square my-2"
            aria-hidden="true"
            @click="tambah"
          ></i>
          <button
            type="button"
            class="btn btn-danger ml-3"
            @click="editCart(product)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "CartCard",
  props: ["product"],
  created() {
    //   this.$store.dispatch("getMyCart");
  },
  data() {
    return {
      stockBeli: this.product.qty
    };
  },
  computed: {},
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    kurang() {
      this.stockBeli -= 1;
    },
    tambah() {
      this.stockBeli += 1;
    },
    editCart(product) {
      if (product.Product.stock < this.stockBeli) {
        this.stockBeli = this.product.qty;
        Swal.fire(
          `Oooppss!!`,
          "Product is insufficient for the amount you have set",
          "error"
        );
        this.stockBeli = this.product.qty;
      } else if (this.stockBeli === 0) {
        this.stockBeli = this.product.qty;
        Swal.fire(`Oooppss!!`, "You havent set the amout yet", "error");
        this.stockBeli = this.product.qty;
      } else if (this.stockBeli < 0) {
        this.stockBeli = this.product.qty;
        Swal.fire(`Oooppss!!`, "You have set an Invalid Amount", "error");
        this.stockBeli = this.product.qty;
      } else {
        const updateCart = {
          id: product.Product.id,
          qty: this.stockBeli
        };
        this.$store.dispatch("updateProductInCart", updateCart);
      }
    },
    hapus(cart) {
      Swal.fire({
        title: `<span style="font-size: 20px; text-align:center;">You are going to delete <span style="color:rgb(168, 8, 8)">${cart.Product.name}</span> from your cart.</span>`,
        text: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Nope"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteCartById", cart.ProductId);
        }
      });
    }
  }
};
</script>

<style scoped>
.cart-card {
  border: 1.5px solid rgb(187, 182, 182);
  margin-bottom: 15px;
  border-radius: 5px;
}

.detail {
  text-align: center;
  padding: 10px;
}

.detail h3 {
  font-size: 20px;
  color: rgb(53, 49, 49);
}

.picture img {
  width: 130px;
  height: 150px;
}
.wrapper {
  display: flex;
  padding: 20px;
  justify-content: space-evenly;
  box-sizing: border-box;
}
i {
  cursor: pointer;
}
.amount {
  margin-top: 20px;
}

.fa-trash {
  margin-right: 20px;
}

/* .price-name{
    font-size: 35px;
} */


@media only screen and (max-width:1050px) {
  .wrapper {
  display: block;
  padding: 20px;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
}

.amount input{
  width: 100px;
}

.picture{
  margin: auto;
  width: 150px;
}

}


@media only screen and (max-width:940px){
 

.cart-card {
max-width: 90%;
margin: auto;

}


.wrapper {
    /* justify-content: flex-end;  */
    margin: auto;
    max-width: 500px;
}
}

</style>
