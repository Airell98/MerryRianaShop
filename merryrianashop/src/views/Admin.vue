<template>
  <div id="my-pagination">
       <div class="forMargin"></div>
    <div id="content">
      <div class="contentChild">
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Products" active
          >    <ProductTable/>  </b-tab
        >
        <b-tab title="Orders" variant="danger"
          >   <OrderTable/>  </b-tab
        >
         <b-tab title="Users" variant="danger"
          >   <UserTable/>  </b-tab
        >
        <b-tab title="Add Product" variant="danger"
          >   <AddProduct/>  </b-tab
        >
      </b-tabs>
    </b-card>
    </div>
    </div>
    <div class="forMargin"></div>
  </div>
</template>

<script>
import UserTable from '../views/UserTable.vue'
import OrderTable from '../views/OrderTable.vue'
import ProductTable from '../views/ProductTable.vue'
import AddProduct from '../views/AddProduct.vue'
export default {
  name: "Admin",
  components:{
      UserTable,
      OrderTable,
      ProductTable,
      AddProduct
  },
  created(){
    if(!localStorage.admin){
      this.$router.push("/")
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-evenly;
}

#my-pagination {
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
  height: 450px;
  overflow: scroll;
}

</style>
