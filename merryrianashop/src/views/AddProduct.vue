<template>
  <div class="register-form">
    <div class="d-block  text-center">
      <h3>Add Product Form</h3>
    </div>
    <hr />

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

      <b-form-group id="input-group-1" label="Description" label-for="input-1">
        <b-form-textarea
          id="textarea"
          v-model="form.desc"
          placeholder="Make a description..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="forButton">
        <b-button variant="primary" class="textInButton" @click="addProduct"
          >Submit</b-button
        >
        <b-button
          variant="danger"
          class="textInButton"
          @click="reset"
          style="margin-left: 10px;"
          >Reset</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      form: {
        name: "",
        image_url: "",
        stock: "",
        price: "",
        desc: "",
        category: "book"
      },
      categories: [
        // { text: "Select One", value: null },
        "book",
        "snack",
        "fashion"
      ]
    };
  },
  methods: {
    addProduct() {
      console.log("on submit");
      this.$store.dispatch("addProduct", this.form);
      this.form = {
        name: "",
        image_url: "",
        stock: "",
        price: "",
        desc: "",
        category: "book"
      };
    },
    reset() {
      this.form = {
        name: "",
        image_url: "",
        stock: "",
        price: "",
        desc: "",
        category: "book"
      };
    }
  }
};
</script>

<style scoped>
.register-form {
  max-width: 1000px;
  margin: auto;
  border: 2px solid rgb(168, 8, 8);
  padding: 15px 35px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 4px;
}
</style>
