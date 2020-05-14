<template>
  <vue-list-picker
    :left-items="items"
    :right-items="selected"
    :title-left="titleLeft"
    :title-right="titleRight"
    title-class="vue-title-select"
    :height="'250px'"
  ></vue-list-picker>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    selected: {
      type: Array,
      default: []
    },
    titleLeft: {
      type: String,
      default: "Thuộc tính"
    },
    titleRight: {
      type: String,
      default: "Đã chọn"
    }
  },
  methods: {}
};
</script>
