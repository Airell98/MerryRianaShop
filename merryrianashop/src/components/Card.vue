<template>
  <div class="allCards">
      <div class="top-card">
    <div class="picture" @click="detailPage(data.id)">
        <img :src="data.image_url" alt="foto">
    </div>
    <div class="dataTitle">
        <p>{{data.name}}</p>
    </div>
    </div>
    <div class="cardFooter">
        <button style="cursor:text;">Rp. {{formatPrice(data.price)}}</button>
        <button @click="addToCart(data)"><i class="fas fa-shopping-cart" ></i>ADD TO CART</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
name: "Card",
props: ["data"],
created(){
   
},
 methods:{
 formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    detailPage(id){
      console.log('klikkk aja detail PAge')
      this.$store.dispatch("getOneProduct", id)
    },

     addToCart(product){
        if(localStorage.getItem("access_token")){
            this.$store.dispatch("addToCartForHome", product.id)
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

}
</script>

<style  scoped>
.allCards{
  
   border: 1.5px solid rgb(194, 192, 192);
   margin-bottom: 10px;

}
.top-card{
      padding: 10px;
    box-sizing: border-box;
}
.picture{
  cursor: pointer;
}

.picture img{
    width: 230px;
    height: 250px;
}

.cardFooter{
    display: flex;
    justify-content: space-between;
    background-color: rgb(168, 8, 8);
    padding: 10px;
    box-sizing: border-box;
}

.cardFooter button{
  background-color: rgb(209, 212, 209); /* Green */
  border: none;
  color: black;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius : 4px;
  box-sizing: border-box;
}

.dataTitle{
  margin-top: 10px;
}

.dataTitle p{
  font-family: 'Rubik', sans-serif;
  color:rgb(168, 8, 8)
}

@media only screen and (max-width: 664px) {
  .allCards{
  
   text-align:center;

}
}



@media only screen and (max-width: 320px) {
  .allCards{
  
   text-align:center;

}

.picture img{
    width: 200px;
    height: 250px;
}
}


/* @media only screen and (max-width: 300px) {
  .allCards{
  
   text-align:center;

}

.picture img{
    width: 200px;
    height: 250px;
}
} */
</style>



