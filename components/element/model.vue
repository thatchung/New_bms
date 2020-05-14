<template>
  <div class="modal-popup" v-if="isOpen">
    <div class="modal-overlay" @click="closeModel()"></div>
    <div class="modal-content" :style="`width:`+modelwidth+`!important` ">
      <div class="modal-pheader">
        {{title}}
        <i class="modal-close fa fa-remove" @click="closeModel()"></i>
      </div>
      <div class="modal-info">
        <slot name="body"></slot>
      </div>
      <div class="modal-control">
        <div class="pull-right">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="model-center" v-if="isOpen">
    <div class="model-background" @click="closeModel()"></div>
    <div
      class="w3-model"
      :style="'width:' + modelwidth +';top : '+margintop+';left: calc((100% - '+modelwidth+')/2);'"
    >
      <div class="model-header">
        <label class="model-title">{{title}}</label>
        <i class="el-icon-circle-close model-close" @click="closeModel()"></i>
      </div>
      <div class="model-contain">
        <slot></slot>
      </div>
    </div>
  </div>-->
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
    marginRight: {
      type: Number,
      default: -1
    }
  },
  methods: {
    closeModel() {
      this.$emit("update:isOpen", false);
      this.$emit("updateState", false);
    }
  }
};
</script>
<style scoped>
.modal-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 100;
}
.modal-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 101;
}
.modal-content {
  z-index: 102;
  top: 2%;
  left: 0px;
  right: 0;
  margin: 0 auto;
  transition: opacity 0.5s;
  width: 50%;
  background-color: white;
  -webkit-box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  overflow: hidden;
}
.modal-pheader {
  color: #555;
  background-color: #f6f6f6;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15px;
  padding: 18px 0 18px 18px;
  white-space: nowrap;
  position: relative;
}
.modal-close {
  float: right;
  line-height: 35px;
  margin-right: 10px;
  width: 25px;
  cursor: pointer;
}
.modal-info {
  /* margin-top: 10px;
  min-height: 100px;

  display: inherit;
  padding: 20px 15px;
  position: relative; */
  /*margin-top: 10px;*/
  min-height: 100px;
  max-height: 400px;
  display: inherit;
  overflow-y: scroll;
  padding: 10px 15px;
  position: relative;
}
.modal-control {
  /* border-top: 1px solid #c3c3c3;
  padding-top: 12px;
  padding-bottom: 12px;
  bottom: 10px;
  width: calc(100% - 30px);
  margin: 0 auto;
  background: #fff;
  margin-bottom: 30px; */

  position: relative;
  display: inline-grid;
  padding: 8px 15px;
  width: 100%;
  border-top: 1px solid #efefef;
  text-align: right;
}
.v--modal-overlay {
  z-index: 9999;
}
</style>
