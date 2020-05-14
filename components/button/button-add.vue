<template>
  <NuxtLink :to="to" class="add-btn mg-10">
    <button class="btn btn-primary waves-effect waves-light m-b-20">
      <i class="fa fa-plus m-r-5"></i>
      <span>{{text}}</span>
    </button>
  </NuxtLink>
</template>

<script>
export default {
  name: "button-add",
  props: {
    to: null,
    text: null
  },
  methods: {},
  mounted() {}
};
</script>
