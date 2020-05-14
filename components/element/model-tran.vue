<template>
  <div class="model-center" v-if="isOpen">
    <div class="model-background" @click="closeModel()"></div>
    <div class="w3-model" :style="'background-color: ' + backgroundcolor + ';'+'width:' + modelwidth +';top : '+margintop+';left: calc((100% - '+modelwidth+')/2);'">
      <div class="model-contain">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    modelwidth: {
      type: String,
      default: "50%"
    },
    margintop: {
      type: String,
      default: "100px"
    },
    backgroundcolor : {
      type : String,
      default : "rgba(0, 0, 0, 0.6);"
    }
  },
  methods: {
    closeModel() {
      this.$emit("update:isOpen", false);
    }
  }
};
</script>
<style scoped>
  .w3-model {
    min-height: 150px;
    min-width: 500px;
    position: fixed;
    z-index: 998;
    display: block;
    border: 1px solid black;
    border-radius: 1%;
    border-style: outset;
  }

.model-center {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.model-header {
  width: 100%;
  height: 30px;
  background-color: #dd4b39;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid lightgray;
}

.icon {
  float: right;
  font-size: 15px;
  margin-right: 10px;
  color: white;
  margin-top: 6px;
}

.model-close {
  float: right;
  line-height: 24px;
  color: white;
  margin-right: 10px;
}

.model-header > label.model-title {
  float: left;
  line-height: 28px;
  font-size: 15px;
  margin-left: 10px;
  color: white;
  
}

.model-contain {
  padding: 10px;
  max-height: 450px;
  width: 100%;
  position: relative;
}

.model-background {
  width: 100%;
  height: 100%;
  background-color: black;
  position: fixed;
  z-index: 900;
  display: block;
  top: 0px;
  opacity: 0.5;
  left: 0px;
}
</style>
