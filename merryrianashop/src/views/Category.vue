<template>
  <div id="home">
    <div class="forMargin"></div>
    <div id="content">
      <div class="contentChild">
        <!-- <div class="mainTitle">
          <h3>Produk</h3>
        </div> -->
        <div class="books" v-if="this.$route.params.category == 'book'">
          <div class="booksHeader">
            <h3>Buku</h3>
          </div>
          <hr />
          <div v-if="this.books.length > 0" class="forCards">
            <Card
              v-for="(data, idx) in this.books"
              :key="idx"
              :data="data"
            ></Card>
          </div>
        </div>

        <div class="fashion" v-else-if="this.$route.params.category == 'fashion'">
          <div class="fashionHeader">
            <h3>Fashion</h3>
          </div>
          <hr />
          <div v-if="this.fashion.length > 0" class="forCards">
            <Card
              v-for="(fashion, idx) in this.fashion"
              :key="idx"
              :data="fashion"
            ></Card>
          </div>
        </div>

        <div class="snack" v-else-if="this.$route.params.category == 'snack'">
          <div class="snackHeader">
            <h3>Snack</h3>
          </div>
          <hr />
          <div v-if="this.snack.length > 0" class="forCards">
            <Card
              v-for="(snack, idx) in this.snack"
              :key="idx"
              :data="snack"
            ></Card>
          </div>
        </div>
      </div>
    </div>
    <div class="forMargin"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "../components/Card.vue";
export default {
  name: "Home",
  components: {
    Card
  },
  created() {
    this.$store.dispatch("getAllProducts");

    if (localStorage.access_token) {
      this.$store.dispatch("getMyCart");
      this.$store.state.isLogin = true;
    }
  },
  data() {
    return {
      bookCondition: false,
      products: this.$store.state.allProducts,
      
    };
  },

  // watch: {
  // products: function(val){
  //   console.log('babbibibibib')
  //   this.bookCondition = true;
  //   if(products.length > 0){
  //   }else{
  //     this.bookCondition = false;
  //   }
  // }
  // },

  computed: {
    // forBookCondition() {
    //   if (this.$store.state.allProducts.length > 0) {
    //     this.bookCondition = true;
    //   } else {
    //     this.bookCondition = true;
    //   }
    // },

    books() {
      if (this.$store.state.allProducts.length > 0) {
        let allBooks;
        let arr = [...this.$store.state.allProducts];
        console.log(arr, "ini arr");
        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].category == "book") {
            counter++;
          }
        }
        if (counter > 0) {
          allBooks = arr.filter(data => {
            return data.category == "book";
          });
        }
        let result = [];
        for (let i = 0; i < allBooks.length; i++) {
          if (result.length == 4) {
            break;
          } else {
            result.push(allBooks[i]);
          }
        }

        return result;
      }
    },
    fashion() {
      if (this.$store.state.allProducts.length > 0) {
        let allFashion;
        let arr = [...this.$store.state.allProducts];

        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].category == "fashion") {
            counter++;
          }
        }
        if (counter > 0) {
          allFashion = arr.filter(data => {
            return data.category == "fashion";
          });
        }

        let result = [];
        for (let i = 0; i < allFashion.length; i++) {
          if (result.length == 4) {
            break;
          } else {
            result.push(allFashion[i]);
          }
        }

        return result;
      }
    },

    snack() {
      if (this.$store.state.allProducts.length > 0) {
        let allSnacks;
        let arr = [...this.$store.state.allProducts];

        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].category == "snack") {
            counter++;
          }
        }
        if (counter > 0) {
          allSnacks = arr.filter(data => {
            return data.category == "snack";
          });
        }

        let result = [];
        for (let i = 0; i < allSnacks.length; i++) {
          if (result.length == 4) {
            break;
          } else {
            result.push(allSnacks[i]);
          }
        }

        return result;
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

.mainTitle {
  text-align: center;
  color: rgb(87, 80, 80);
}

.contentChild {
  width: 90%;
  margin: auto;
}

.books {
  margin-bottom: 15px;
}

.fashion {
  margin-bottom: 15px;
}

.booksHeader {
  background-color: tomato;

  text-align: center;
  padding: 10px;
  color: rgb(248, 247, 247);
  /* margin-top: 100px; */
  /* position: relative ;
  top: 20px; */
}

.fashionHeader {
  background-color: tomato;

  text-align: center;
  padding: 10px;
  color: rgb(248, 247, 247);
  /* margin-top: 100px; */
  /* position: relative ;
  top: 20px; */
}

.snackHeader {
  background-color: tomato;

  text-align: center;
  padding: 10px;
  color: rgb(248, 247, 247);
  /* margin-top: 100px; */
  /* position: relative ;
  top: 20px; */
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
</style>
