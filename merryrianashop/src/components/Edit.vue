<template>
  <b-modal id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>
      <div class="d-block  text-center">
        Edit Form
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
        <b-button variant="primary" class="textInButton" @click="editTheProduct"
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
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      form: {
        name: this.$store.state.productDetail.name,
        image_url: this.$store.state.productDetail.image_url,
        stock: this.$store.state.productDetail.stock,
        price: this.$store.state.productDetail.price,
        desc: this.$store.state.productDetail.desc,
        category: this.$store.state.productDetail.name
      },
      categories: [
        // { text: "Select One", value: null },
        "book",
        "snack",
        "fashion"
      ]
    };
  }, 
  methods:{
      editTheProduct(){
          
      }
  }
};
</script>

<style></style>
