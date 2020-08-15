<template>
  <div class="container table-responsive table-responsive-sm table-responsive-md">
    <table class="table table-dark tableNya">
      <thead>
        <tr>
          <th scope="col">User Name</th>
          <th scope="col">Product Name</th>
          <th scope="col">Total Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Transaction Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in this.$store.state.orders" :key="index">
          <td>{{ order.User.name }}</td>
          <td>{{ order.Product.name }}</td>
          <td>Rp. {{ formatPrice(order.totalPrice) }}</td>
          <td>{{order.qty}}</td>
          <td> {{ order.createdAt.toString().substr(0, 10)}} </td>
          <td> {{ order.createdAt.toString().substr(11, 8)}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrdersTable",

  components: {},
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getAllOrders");
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
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
