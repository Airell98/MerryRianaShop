<template>
  <div class="container table-responsive table-responsive-sm table-responsive-md">
    <table class="table table-dark tableNya table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image_url</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in this.$store.state.allProducts" :key="index">
          <td>{{ product.name }}</td>
          <img
            :src="product.image_url"
            alt="image"
            width="80px;"
            height="50px;"
          />
          <td>Rp. {{ formatPrice(product.price) }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning edit-button"
              @click="editProduct(product)"
            >
              Edit
            </button>
            
            <button
            
              type="button"
              class="btn btn-danger hapus-button"
              @click="hapus(product)"
           
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        <div class="d-block  text-center">
          Login Form
        </div>
      </template>

      <div class="d-block">
        <!-- Name -->

        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Product name"
          ></b-form-input>
        </b-form-group>

        <!-- Image Url -->
        <b-form-group id="input-group-1" label="Image url" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.image_url"
            type="email"
            required
            placeholder="Product image url"
          ></b-form-input>
        </b-form-group>

        <!-- Stock -->

        <b-form-group id="input-group-1" label="Stock" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.stock"
            type="number"
            required
            placeholder="Product stock"
          ></b-form-input>
        </b-form-group>

        <!-- category -->

        <b-form-group id="input-group-3" label="Category" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.category"
            :options="categories"
            required
          ></b-form-select>
        </b-form-group>

        <!-- Price -->

        <b-form-group id="input-group-1" label="Price" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.price"
            type="number"
            required
            placeholder="Product price"
          ></b-form-input>
        </b-form-group>

        <!-- Desc -->

        <b-form-group
          id="input-group-1"
          label="Description"
          label-for="input-1"
        >
          <b-form-textarea
            id="textarea"
            v-model="form.desc"
            placeholder="Make a description..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <div class="forButton">
          <b-button
            variant="primary"
            class="textInButton"
            @click="editTheProduct"
            >Submit</b-button
          >
          <b-button
            variant="danger"
            class="textInButton"
            style="margin-left: 10px;"
            @click="resetModal"
            >Reset</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Edit from "../components/Edit.vue";
import Swal from "sweetalert2"
export default {
  name: "Products",

  components: {
    Edit
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        image_url: "",
        stock: "",
        price: "",
        desc: "",
        category: ""
      },
      categories: [
        // { text: "Select One", value: null },
        "book",
        "snack",
        "fashion"
      ]
    };
  },
  created() {
    this.$store.dispatch("getAllProducts");
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    editProduct(product) {
      (this.form = {
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        stock: product.stock,
        price: product.price,
        desc: product.desc,
        category: product.category
      }),
        this.$bvModal.show("bv-modal-example");
    },
    editTheProduct() {
      this.$store
        .dispatch("editProduct", this.form)
        .then(response => {
          Swal.fire({
            position: "top",
            title: "Edit Succeeded",
            text: `${this.form.name}`,
            icon: "success",
            confirmButtonText: "OK",
            timer: 2000
          });
           this.$bvModal.hide("bv-modal-example");
          this.$store.dispatch("getAllProducts");
        })
        .catch(err => {
          Swal.fire({
            position: "top",
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            timer: 2000
          });
        });
    },
    hapus(product){
        console.log(product.id,"=====")
          Swal.fire({
        title: `<span style="font-size: 20px; text-align:center;">You are going to delete <span style="color:rgb(168, 8, 8)">${product.name}</span>?</span>`,
        text: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Nope"
      }).then(result => {
        if (result.value) {
           this.$store.dispatch('hapus', product.id)
        }
      });

       
    },
    resetModal(){
     for(let key in this.form){
       this.form[key] = ""
     }
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
  max-width: 950px;
  margin: auto;
}

.hapus-button{
  margin-left: 10px;
}


@media only screen and (max-width: 877px) {
  .hapus-button{
  margin-left: 5px;
}
}

@media only screen and (max-width: 872px) {
  .hapus-button{
  margin-left: 0px;
}
}

@media only screen and (max-width: 867px) {
  .hapus-button{
  margin-top: 10px;
}

.edit-button{
  padding: 5px 18px;
}

}
</style>
