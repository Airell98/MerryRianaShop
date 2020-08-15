<template>
  <div id="detail">
    <div class="forMargin"></div>
    <div id="content">
      <transition name="view">
        <DetailCard v-if="condition"></DetailCard>
      </transition>
    </div>

    <div class="forMargin"></div>
  </div>
</template>

<script>
import DetailCard from "../components/DetailCard.vue";
export default {
  name: "Detail",
  components: {
    DetailCard
  },
  created() {
    if (localStorage.access_token) {
      this.$store.dispatch("getMyCart");
      this.$store.state.isLogin = true;
    }
    setTimeout(() => {
      this.condition = true;
    }, 1);
  },
  data() {
    return {
      condition: false
    };
  },
  methods: {},
  computed: {
    product() {
      return this.$store.state.oneProduct;
    }
  }
};
</script>

<style scoped>
#detail {
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

/* .contentChild {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}

.picture img {
  width: 550px;
  height: 500px;
} */

.view-enter {
  opacity: 0;
  transform: translateY(100px);
}
.view-leave {
  opacity: 0;
  transform: translateY(100px);
}
.view-enter-active,
.view-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.view-enter-active {
  transition-delay: 0.5s;
}

.view-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.view-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
