<template>
  <div class="loader-wrapper display-flex align-items justify-content" v-if="loading">
      <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "loading-item",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.loader-wrapper {
  position: fixed;
  background: #00000040;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #f60; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>