<template>
  <div class="container table-responsive table-responsive-sm table-responsive-md">
    <table class="table table-dark tableNya">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total Purchase</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in this.$store.state.users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>Rp. {{ shoppingHistory(user.ShoppingHistories) }}</td>
          
        
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersTable",

  components: {},
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  shoppingHistory(array) {
    let totalPrice = 0;
    if (array.length > 0) {
      array.forEach(element => {
        totalPrice += element.totalPrice;
      });
      return this.formatPrice(totalPrice);
    } else {
      return this.formatPrice(0);
    }
  }
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
}

.tableNya {
  /* margin-right: 100px; */
  max-width: 900px;
  margin: auto;
}
</style>
