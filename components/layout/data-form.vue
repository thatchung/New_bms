<template>
  <fieldset :class="hasTab ? 'w-90' : ''">
    <legend>{{title}}</legend>
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  name: "data-form",
  props: {
    title: null,
    hasTab: false
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .w-90{
    width: calc(90% - 30px);
  }
</style>
